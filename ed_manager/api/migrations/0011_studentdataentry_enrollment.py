# Generated by Django 3.2.9 on 2022-06-04 01:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_assessment_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentdataentry',
            name='enrollment',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.enrollment'),
            preserve_default=False,
        ),
    ]
