# Generated by Django 3.2.9 on 2022-06-15 15:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_studentdataentry_result'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlanWeek',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('monday', models.DateField()),
                ('daily_know_show', models.JSONField(default={})),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]