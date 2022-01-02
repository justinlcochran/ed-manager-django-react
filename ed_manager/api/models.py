from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


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


class KnowShowChart(models.Model):
    content = models.JSONField()
    standard = models.ForeignKey(Standard, on_delete=models.CASCADE)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)

    # def get_assessments(self):
    #     return self.assessment_set.all()

    def __str__(self):
        return f'{self.standard} created by {self.creator} on {self.created}'
