from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
def under_maintenance(request):
	return render(request,'project_index.html')