from django.shortcuts import render, redirect, get_object_or_404
from django.apps import apps
from django.http import HttpResponse


def home(request):
    return render(request, 'taskwise/index.html')
