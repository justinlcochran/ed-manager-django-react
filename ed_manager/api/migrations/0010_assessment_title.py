# Generated by Django 3.2.9 on 2022-06-03 22:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_studentdataentry'),
    ]

    operations = [
        migrations.AddField(
            model_name='assessment',
            name='title',
            field=models.CharField(default='old', max_length=200),
            preserve_default=False,
        ),
    ]
