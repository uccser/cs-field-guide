# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-10-17 03:46
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('interactives', '0010_auto_20181011_0102'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='interactive',
            name='name_xx_lr',
        ),
        migrations.RemoveField(
            model_name='interactive',
            name='name_yy_rl',
        ),
        migrations.RemoveField(
            model_name='interactive',
            name='template_xx_lr',
        ),
        migrations.RemoveField(
            model_name='interactive',
            name='template_yy_rl',
        ),
    ]
