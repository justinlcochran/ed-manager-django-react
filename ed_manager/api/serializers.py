from rest_framework import serializers
from .models import User, Standard, KnowShowChart, Assessment, StandardSet, Enrollment, PlanWeek


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
        model = StandardSet
        fields = '__all__'


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'


class PlanWeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanWeek
        fields = '__all__'
