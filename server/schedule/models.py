from django.db import models
from django.utils import timezone
from authentication.models import Account
from server.mail import send_email
from server.settings import MAIL_SENDER
from django.core.exceptions import ValidationError
from django.template.loader import render_to_string

ScheduleEntryTypes = (
    ("w", "weekly cleaning"),
    ("b", "biweekly cleaning"),
    ("o", "cleaning")
)


class ScheduleEntry(models.Model):
    user = models.ForeignKey(Account)
    date = models.DateField()
    type = models.CharField(max_length=1, choices=ScheduleEntryTypes)

    def save(self, *args, **kwargs):
        if not self.pk:
            send_email(MAIL_SENDER,
                       [self.user.email],
                       "You have been selected for cleaning",
                       render_to_string("mail-schedule.txt", {
                           "firstname": self.user.first_name,
                           "lastname": self.user.last_name,
                           "date": self.date,
                           "type": dict(ScheduleEntryTypes).get(self.type, "cleaning")
                       }))

        super(ScheduleEntry, self).save(*args, **kwargs)

    def clean(self):
        if len(ScheduleEntry.objects.filter(date=self.date).all()) > 0:
            raise ValidationError("There can only be one cleaning a day!")
        if self.type != "o" and self.date.weekday() != 4:
            raise ValidationError("Weekly/Biweekly cleaning can only be done on Fridays!")

