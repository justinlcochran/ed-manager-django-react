# Generated by Django 3.2.9 on 2022-06-03 16:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20220522_1105'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentDataEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assigned', models.DateField(auto_now_add=True)),
                ('completion_status', models.BooleanField(default=False)),
                ('due_date', models.DateField()),
                ('result', models.JSONField()),
                ('assessment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.assessment')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]