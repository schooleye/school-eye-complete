from http.client import HTTPResponse
from multiprocessing import context
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, Http404
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

#rest framework imports
from rest_framework.response import Response
from rest_framework.decorators import api_view
from knox.models import AuthToken
from rest_framework import generics, permissions


from .serializers import TopicSerializer,UserSerializer, RegisterSerializer,ProfileSerializer, TopicListSerializer
from .models import School_class,Subject,Topic,Paper,Profile
#from .forms import TopicForm, SubjectForm , AddTopicForm



def index(request):
    #home page
    return render(request,'school_eyes/index.html')

@login_required
def school(request):
    #to display a school's coverage and topics
    subjects = Subject.objects.filter(school=request.user).order_by('id')
    context = {'subjects':subjects}
    return render(request,'school_eyes/school.html', context)

@login_required
def coverage(request):
    subjects = Subject.objects.order_by('id')
    context = {'subjects':subjects}
    return render(request, 'school_eyes/coverage.html', context)

@login_required
def subject(request, subject_id):
    subject = Subject.objects.get(id=subject_id)
    topics = Topic.objects.filter(subject=subject_id)
    coverage= Topic.coverage
    if subject.school != request.user:
        raise Http404
    context = {'subject':subject ,'topics':topics,'coverage':coverage}
    return render(request, 'school_eyes/subject.html',context)

@login_required
def ministry(request):
    #subject_id = Subject.objects.values_list('id')
    subjects = Subject.objects.all()
    #topics = Topic.objects.filter(subject=subject_id)
    context={'subjects':subjects}
    return render(request,'school_eyes/moes.html',context)  

@login_required
def details(request, subject_id):
    subject = Subject.objects.get(id=subject_id)
    topics = Topic.objects.filter(subject=subject_id)      
    context = {'subject':subject,'topics':topics}
    return render(request,'school_eyes/details.html',context)

@login_required
def edit_coverage(request,topic_id):
    topic = Topic.objects.get(id = topic_id)
    subject = topic.subject
    '''if request.method != 'POST':
        #nothing submitted, create a blank form
        form = TopicForm(instance=topic)
    else:
        #DAta entered
        form = TopicForm(instance=topic,data=request.POST)
        if form.is_valid():
            form.save()
            #return reverse('school_eyes:subject')
            return HttpResponseRedirect(reverse('school_eyes:school'))    
    context = {'topic':topic, 'form':form}'''
    return render(request, 'school_eyes/edit_coverage.html',context)

@login_required
def topic(request,topic_id):
    topic = Topic.objects.get(id=topic_id)
    context={'topic':topic}
    return render(request,'school_eyes/topic.html' ,context)

@login_required
def new_subject(request):
    '''form = SubjectForm()
    if request.method != 'POST':
        form = SubjectForm()
        #No data submitted   
    else:
        form = SubjectForm(request.POST)
        if form.is_valid():
            new_subject = form.save(commit=False)
            new_subject.school = request.user
            new_subject.save()
            #form.save()
            return redirect('school_eyes:school')
    context = {'form':form}'''
    return render(request, 'school_eyes/new_subject.html', context)

@login_required
def add_topic(request, subject_id):
    subject = Subject.objects.get(id=subject_id)
    '''form = AddTopicForm
    if request.method != 'POST':
        form = AddTopicForm()
        #no data
    else:
        new_topic = form.save(commit=False)
        new_topic.school = request.user
        new_topic.subject = subject
        new_topic.save()
        return redirect('school_eyes:subject', args=[subject_id]) 
    context = {'subject':subject,'form':form} '''
    return render(request,'school_eyes/add_topic.html',context) 

@api_view(['GET','POST'])
def topic_api(request):
    top = Topic.objects.all()
    serializer = TopicSerializer(top, many=True)
    return Response(serializer.data)

"""class based views"""
# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })

@api_view(['GET'])
def schools_api(request):
    schools = User.objects.filter(is_staff= False)
    serializer = UserSerializer(schools, many=True)
    return Response(serializer.data)

#for testing purposes
@api_view(['GET'])
def school_api(request, user_id):
    #school = User.objects.filter(is_staff= False)
    object = User.objects.filter(id=user_id)
    serializer = UserSerializer(object, many=True)
    return Response(serializer.data)

#for ministry page
@api_view(['GET'])
def school_info_api(request, profile_id):
    data = Profile.objects.filter(id=profile_id)
    serializer = ProfileSerializer(data, many=True)
    #Coverage.objects.create()
    return Response(serializer.data)

@api_view(['GET','POST'])
def topic_update(request):
    topics = Topic.objects.all()
    #data = {'Topic':coverage}
    serializer = TopicListSerializer(topics,data=request.data,child=TopicSerializer()) #
    if serializer.is_valid():
        coverage = serializer.save()
    return Response(serializer.data)    