from rest_framework import serializers
from .models import User, Company, Tank, Sensor, Sensor_reading, Alert

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_staff']
        read_only_fields = ['is_staff']
    
class companySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Company
        fields = '__all__'


class CompanyNameField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    
class tankSerializer(serializers.ModelSerializer):
    
    company = CompanyNameField(read_only=True)
    class Meta:
        model = Tank
        fields = '__all__'
        

class sensorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sensor
        fields = '__all__'

class sensor_readingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sensor_reading
        fields = '__all__'

class alertSerializer(serializers.ModelSerializer):

    class Meta:
        model = Alert
        fields = '__all__'
        