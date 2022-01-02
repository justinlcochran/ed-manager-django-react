from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, StandardSerializer, KnowShowChartSerializer
from .models import User, Standard, KnowShowChart


# Create your views here.
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class StandardView(generics.ListAPIView):
    queryset = Standard.objects.all()
    serializer_class = StandardSerializer


class KnowShowChartView(generics.ListAPIView):
    queryset = KnowShowChart.objects.all()
    serializer_class = KnowShowChartSerializer
