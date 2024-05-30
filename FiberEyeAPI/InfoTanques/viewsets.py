from rest_framework import viewsets
from .serializers import UserSerializer, companySerializer, tankSerializer, sensorSerializer, sensor_readingSerializer, alertSerializer
from .models import User, Company, Tank, Sensor, Sensor_reading, Alert
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .permissions import IsAdmin, IsUser

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny, ]

    @action(detail=False, methods=['post'])
    def register(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        User.objects.create_user(username=username, password=password, email=email)
        return Response({'message': 'User created successfully'})

class companyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = companySerializer

    def get_permissions(self):
        if self.action in ['add_company', 'delete_company']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsUser]
        return [permission() for permission in permission_classes]

    # Custom action to add a company
    @action(detail=False, methods=['post'])
    def add_company(self, request):
        name = request.data.get('name')
        address = request.data.get('address')
        phone = request.data.get('phone')
        email = request.data.get('email')
        Company.objects.create(name=name, address=address, phone=phone, email=email)
        return Response({'message': 'Company added successfully'})
    
    # Custom action to get companies
    @action(detail=False, methods=['get'])
    def get_companies(self, request):
        companies = Company.objects.all()
        serializer = companySerializer(companies, many=True)
        return Response(serializer.data)
    
    # Custom action to delete a company, and all its tanks
    @action(detail=False, methods=['delete'])
    def delete_company(self, request):
        company_id = request.query_params.get('company_id')
        if not Company.objects.filter(id=company_id).exists():
            return Response({'message': 'Company does not exist'})
        
        Company.objects.filter(id=company_id).delete()
        return Response({'message': 'Company deleted successfully'})
    
class tankViewSet(viewsets.ModelViewSet):
    queryset = Tank.objects.all()
    serializer_class = tankSerializer

    def get_permissions(self):
        if self.action in ['add_tank', 'delete_tank_by_company']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsUser]
        return [permission() for permission in permission_classes]

    # Custom action to add a tank
    @action(detail=False, methods=['post'])
    def add_tank(self, request):
        company_id = request.data.get('company_id')
        try:
            company = Company.objects.get(id=company_id)
        except Company.DoesNotExist:
            return Response({'message': 'Company does not exist'}, status=400)
        
        name = request.data.get('name')
        capacity = request.data.get('capacity')
        material = request.data.get('material')
        location = request.data.get('location')
        install_date = request.data.get('install_date')
        Tank.objects.create(company=company, name=name, capacity=capacity, material=material, location=location, install_date=install_date)
        return Response({'message': 'Tank added successfully'})

    # Custom action to get tanks by company
    @action(detail=False, methods=['get'])
    def get_tanks_by_company(self, request):
        company_id = request.query_params.get('company_id')
        if not Company.objects.filter(id=company_id).exists():
            return Response({'message': 'Company does not exist'}, status=400)
        
        if not Tank.objects.filter(company__id=company_id).exists():
            return Response({'message': 'No tanks found for this company'}, status=400)

        tanks = Tank.objects.filter(company__id=company_id)
        serializer = tankSerializer(tanks, many=True)
        return Response(serializer.data)
    
    # Custom action to delete a tank from a company
    @action(detail=False, methods=['delete'])
    def delete_tank_by_company(self, request):
        company_id = request.query_params.get('company_id')
        if not Company.objects.filter(id=company_id).exists():
            return Response({'message': 'Company does not exist'})
        
        tank_id = request.query_params.get('tank_id')
        if not Tank.objects.filter(id=tank_id).exists():
            return Response({'message': 'Tank does not exist'})
        
        Tank.objects.filter(id=tank_id).delete()
        return Response({'message': 'Tank deleted successfully'})


class sensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = sensorSerializer

class sensor_readingViewSet(viewsets.ModelViewSet):
    queryset = Sensor_reading.objects.all()
    serializer_class = sensor_readingSerializer

class alertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = alertSerializer
    