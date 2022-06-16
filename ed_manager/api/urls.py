from django.urls import path
from .views import UserView, StandardView, KnowShowChartView, createKnowShow, MyTokenObtainPairView, createAssessment, \
    AssessmentView, getAssessment, getTeacherDashboard, createEnrollment, StandardSetView, StudentList, EnrollmentView, \
    EnrollmentForDashboardView, getEnrollmentDashboard, createStudentDataEntry, updateStudentDataEntry, \
    getStudentDashboard, getStudentAssessment, createPlanWeek

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', UserView.as_view()),
    path('standard/', StandardView.as_view()),
    path('knowshowchart/', KnowShowChartView.as_view()),
    path('assessment/', AssessmentView.as_view()),
    path('standardset/', StandardSetView.as_view()),
    path('studentlist/', StudentList.as_view()),
    path('enrollment/<int:pk>', getEnrollmentDashboard),
    path('getassessment/<int:pk>', getAssessment),
    path('getstudentassessment/<int:pk>', getStudentAssessment),
    path('teacherdashboard/<int:pk>', getTeacherDashboard),
    path('studentdashboard/<int:pk>', getStudentDashboard),
    path('createknowshow/', createKnowShow),
    path('createassessment/', createAssessment),
    path('createenrollment/', createEnrollment),
    path('createstudentdataentry/', createStudentDataEntry),
    path('saveweek/', createPlanWeek),
    path('updatestudentdataentry/<int:pk>', updateStudentDataEntry),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
