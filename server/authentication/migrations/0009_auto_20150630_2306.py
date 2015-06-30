# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_auto_20150628_1854'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='account',
            options={'permissions': [('manage_balance', 'Can manage balance')]},
        ),
    ]
