
'''
from rest_framework import viewsets , status
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import render


def postman_ui(request):
    return render(request, 'api/login.html')


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['get', 'post'], url_path='tasks')
    def project_tasks(self, request, pk=None):
        project = self.get_object()

        if request.method == 'GET':
            tasks = Task.objects.filter(project=project)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            serializer = TaskSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(project=project)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

'''