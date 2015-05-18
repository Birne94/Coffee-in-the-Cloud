from django.db import models
from util import convert_to_json


class CoffeeUser(models.Model):
    FirstName = models.CharField(max_length=200)
    LastName = models.CharField(max_length=200)
    Balance = models.FloatField()
    Email = models.EmailField()

    def full_name(self):
        return self.FirstName + " " + self.LastName

    def json(self, *fields):
        return convert_to_json(self, fields or (
            "pk",
            "FirstName",
            "LastName",
            "Balance",
            "Email"
        ))


class TallyListEntry(models.Model):
    User = models.ForeignKey(CoffeeUser)
    Amount = models.IntegerField()
    Time = models.DateTimeField(auto_now=True)
    Processed = models.BooleanField(default=False)

    def json(self, *fields):
        return convert_to_json(self, fields or (
            "pk",
            "Amount",
            "Time",
            "User"
        ))