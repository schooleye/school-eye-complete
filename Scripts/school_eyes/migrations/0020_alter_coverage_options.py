# Generated by Django 4.0.3 on 2022-05-22 11:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('school_eyes', '0019_rename_coverage_coverage_value_remove_coverage_topic_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='coverage',
            options={'verbose_name_plural': 'classes'},
        ),
    ]