# Generated by Django 3.2.9 on 2022-02-21 03:38

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20220120_2105'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='enrollments',
        ),
        migrations.AddField(
            model_name='enrollment',
            name='teachers',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]