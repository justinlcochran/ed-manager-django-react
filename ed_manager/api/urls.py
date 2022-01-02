from django.urls import path
from .views import UserView, StandardView, KnowShowChartView

urlpatterns = [
    path('', UserView.as_view()),
    path('standard', StandardView.as_view()),
    path('knowshowchart', KnowShowChartView.as_view()),

]
