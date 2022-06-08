from django.contrib import admin

from .models import Topic,Subject,School_class,Paper,Profile


#admin.site.register(Coverage)
admin.site.register(Topic)
admin.site.register(Subject)
admin.site.register(School_class)
admin.site.register(Paper)
admin.site.register(Profile)

