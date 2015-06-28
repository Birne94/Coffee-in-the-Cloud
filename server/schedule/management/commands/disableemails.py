from django.core.management.base import BaseCommand

from authentication.models import Account

class Command(BaseCommand):
    help = "Disables emails for all users."

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        for account in Account.objects.all():
            account.receive_emails = False
            account.save()