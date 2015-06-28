import datetime

from django.core.management.base import BaseCommand, CommandError

from authentication.models import Account
from schedule.models import ScheduleEntry
from tallylist.models import TallyListEntry


def next_weekday(d, weekday):
    days_ahead = weekday - d.weekday()
    if days_ahead < 0: # Target day already happened this week
        days_ahead += 7
    return d + datetime.timedelta(days_ahead)


class Command(BaseCommand):
    help = "Automatically assigns users for cleaning."

    def add_arguments(self, parser):
        parser.add_argument("weeks", type=int)

    def handle(self, *args, **options):
        self.stdout.write("Beginning assignment for %d week(s)." % options["weeks"])

        # fetch all accounts
        accounts = Account.objects.all()
        assigned = 0

        # try to find the last assignment
        last_assignments = TallyListEntry.objects.filter(processed=False).order_by("created_at")
        if len(last_assignments) > 0:
            last_assignment = last_assignments[0].created_at
        else:
            last_assignment = datetime.datetime.now()
        number_of_days = (datetime.datetime.now() - datetime.datetime(last_assignment.year, last_assignment.month, last_assignment.day)).days

        self.stdout.write("Last assignment was on %s (%d days ago)" % (last_assignment, number_of_days))

        # try to find the month we start at
        schedule_entries = ScheduleEntry.objects.filter(type__in=["w", "b"]).order_by('-date')
        if len(schedule_entries) > 0:
            week = schedule_entries[0].date
            type = schedule_entries[0].type

            type = "w" if type == "b" else "b"
            week += datetime.timedelta(weeks=1)
        else:
            now = datetime.datetime.now()
            week = datetime.date(now.year, now.month, now.day)
            type = "w"

        # get the next friday for cleaning
        week = next_weekday(week, 4)

        while assigned < options["weeks"]:
            self.stdout.write("Looking for %s cleaning for %s" % (type, week))

            # at first update the assignment values based on coffee consumption
            for account in accounts:
                coffee_count = 0
                coffees = TallyListEntry.objects.filter(user=account, processed=False)

                for coffee in coffees:
                    coffee_count += coffee.amount
                    coffee.processed = True
                    coffee.save()

                account.assignment_value += coffee_count / float(max(1, number_of_days))
                account.save()

            # assign the user with the highest value
            assigned_user = None
            for account in accounts:
                account.assignment_value += 1
                account.save()
                if not assigned_user or assigned_user.assignment_value < account.assignment_value:
                    assigned_user = account

            # we found one!
            if assigned_user:
                self.stdout.write("User assigned: %s" % assigned_user.get_full_name())
                assigned += 1

                assigned_user.assignment_value = assigned_user.assignment_base
                assigned_user.save()

                entry = ScheduleEntry(user=assigned_user,
                                      date=week,
                                      type=type,
                                      done=False)
                entry.save()
            else:
                self.stderr.write("No user could be assigned!")
                break

            type = "w" if type == "b" else "b"
            week += datetime.timedelta(weeks=1)

        self.stdout.write("Assignment complete.")