from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, ProjectViewSet, TaskViewSet, CommentViewSet

router = DefaultRouter()
router.register('teams',  TeamViewSet)
router.register('projects', ProjectViewSet)
router.register('tasks', TaskViewSet)
router.register('comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
