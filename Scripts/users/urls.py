#urls patterns for users
from django.urls import path
from django.contrib.auth import login

from . import views

from knox import views as knox_views
from .views import LoginAPI

app_name = 'users'
urlpatterns = [
 #register page
 path('register/', views.register_request, name='register'),
 path('login/', views.login_page, name='login'),
 path('logout/', views.logout_view, name='logout'),
 path('login_api/', LoginAPI.as_view(), name='login_api'),
 path('logout_api/', knox_views.LogoutView.as_view(), name='logout_api'),
 path('logoutall_api/', knox_views.LogoutAllView.as_view(), name='logoutall_api'),
]