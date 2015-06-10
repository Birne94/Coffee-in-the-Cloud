# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scheduleentry',
            name='type',
            field=models.CharField(max_length=1, choices=[(b'w', b'weekly cleaning'), (b'b', b'biweekly cleaning'), (b'o', b'cleaning')]),
        ),
    ]
