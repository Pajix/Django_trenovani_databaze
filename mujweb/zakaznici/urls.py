from django.urls import path
from . import views


urlpatterns = [
    path('', views.zakaznici, name='pridat_zakaznika'),
]
