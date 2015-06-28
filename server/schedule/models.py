from django.db import models
from django.utils import timezone
from authentication.models import Account
from server.mail import send_email_plain
from server.settings import MAIL_SENDER
from django.core.exceptions import ValidationError
from django.template.loader import render_to_string
import server.settings
import base64
import datetime
import random
from icalendar import Calendar, Event, Alarm

ScheduleEntryTypes = (
    ("w", "weekly cleaning"),
    ("b", "biweekly cleaning"),
    ("o", "cleaning")
)


def format(time):
    if isinstance(time, datetime.date):
        return "%.4d%.2d%.2dT000000" % (time.year, time.month, time.day)
    return "%.4d%.2d%.2dT%.2d%.2d%.2d" % (time.year, time.month, time.day, time.hour, time.minute, time.second)


class ScheduleEntry(models.Model):
    user = models.ForeignKey(Account)
    date = models.DateField()
    type = models.CharField(max_length=1, choices=ScheduleEntryTypes)
    done = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            ical = Calendar()
            subject = "You have been selected for cleaning"
            ical["method"] = "REQUEST"
            ical["PRODID"] = "Microsoft Exchange Server 2010"
            ical["VERSION"] = "2.0"
            evt = Event()
            evt["summary"] = "Coffee Machine Cleaning"
            evt["description"] = subject
            evt["dtstart"] = format(self.date)
            evt["dstend"] = format(self.date + datetime.timedelta(days=1))
            evt["dtstamp"] = format(datetime.datetime.now())
            evt["class"] = "PUBLIC"
            evt["organizer"] = "MAILTO:%s" % server.settings.MAIL_SENDER
            evt["location"] = "BPM Lighthouse"
            evt["priority"] = "5"
            evt["status"] = "CONFIRMED"
            evt["transp"] = "OPAQUE"
            evt["sequence"] = "0"
            evt["uid"] = int(random.random()*10**17)
            evt["X-MICROSOFT-CDO-APPT-SEQUENCE"] = "0"
            evt["X-MICROSOFT-CDO-OWNERAPPTID"] = "2113312661"
            evt["X-MICROSOFT-CDO-BUSYSTATUS"] = "TENTATIVE"
            evt["X-MICROSOFT-CDO-INTENDEDSTATUS"] = "BUSY"
            evt["X-MICROSOFT-CDO-ALLDAYEVENT"] = "TRUE"
            evt["X-MICROSOFT-CDO-IMPORTANCE"] = "1"
            evt["X-MICROSOFT-CDO-INSTTYPE"] = "0"
            evt["X-MICROSOFT-DISALLOW-COUNTER"] = "FALSE"
            alarm = Alarm()
            alarm["action"] = "DISPLAY"
            alarm["description"] = "REMINDER"
            alarm["TRIGGER;RELATED=START"] = "-PT15M"
            evt.add_component(alarm)
            ical.add_component(evt)

            content = render_to_string("mail-schedule.txt", {
                           "firstname": self.user.first_name,
                           "lastname": self.user.last_name,
                           "date": self.date,
                           "type": dict(ScheduleEntryTypes).get(self.type, "cleaning"),
                           "mail": self.user.email,
                           "subject": subject,
                           "ical": base64.b64encode(ical.to_ical()),
                           "id": int(random.random()*10**17),
                           "sender_mail": MAIL_SENDER
                       })
            send_email_plain(MAIL_SENDER,
                       [self.user.email],
                       content
            )

        super(ScheduleEntry, self).save(*args, **kwargs)

    def clean(self):
        all = ScheduleEntry.objects.filter(date=self.date).all()
        if len(all) > 0:
            if len(all) > 1 or all[0] != self:
                raise ValidationError("There can only be one cleaning a day!")
        if self.type != "o" and self.date.weekday() != 4:
            raise ValidationError("Weekly/Biweekly cleaning can only be done on Fridays!")

