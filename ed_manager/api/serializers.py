from rest_framework import serializers
from .models import User, Standard, KnowShowChart


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
