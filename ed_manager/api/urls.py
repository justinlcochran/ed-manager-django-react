from django.urls import path
from .views import UserView, StandardView, KnowShowChartView, createKnowShow, MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', UserView.as_view()),
    path('standard', StandardView.as_view()),
    path('knowshowchart', KnowShowChartView.as_view()),
    path('createknowshow/', createKnowShow),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
