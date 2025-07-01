from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'full_name', 'role']

    def create(self, validate_data):
        user = User.objects.create_user(
            username= validate_data['username'],
            email = validate_data['email'],
            password = validate_data['password'],
            full_name = validate_data.get('full_name', ''),
            role = validate_data.get('role', 'developer'),

        )

        return user