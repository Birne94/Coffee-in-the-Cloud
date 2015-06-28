# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_account_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='receive_emails',
            field=models.BooleanField(default=True, verbose_name=b'receive notification emails'),
        ),
        migrations.AddField(
            model_name='account',
            name='show_in_rankings',
            field=models.BooleanField(default=True, verbose_name=b'show in rankings and statistics'),
        ),
    ]
