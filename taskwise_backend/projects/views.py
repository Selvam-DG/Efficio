from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Team, Project, Task, Comment
from .serializers import TeamSerializer, ProjectSerializer, TaskSerializer, CommentSerializer
from users.models import User

class IsManagerOrAdmin( permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['admin', 'manager']
    
class IsOwnerorReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return getattr(obj, 'owner', None) == request.user
    

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated, IsManagerOrAdmin]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [ permissions.IsAuthenticated, IsOwnerorReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [ permissions.IsAuthenticated]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [ permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
        