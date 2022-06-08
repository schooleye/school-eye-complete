"""Defines URL patterns for learning_logs."""
from django.urls import path
from . import views

from .views import RegisterAPI

app_name = 'school_eyes'
urlpatterns = [
  #Home page with user login
    path('',views.index, name = 'index' ),
  #school page
    path('school/',views.school, name = 'school' ),
  #subjects page to be integrated with school page
    path('coverage/',views.coverage, name = 'coverage' ),
    #detailed subject page
    path('subject/<subject_id>',views.subject, name = 'subject' ),
    #moes page
    path('ministry/',views.ministry, name = 'moes' ),
    #ministry coverage page to be populated
    path('detail/<subject_id>',views.details, name='details'),
    #for editing coverage for schools
    path('edit_coverage/<topic_id>', views.edit_coverage, name='edit_coverage'),
    #for topic pages form demo no longer needed
    path('topic/<topic_id>',views.topic, name='topic'),
    #for new subjects
    path('new_subject/',views.new_subject, name='new_subject'),
    #for new topics
    path('new_topic/<subject_id>', views.add_topic, name='add_topic'),
    #api paths___--#__
    #topics
    path('topic_api',views.topic_api,name='topic_api'),
    #register
    path('register/', RegisterAPI.as_view(), name='register_api'),
    #all users
    path('schools_api',views.schools_api,name='schools_api'),
    #one user
    path('school_api/<user_id>',views.school_api,name='school_api'),
    #one user with subjects
    path('school_info_api/<profile_id>',views.school_info_api,name='school_info_api'),
    #for dashboard
    path('topic_update',views.topic_update,name='topic_update'),
]
