from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics
from .serializers import UserSerializer, StandardSerializer, KnowShowChartSerializer, AssessmentSerializer, StandardSetSerializer, EnrollmentSerializer
from .models import User, Standard, KnowShowChart, Assessment, Question, Answer, StandardSet, Enrollment, \
    StudentDataEntry
from django.http import HttpResponse, JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.first_name
        token['role'] = user.role
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class StudentList(generics.ListAPIView):
    queryset = User.objects.filter(role="Student")
    serializer_class = UserSerializer


class StandardView(generics.ListAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer


class KnowShowChartView(generics.ListAPIView):
    queryset = KnowShowChart.objects.all()
    serializer_class = KnowShowChartSerializer


class AssessmentView(generics.ListAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer


class StandardSetView(generics.ListAPIView):
    queryset = StandardSet.objects.all()
    serializer_class = StandardSetSerializer


class EnrollmentView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        enrollment = self.kwargs['pk']
        return Enrollment.objects.filter(id=enrollment)


class EnrollmentForDashboardView(generics.ListAPIView):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        user = self.kwargs['pk']
        return Enrollment.objects.filter(teachers__id=user)


def createKnowShow(request):
    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))
        keys = ['know', 'show', 'scaffold']
        know, show, scaffold = [list(body['fields'][x].values()) for x in keys]
        content = {
            'know': know,
            'show': show,
            'scaffold': scaffold,
        }
        standard = Standard.objects.get(id=body['standard']['id'])
        creator = User.objects.get(id=body['user']['user_id'])
        newKnowShow = KnowShowChart(
            standard=standard,
            content=content,
            creator=creator,
            author=creator.first_name,
        )
        newKnowShow.save()

    return HttpResponse(status=201)


def createEnrollment(request):

    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))
        print(body)
        creator = User.objects.get(id=body['user']['user_id'])
        newEnrollment = Enrollment(
            title=body['title'],
            subject=body['subject'],
            standardSet=StandardSet.objects.get(id=body['standardSet']['id']),
        )
        newEnrollment.save()
        newEnrollment.students.set([User.objects.get(id=x['id']) for x in body['students']])
        newEnrollment.teachers.add(creator)

    return HttpResponse(status=201)


def createAssessment(request):
    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))
        newAssessment = Assessment(
            know_show_chart=KnowShowChart.objects.get(id=body['knowShow']['id']),
            author=User.objects.get(id=body['user']['user_id']),
            title=body['title']
        )
        newAssessment.save()
        for questionObj in body['questions']:
            newQuestion = Question(
                assessment=newAssessment,
                text=questionObj['question'],
                satisfied=questionObj['ks'],
            )
            newQuestion.save()
            for answer in questionObj['answers']:
                newAnswer = Answer(
                    text=answer['text'],
                    correct=answer['correct'],
                    question=newQuestion
                )
                newAnswer.save()

    return HttpResponse(status=201)


def getAssessment(request, pk):
    questionList = Assessment.objects.get(id=pk).get_questions()
    know = Assessment.objects.get(id=pk).know_show_chart.content['know']
    show = Assessment.objects.get(id=pk).know_show_chart.content['show']
    questionObjList = [{'question': question.text, 'answers': [{'correct': answer.correct, 'text': answer.text} for answer in question.get_answers()], 'ks': question.satisfied} for question in questionList]
    context = {
        'assessmentId': pk,
        'know': know,
        'show': show,
        'questions': questionObjList
    }
    data = json.dumps(context)
    return JsonResponse(data, safe=False)


def getStudentAssessment(request, pk):
    assessmentId = StudentDataEntry.objects.get(id=pk).assessment_id
    questionList = Assessment.objects.get(id=assessmentId).get_questions()
    know = Assessment.objects.get(id=assessmentId).know_show_chart.content['know']
    show = Assessment.objects.get(id=assessmentId).know_show_chart.content['show']
    questionObjList = [{'question': question.text,
                        'answers': [{'text': answer.text} for answer in
                                    question.get_answers()], 'ks': question.satisfied} for question in questionList]
    context = {
        'assessmentId': assessmentId,
        'know': know,
        'show': show,
        'questions': questionObjList,
        'student': StudentDataEntry.objects.get(id=pk).student.id
    }
    data = json.dumps(context)
    return JsonResponse(data, safe=False)


def getTeacherDashboard(request, pk):
    context = {
        'enrollments': list(Enrollment.objects.filter(teachers__id=pk))
    }
    data = json.dumps(context)

    return JsonResponse(data, safe=False)


def getEnrollmentDashboard(request, pk):
    teachers = Enrollment.objects.values_list('teachers', flat=True).filter(id=pk)
    students = [{'id': x,
                 'firstname': User.objects.get(id=x).first_name,
                 'lastname': User.objects.get(id=x).last_name,
                 'scores': [{'standard': entry.assessment.get_standard().code, 'result': entry.result} for entry in StudentDataEntry.objects.filter(enrollment_id=pk, student__id=x)]} for x in Enrollment.objects.values_list('students', flat=True).filter(id=pk)]



    context = {
        'title': Enrollment.objects.get(id=pk).title,
        'students': students,
        'standardSet': Enrollment.objects.get(id=pk).standardSet.title,
        'standards': [{'code': x.code, 'text': x.text} for x in Enrollment.objects.get(id=pk).standardSet.get_standards()],

    }

    data = json.dumps(context)
    return JsonResponse(data, safe=False)



def getStudentDashboard(request, pk):
    dataEntrySet = StudentDataEntry.objects.filter(student=pk).filter(completion_status=False)
    resultsEntrySet = StudentDataEntry.objects.filter(student=pk).filter(completion_status=True)
    context = {'assessments':
                   [{
                        'title': entry.assessment.title,
                        'enrollment': entry.enrollment.title,
                        'dueDate': str(entry.due_date),
                        'assessment': entry.assessment.id,
                        'id': entry.id} for entry in dataEntrySet],
               'results':
                    [{
                        'title': entry.assessment.title,
                        'enrollment': entry.enrollment.title,
                        'dueDate': str(entry.due_date),
                        'assessment': entry.assessment.id,
                        'id': entry.id,
                        'results': entry.result} for entry in resultsEntrySet]

               }


    data = json.dumps(context)
    return JsonResponse(data, safe=False)


def createStudentDataEntry(request):
    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))
        print(body)
        students = Enrollment.objects.values_list('students', flat=True).filter(id=body['enrollmentId'])
        for student in students:
            newDataEntry = StudentDataEntry(
                assessment=Assessment.objects.get(id=body['assessmentId']),
                enrollment=Enrollment.objects.get(id=body['enrollmentId']),
                student=User.objects.get(id=student),
                due_date=body['dueDate'][:10]
            )
            newDataEntry.save()
        return HttpResponse(200)


def updateStudentDataEntry(request, pk):
    data_entry = StudentDataEntry.objects.get(id=pk)
    assessment = data_entry.assessment
    questions = assessment.get_questions()
    body = json.loads(request.body.decode('utf-8'))
    results = body['studentResponse']
    for i in results:
        questionObj = next((x for x in questions if x.text == i['question']), None)
        correctAnswer = next((x for x in questionObj.get_answers() if x.correct == True), None).text
        if i['response'] == correctAnswer:
            i['score'] = True
        else:
            i['score'] = False
            i['correctAnswer'] = correctAnswer
    StudentDataEntry.objects.filter(id=pk).update(
        result=results,
        completion_status=True,
    )

    return HttpResponse(204)

