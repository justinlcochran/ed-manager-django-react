# Generated by Django 3.2.9 on 2022-01-21 04:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_enrollment_standardset'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enrollment',
            name='standardSet',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.standardset'),
        ),
    ]
