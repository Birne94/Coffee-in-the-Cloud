# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tallylist', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tallylistentry',
            name='processed',
            field=models.BooleanField(default=False, verbose_name=b'check if the entry has been booked yet.'),
        ),
    ]
