from rest_framework import serializers
from .models import User, company, tank, sensor, sensor_reading, alert

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
class companySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = company
        fields = '__all__'

class tankSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = tank
        fields = '__all__'

class sensorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = sensor
        fields = '__all__'

class sensor_readingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = sensor_reading
        fields = '__all__'

class alertSerializer(serializers.ModelSerializer):

    class Meta:
        model = alert
        fields = '__all__'
        