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

    # Custom action to get a tank
    @action(detail=False, methods=['get'])
    def get_tank(self, request):
        tank_id = request.query_params.get('tank_id')
        if not Tank.objects.filter(id=tank_id).exists():
            return Response({'message': 'Tank does not exist'}, status=400)
        
        tank = Tank.objects.get(id=tank_id)
        serializer = tankSerializer(tank)
        return Response(serializer.data)

class sensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = sensorSerializer
    
    # Custom action to add a sensor
    def get_permissions(self):
        if self.action in ['add_sensor']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsUser]
        return [permission() for permission in permission_classes]

    # Custom action to add a sensor
    @action(detail=False, methods=['post'])
    def add_sensor(self, request):
        tank_id = request.data.get('tank_id')
        try:
            tank = Tank.objects.get(id=tank_id)
        except Tank.DoesNotExist:
            return Response({'message': 'Tank does not exist'}, status=400)
        
        sensor_data = {
            'tank': tank,
            'model': request.data.get('model'),
            'type': request.data.get('type'),
            'install_date': request.data.get('install_date')
        }
        Sensor.objects.create(**sensor_data)
        return Response({'message': 'Sensor added successfully'})
    
    # Custom action to get sensors by tank
    @action(detail=False, methods=['get'])
    def get_sensors_by_tank(self, request):
        tank_id = request.query_params.get('tank_id')
        if not Tank.objects.filter(id=tank_id).exists():
            return Response({'message': 'Tank does not exist'}, status=400)
        
        sensors = Sensor.objects.filter(tank__id=tank_id)
        serializer = sensorSerializer(sensors, many=True)
        return Response(serializer.data)
    

class sensor_readingViewSet(viewsets.ModelViewSet):
    queryset = Sensor_reading.objects.all()
    serializer_class = sensor_readingSerializer

    # Custom action to add a reading
    def get_permissions(self):
        if self.action in ['add_reading']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsUser]
        return [permission() for permission in permission_classes]
    
    # Custom action to add a reading
    @action(detail=False, methods=['post'])
    def add_reading(self, request):
        sensor_id = request.data.get('sensor_id')
        try:
            sensor = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            return Response({'message': 'Sensor does not exist'}, status=400)
        
        reading_data = {
            'sensor': sensor,
            'date': request.data.get('date'),
            'time': request.data.get('time'),
            'value': request.data.get('value')
        }

        Sensor_reading.objects.create(**reading_data)
        return Response({'message': 'Reading added successfully'})
    
    # Custom action to get readings by sensor
    @action(detail=False, methods=['get'])
    def get_readings_by_sensor(self, request):
        sensor_id = request.query_params.get('sensor_id')
        if not Sensor.objects.filter(id=sensor_id).exists():
            return Response({'message':'Sensor does not exist'}, status=400)
        
        readings = Sensor_reading.objects.filter(sensor__id=sensor_id)
        serializer = sensor_readingSerializer(readings, many=True)
        return Response(serializer.data)


class alertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = alertSerializer
    
    # Custom action to add an alert
    def get_permissions(self):
        if self.action in ['add_alert']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [IsUser]
        return [permission() for permission in permission_classes]

    # Custom action to add an alert
    @action(detail=False, methods=['post'])
    def add_alert(self, request):
        tank_id = request.data.get('tank_id')
        sensor_id = request.data.get('sensor_id')
        try:
            tank = Tank.objects.get(id=tank_id)
            sensor = Sensor.objects.get(id=sensor_id)
        except (Tank.DoesNotExist, Sensor.DoesNotExist):
            return Response({'message': 'Tank or sensor does not exist'}, status=400)
        
        alert_data = {
            'tank': tank,
            'sensor': sensor,
            'alert_type': request.data.get('alert_type'),
            'message': request.data.get('message')
        }

        Alert.objects.create(**alert_data)
        return Response({'message': 'Alert added successfully'})
    
    # Custom action to get alerts by tank
    @action(detail=False, methods=['get'])
    def get_alerts_by_tank(self, request):
        tank_id = request.query_params.get('tank_id')
        if not Tank.objects.filter(id=tank_id).exists():
            return Response({'message': 'Tank does not exist'}, status=400)
        
        alerts = Alert.objects.filter(tank__id=tank_id)
        serializer = alertSerializer(alerts, many=True)
        return Response(serializer.data)