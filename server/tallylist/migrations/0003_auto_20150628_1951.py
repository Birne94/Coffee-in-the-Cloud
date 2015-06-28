# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tallylist', '0002_auto_20150522_1228'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tallylistentry',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
