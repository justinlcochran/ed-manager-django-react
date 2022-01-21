from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics
from .serializers import UserSerializer, StandardSerializer, KnowShowChartSerializer, AssessmentSerializer, StandardSetSerializer
from .models import User, Standard, KnowShowChart, Assessment, Question, Answer, StandardSet
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


def createAssessment(request):
    if request.method == "POST":
        body = json.loads(request.body.decode('utf-8'))
        newAssessment = Assessment(
            know_show_chart=KnowShowChart.objects.get(id=body['knowShow']['id']),
            author=User.objects.get(id=body['user']['user_id'])
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


def getAssessment(request):
    questionList = Assessment.objects.get(id=1).get_questions()
    know = Assessment.objects.get(id=1).know_show_chart.content['know']
    show = Assessment.objects.get(id=1).know_show_chart.content['show']
    questionObjList = [{'question': question.text, 'answers': [{'correct': answer.correct, 'text': answer.text} for answer in question.get_answers()], 'ks': question.satisfied} for question in questionList]
    context = {
        'know': know,
        'show': show,
        'questions': questionObjList
    }
    data = json.dumps(context)
    return JsonResponse(data, safe=False)


def createEnrollment(request):
    return HttpResponse(status=201)


