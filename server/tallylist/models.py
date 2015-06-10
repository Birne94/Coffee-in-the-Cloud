from server.settings import COFFEE_PRICE
from django.db import models
from django.template.loader import render_to_string
from authentication.models import Account
from django.utils import timezone
from server.mail import send_email
from server.settings import MAIL_SENDER


class TallyListEntry(models.Model):
    user = models.ForeignKey(Account)
    amount = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now=True)
    processed = models.BooleanField("check if the entry has been booked yet.",
                                    default=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user.balance -= COFFEE_PRICE * self.amount
            self.user.save()

            warnings = []
            if self.user.balance < 2:
                warnings.append("Warning: Your account balance is low (%.2f EUR)! Please add some more money to your account." % self.user.balance)

            send_email(MAIL_SENDER,
                       [self.user.email],
                       "A coffee has been tracked",
                       render_to_string("mail-coffee.txt", {
                           "firstname": self.user.first_name,
                           "lastname": self.user.last_name,
                           "amount": self.amount,
                           "warnings": warnings
                       }))

        super(TallyListEntry, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.user.balance += COFFEE_PRICE * self.amount
        self.user.save()

        super(TallyListEntry, self).delete(*args, **kwargs)

    def __unicode__(self):
        return "%d for %s" % (self.amount, unicode(self.user))

    def is_deletable(self):
        return (not self.processed) and ((timezone.now() - self.created_at).total_seconds() < 1800)