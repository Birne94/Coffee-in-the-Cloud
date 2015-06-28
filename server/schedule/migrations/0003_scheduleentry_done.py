# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0002_auto_20150610_1208'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduleentry',
            name='done',
            field=models.BooleanField(default=False),
        ),
    ]
