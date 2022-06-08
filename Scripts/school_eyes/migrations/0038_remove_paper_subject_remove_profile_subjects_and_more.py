# Generated by Django 4.0.3 on 2022-05-29 19:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('school_eyes', '0037_remove_topic_school_topic_school'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paper',
            name='subject',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='subjects',
        ),
        migrations.RemoveField(
            model_name='school_class',
            name='subjects',
        ),
        migrations.RemoveField(
            model_name='topic',
            name='subject',
        ),
        migrations.AddField(
            model_name='subject',
            name='topics',
            field=models.ManyToManyField(to='school_eyes.topic'),
        ),
    ]
