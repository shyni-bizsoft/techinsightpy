from django.contrib import admin
from django.urls import path

from . import views
urlpatterns = [
	path('under_maintenance/',views.under_maintenance, name="under_maintenance"),
    ]