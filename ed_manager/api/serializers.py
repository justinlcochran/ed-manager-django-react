from rest_framework import serializers
from .models import User, Standard, KnowShowChart, Assessment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'role')


class StandardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Standard
        fields = '__all__'


class KnowShowChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowShowChart
        fields = '__all__'


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'


class StandardSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'
