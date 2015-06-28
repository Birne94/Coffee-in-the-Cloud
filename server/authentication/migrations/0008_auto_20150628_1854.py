# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_auto_20150628_1606'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='assignment_base',
            field=models.FloatField(default=5),
        ),
        migrations.AddField(
            model_name='account',
            name='assignment_value',
            field=models.FloatField(default=5),
        ),
    ]
