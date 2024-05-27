from rest_framework import viewsets
from .serializers import UserSerializer, companySerializer, tankSerializer, sensorSerializer, sensor_readingSerializer, alertSerializer
from .models import User, company, tank, sensor, sensor_reading, alert


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class companyViewSet(viewsets.ModelViewSet):
    queryset = company.objects.all()
    serializer_class = companySerializer

class tankViewSet(viewsets.ModelViewSet):
    queryset = tank.objects.all()
    serializer_class = tankSerializer

class sensorViewSet(viewsets.ModelViewSet):
    queryset = sensor.objects.all()
    serializer_class = sensorSerializer

class sensor_readingViewSet(viewsets.ModelViewSet):
    queryset = sensor_reading.objects.all()
    serializer_class = sensor_readingSerializer

class alertViewSet(viewsets.ModelViewSet):
    queryset = alert.objects.all()
    serializer_class = alertSerializer
    