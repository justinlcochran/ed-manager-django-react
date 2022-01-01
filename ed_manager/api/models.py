from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    role = models.CharField(
        max_length=20,
        choices=(
            ("Administrator", "Administrator"),
            ("Teacher", "Teacher"),
            ("Student", "Student"),
        )
    )


class Standard(models.Model):
    code = models.CharField(max_length=200)
    text = models.CharField(max_length=200)
    subject = models.CharField(max_length=20, choices=(("Math", "Math"),
                                                       ("Science", "Science"),
                                                       ("English", "English"),
                                                       ("Social Studies", "Social Studies"),
                                                       ("Elective", "Elective"),
                                                       ))

    def __str__(self):
        return self.code
