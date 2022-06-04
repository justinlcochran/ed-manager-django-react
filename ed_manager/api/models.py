from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class StandardSet(models.Model):
    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=20, choices=(("Math", "Math"),
                                                       ("Science", "Science"),
                                                       ("English", "English"),
                                                       ("Social Studies", "Social Studies"),
                                                       ("Elective", "Elective"),
                                                       ))
    grade = models.IntegerField()

    def get_standards(self):
        return self.standard_set.all()

    def __str__(self):
        return self.title


class Standard(models.Model):
    code = models.CharField(max_length=200)
    text = models.CharField(max_length=200)
    standardSet = models.ForeignKey(StandardSet, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.code


class User(AbstractUser):
    role = models.CharField(
        max_length=20,
        choices=(
            ("Administrator", "Administrator"),
            ("Teacher", "Teacher"),
            ("Student", "Student"),
        )
    )


class Enrollment(models.Model):
    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=20, choices=(("Math", "Math"),
                                                       ("Science", "Science"),
                                                       ("English", "English"),
                                                       ("Social Studies", "Social Studies"),
                                                       ("Elective", "Elective"),
                                                       ))
    standardSet = models.ForeignKey(StandardSet, on_delete=models.CASCADE, null=True)
    students = models.ManyToManyField(User, related_name='selectedStudents')
    teachers = models.ManyToManyField(User, related_name='teacherCreator')


class KnowShowChart(models.Model):
    content = models.JSONField()
    standard = models.ForeignKey(Standard, on_delete=models.CASCADE)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)
    author = models.CharField(max_length=200, default='Justin')

    # def get_assessments(self):
    #     return self.assessment_set.all()

    def __str__(self):
        return f'{self.standard} created by {self.creator} on {self.created}'


class Assessment(models.Model):
    title = models.CharField(max_length=200)
    know_show_chart = models.ForeignKey(KnowShowChart, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)

    def get_standard(self):
        return self.know_show_chart.standard

    def get_questions(self):
        return self.question_set.all()


class Question(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    satisfied = models.CharField(max_length=400)
    text = models.CharField(max_length=200)
    created = models.DateField(auto_now_add=True)

    def get_standard(self):
        return self.assessment.know_show_chart.standard

    def get_answers(self):
        return self.answer_set.all()

    def __str__(self):
        return self.text


class Answer(models.Model):
    text = models.CharField(max_length=200)
    correct = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return f"question: {self.question}, answer: {self.text}, correct: {self.correct}"


class StudentDataEntry(models.Model):
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    assigned = models.DateField(auto_now_add=True)
    completion_status = models.BooleanField(default=False)
    due_date = models.DateField()
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    result = models.JSONField()



