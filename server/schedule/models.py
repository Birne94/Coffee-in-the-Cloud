from django.db import models
from django.utils import timezone
from authentication.models import Account


ScheduleEntryTypes = (
    ("w", "weekly cleaning"),
    ("b", "biweekly cleaning"),
    ("o", "other cleaning")
)


class ScheduleEntry(models.Model):
    user = models.ForeignKey(Account)
    date = models.DateField()
    type = models.CharField(max_length=1, choices=ScheduleEntryTypes)