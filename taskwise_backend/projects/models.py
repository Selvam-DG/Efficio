from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Team(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    members = models.ManyToManyField(User, related_name='teams')
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.name
    
class Project(models.Model):
    STATUS_CHOICES = (
        ('planned', 'Planned'),
        ( 'active','Active'),
        ( 'completed' , 'Completed'),
        ( 'archived', 'Archived'),
    )

    name = models.CharField(max_length= 200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField( max_length=25, choices= STATUS_CHOICES, default= 'planned')
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name= 'owned_projects')
    team  = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name
    
class Task(models.Model):
    STATUS_CHOICES = (
        ( 'todo', 'To Do'),
        ( 'in_progress', 'In Progress'),
        ('done', 'Done')
    )

    PRIOROTY_CHOICES = (
        ('low', 'Low'),
        ( 'medium', 'Medium'),
        ('high' , 'High'),
        ( 'critical',  'Critical')
    )

    title = models.CharField(max_length = 200)
    description = models.TextField(blank=True)
    status = models.CharField( max_length=20, choices= STATUS_CHOICES, default='todo')
    priority = models.CharField( max_length=20, choices= PRIOROTY_CHOICES, default= 'medium')
    due_date = models.DateField(null=True, blank=True)
    assigned_to = models.ForeignKey( User, on_delete=models.SET_NULL, null=True, related_name='tasks')
    project = models.ForeignKey( Project, on_delete=models.CASCADE,  related_name='tasks')
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField( auto_now = True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    content = models.TextField()
    task = models.ForeignKey( Task, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='comments')
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f'Comment by {self.author} on  {self.task}'