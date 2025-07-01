# from rest_framework import serializers
# from .models import Project, Task
# from django.contrib.auth.models import User

# class TaskSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Task
#         fields = '__all__'
#         read_only_fields = ['project']

# class ProjectSerializer(serializers.ModelSerializer):
    
#     tasks = TaskSerializer(many=True, read_only=True, source='task_set')  # use reverse relation

#     class Meta:
#         model = Project
#         fields = ['id', 'name','owner','tasks']
#         read_only_fields = ['owner']