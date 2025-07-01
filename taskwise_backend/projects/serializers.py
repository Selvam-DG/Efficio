from rest_framework import serializers
from .models import Project, Team, Task, Comment
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'email', 'role']


class TeamSerializer(serializers.ModelSerializer):
    members = UserSerializer( many=True, read_only = True)
    members_id = serializers.PrimaryKeyRelatedField(
        many = True, queryset=User.objects.all(), write_only=True, source='members'
    )

    class Meta:
        model = Team
        fields = ['id','name', 'description', 'members', 'members_id', 'created_at']

    
class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer( read_only = True)
    team = serializers.PrimaryKeyRelatedField( queryset = Team.objects.all())

    class Meta:
        model = Project
        fields = [ 'id', 'name', 'description', 'start_date', 'end_date', 'status', 'owner', 'team', 'created_at', 'updated_at'  ]


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer( read_only = True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.all(), write_only = True, source = 'assigned_to'
    )
    project = serializers.PrimaryKeyRelatedField( queryset = Project.objects.all())

    class Meta:
        model = Task
        fields = [ 'id', 'title', 'description', 'status', 'priority', 'due_date', 'assigned_to', 'assigned_to_id', 'project', 'created_at', 'updated_at']


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer( read_only = True)
    task = serializers.PrimaryKeyRelatedField( queryset = Task.objects.all())

    class Meta:
        model = Comment
        fields = [ 'id', 'content', 'task', 'author', 'created_at']
