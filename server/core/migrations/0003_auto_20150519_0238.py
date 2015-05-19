# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_tallylistentry_processed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tallylistentry',
            name='Time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
