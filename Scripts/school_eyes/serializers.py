from dataclasses import fields
from logging import info
from rest_framework import serializers
from .models import Topic, Subject,Profile,COVERAGE_CHOICES
from django.contrib.auth.models import User

#Activate user profiles
#gIVE ministry user specific data on get request
#send user id with topics
#send user list with id
#update models.py to send easier

class TopicSerializer(serializers.ModelSerializer):
    coverage = serializers.ChoiceField(choices=COVERAGE_CHOICES)
    class Meta:
        model = Topic
        fields = '__all__'
        #list_serializer_class = TopicListSerializer
        #fields = ('id','text','subject','school','coverage')


class TopicListSerializer(serializers.ListSerializer):
    tags = serializers.ListField(child=TopicSerializer())
    def update(self,instance,validated_data):
        instance.coverage = validated_data.get('coverage',instance.coverage)
        instance.save()
        return instance


class Subject(serializers.ModelSerializer):
    school = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault())
    class Meta:
        model = Subject
        fields = "__all__"

#profile serializer
class ProfileSerializer(serializers.ModelSerializer):
    topics = Topic.objects.all()
    profile_id = serializers.CharField
    topic_dict = serializers.DictField(child = serializers.CharField())
    #topic = serializers.CharField(max_length=15)
    class Meta:
        model = Profile
        fields = '__all__'
    #for topics and coverage
# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    #profile = ProfileSerializer()
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user

'''class SchoolInfoSerializer(serializers.ModelSerializer):
    #serializer to have school with topics and subjects
    class SubjectInfoSerializer(serializers.ModelSerializer):
        class Meta:
            model = Subject
            fields = ('text')
    subject = SubjectInfoSerializer()
    class Meta :
        model = User
        fields = '__all__'    '''

class SubjectSerializer(serializers.ModelSerializer):
    '''school = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault())'''
    class Meta:
        model = Subject
        fields = '__all__'

        