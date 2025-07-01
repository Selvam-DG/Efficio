from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('developer', 'Developer'),
        ('tester','Tester'),
        ('stakeholder', 'Stakeholder'),

    )
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='developer')
    full_name= models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.username
