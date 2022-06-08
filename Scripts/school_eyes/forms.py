from dataclasses import field
from django import forms

from .models import COVERAGE_CHOICES, Topic, Subject

COVERAGE = [
 (0,0),
 (25,25),
 (50,50),
 (75,75),
 (100,100),
]

#choice = Topic.coverage
#new = Topic.coverage

"""class CoverageForm(forms.Form):
    #cover_age = forms.CharField(label='Enter Topic coverage below')
    #widget=forms.RadioSelect(choices=COVERAGE)
    #topic = Topic.objects.all()
    coverage = forms.ChoiceField(choices=COVERAGE, widget=forms.RadioSelect)"""

'''class CoverageForm(forms.ModelForm):
    #coverage=forms.ChoiceField(choices=COVERAGE_CHOICES, widget=forms.RadioSelect())
    class Meta:
        model=Coverage
        fields = ['value']
        #widget = {'coverage': forms.ChoiceField(choices=COVERAGE,widget=forms.RadioSelect())}'''

#class TopicForm(forms.ModelForm):
#   coverage=forms.ChoiceField(choices=COVERAGE_CHOICES, widget=forms.RadioSelect())
#    class Meta:
#        model= Topic
#        fields=['coverage']
#        #widget={'coverage': forms.ChoiceField(choices=COVERAGE_CHOICES)}

#class SubjectForm(forms.ModelForm):
#    class Meta:
#        model = Subject
#        fields =['text'] 

#class AddTopicForm(forms.ModelForm):
    #class Meta :
#        model = Topic
#        fields = ['text','coverage']