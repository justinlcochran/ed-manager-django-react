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
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        knowObj = [obj for obj in body if 'type' in obj and obj['type'] == 'know']
        knowList = [knowObj[0]['content'][f'{val}'] for val in knowObj[0]['content']]
        showObj = [obj for obj in body if 'type' in obj and obj['type'] == 'show']
        showList = [showObj[0]['content'][f'{val}'] for val in showObj[0]['content']]
        scaffObj = [obj for obj in body if 'type' in obj and obj['type'] == 'scaffold']
        scaffList = [scaffObj[0]['content'][f'{val}'] for val in scaffObj[0]['content']]
        content = {
            'know': knowList,
            'show': showList,
            'scaffold': scaffList,
        }
        standard = Standard.objects.get(id=[obj['id'] for obj in body if 'code' in obj][0])
        creator = User.objects.get(id=[obj['user_id'] for obj in body if 'name' in obj][0])
        newKnowShow = KnowShowChart(
            standard=standard,
            content=content,
            creator=creator
        )
        newKnowShow.save()

    return HttpResponse(status=201)
