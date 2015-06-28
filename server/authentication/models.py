from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import BaseUserManager, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
import re


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError("Users must have a valid email address.")

        if not kwargs.get("first_name") or not kwargs.get("last_name"):
            raise ValueError("Users must have a valid first and last name.")

        account = self.model(
            email=self.normalize_email(email),
            first_name=kwargs.get("first_name"),
            last_name=kwargs.get("last_name")
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_staff = True
        account.is_superuser = True
        account.save()

        return account


class Account(AbstractBaseUser, PermissionsMixin):
    # user details
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=40, blank=True)
    last_name = models.CharField(_('last name'), max_length=40, blank=True)
    avatar = models.ImageField("profile picture",
                               upload_to="static/upload",
                               blank=True)

    # admin/staff status
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_active = models.BooleanField(_('active'), default=True)

    # timestamps
    created_at = models.DateTimeField(_('date joined'), auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # current user balance
    balance = models.FloatField("account balance", default=0)

    # settings
    receive_emails = models.BooleanField("receive notification emails", default=True)
    show_in_rankings = models.BooleanField("show in rankings and statistics", default=True)

    # assignment
    assignment_base = models.FloatField(default=5)
    assignment_value = models.FloatField(default=5)

    objects = AccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __unicode__(self):
        return "%s (%s)" % (self.get_full_name(), self.email)

    def get_tally_list_entries(self):
        import tallylist.models
        entries = tallylist.models.TallyListEntry.objects.filter(user=self)
        return sum([entry.amount for entry in entries])
    get_tally_list_entries.short_description = "Tally List Entries"

    def get_unprocessed_tally_list_entries(self):
        import tallylist.models
        entries = tallylist.models.TallyListEntry.objects.filter(user=self, processed=False)
        return sum([entry.amount for entry in entries])
    get_unprocessed_tally_list_entries.short_description = "Unprocessed Tally List Entries"

    def get_tally_list_status(self):
        return "%d unprocessed (%d total)" % (self.get_unprocessed_tally_list_entries(), self.get_tally_list_entries())
    get_tally_list_status.short_description = "Tally List"

    def get_full_name(self):
        return " ".join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    def get_user_name(self):
        name = self.get_full_name()
        name = name.replace(" ", ".")
        name = re.sub("[^a-zA-Z.]", "_", name)
        return name

    def is_guest(self):
        return self.pk == 7