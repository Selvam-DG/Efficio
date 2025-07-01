# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from rest_framework.authtoken import views as drf_views
# from .views import ProjectViewSet, TaskViewSet
# from . import views



# router = DefaultRouter()
# router.register(r'projects', ProjectViewSet, basename='project')
# router.register(r'tasks', TaskViewSet, basename='task')
# urlpatterns = [
#     path('', include(router.urls)),
#     path('dev_postman/', views.postman_ui, name='postman-dev' ),
#     path('auth/', include('rest_framework.urls')),
#     path('get_token/', drf_views.obtain_auth_token, name='token'),
    
# ]
