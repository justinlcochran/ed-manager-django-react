from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import generics
from .serializers import UserSerializer, StandardSerializer, KnowShowChartSerializer
from .models import User, Standard, KnowShowChart
from django.http import HttpResponse
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
