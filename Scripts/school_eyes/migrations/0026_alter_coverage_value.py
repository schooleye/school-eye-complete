# Generated by Django 4.0.3 on 2022-05-22 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('school_eyes', '0025_alter_coverage_value'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coverage',
            name='value',
            field=models.CharField(choices=[('0', '0'), ('25', '25'), ('50', '50'), ('75', '75'), ('100', '100')], max_length=10),
        ),
    ]
