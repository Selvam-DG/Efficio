
# from django.db import models
# from django.contrib.auth.models import User

# class Project(models.Model):
#     name  = models.CharField(max_length=100)
#     owner = models.ForeignKey(User, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.name
    
# class Task(models.Model):
#     project = models.ForeignKey(Project, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100)
#     description = models.TextField(blank=True)
#     is_complete = models.BooleanField(default=False)
#     due_date = models.DateField(null=True, blank=True)

#     def __str__(self):
#         return self.title
    
