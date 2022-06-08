from pyexpat import model
from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
#from django.db.models.utils import list_to_queryset
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType



'''COVERAGE_CHOICES = [
(0 , 0),
(25 , 25),
(50 , 50),
(75 , 75 ),
(100 , 100)]'''

#for coverage
COVERAGE_CHOICES = [
            ('0', '0'),
            ('25', '25'),
            ('75', '75'),
            ('100', '100'),
        ]



#school
'''class School(models.Model):
    text = models.CharField(max_length=100)
    district = models.CharField(max_length=50)

    def __str__(self):
        #return a string rep of the model
        return self.text'''

#subject
class Subject(models.Model):
    SUBJECTS= [
            ('Physics', 'Physics'),
            ('Chemistry', 'Chemistry'),
            ('Maths', 'Maths'),
            
        ]


    text = models.CharField(max_length=20, choices=SUBJECTS)
    #papers= models.ManyToManyField(Paper)
    #topics = models.ManyToOneRel(Topic, on_delete=models.CASCADE)
    #school = models.ForeignKey(User,on_delete=models.CASCADE)
    def __str__(self):
        '''return a string rep of the model'''
        return self.text


class Paper(models.Model):
    text = models.CharField(max_length=70)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    #topics = models.ManyToManyField(Topic)

    def __str__(self):
        #return a string rep of the model
        return self.text




#class
class School_class(models.Model):
    text = models.CharField(max_length=50)
    level = models.CharField(max_length=50)
    school = models.ForeignKey(User, on_delete=models.CASCADE)
    subjects = models.ManyToManyField(Subject)

    class Meta:
        verbose_name_plural = 'classes'

    def __str__(self):
        '''return a string rep of the model'''
        return self.text

#for user coverages
'''class Coverage(models.Model):
    value = models.CharField(max_length=10,choices=COVERAGE_CHOICES)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='coverage_topic')
    owner = models.ForeignKey(User, on_delete=models.CASCADE,null='TRUE', blank='TRUE')
    #school = models.ForeignKey(User, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    #value = models.IntegerField(choices=COVERAGE_CHOICES)
    content_object = GenericForeignKey()

    class Meta:
        verbose_name_plural = 'coverage'

    def __str__(self):
        #return a string rep of the model
        return self.value'''

#topic
class Topic(models.Model):
    text = models.CharField(max_length=70)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null='TRUE', blank='TRUE')
    school = models.ForeignKey(User,on_delete=models.CASCADE)
    coverage = models.CharField(max_length=10,choices=COVERAGE_CHOICES ) #''', added_by=request.User'''
    #coverage = GenericRelation(Coverage, related_query_name='topic')

    def __str__(self):
        '''return a string rep of the model'''
        return self.text




class Profile(models.Model):
    REGIONS= [
            ('North', 'North'),
            ('East', 'East'),
            ('West', 'West'),
            ('Central', 'Central'),
        ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #region = models.CharField(max_length=15, choices= REGIONS
    topics =Topic.objects.all()
    profile_id = User.id
    
    topic_dict={}
    
    #coverages
    #values = GenericRelation(Coverage)
    #coverage = Coverage.objects.all()
    for topic in topics:
        #coverage = Coverage.objects.filter(value='25')
        topic_dict.update({topic.text:topic.coverage})

    def __str__(self):
        '''return a string rep of the model'''
        return str(self.user)
'''    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()'''




