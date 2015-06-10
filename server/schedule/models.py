from django.db import models
from django.utils import timezone
from authentication.models import Account
from server.mail import send_email
from server.settings import MAIL_SENDER
from django.core.exceptions import ValidationError

ScheduleEntryTypes = (
    ("w", "weekly cleaning"),
    ("b", "biweekly cleaning"),
    ("o", "other cleaning")
)


class ScheduleEntry(models.Model):
    user = models.ForeignKey(Account)
    date = models.DateField()
    type = models.CharField(max_length=1, choices=ScheduleEntryTypes)

    def save(self, *args, **kwargs):
        if not self.pk:
            send_email(MAIL_SENDER,
                       [self.user.email],
                       "You have been selected for cleaning.",
                       ("Hello %s %s,\r\n\r\n" +
                       "You have been selected to do the %s on %s") % (
                           self.user.first_name,
                           self.user.last_name,
                           "weekly cleaning" if self.type == "w" else "biweekly cleaning",
                           self.date
                        ))

        super(ScheduleEntry, self).save(*args, **kwargs)

    def clean(self):
        if len(ScheduleEntry.objects.filter(date=self.date).all()) > 0:
            raise ValidationError("There can only be one cleaning a day!")
        if self.date.weekday() != 4:
            raise ValidationError("Cleaning can only be done on Fridays!")

