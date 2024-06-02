from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Company, Tank, Sensor, Sensor_reading, Alert


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        #add custom claims
        token['is_staff'] = user.is_staff
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['is_staff'] = self.user.is_staff
        return data

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_staff']
        read_only_fields = ['is_staff']
    
class companySerializer(serializers.ModelSerializer):
    tank_count = serializers.IntegerField(source='get_tank_count', read_only=True)

    class Meta:
        model = Company
        fields = ['id','name', 'address', 'phone', 'email', 'tank_count', 'imagen']


class CompanyNameField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    
class tankSerializer(serializers.ModelSerializer):
    
    #company = CompanyNameField(read_only=True)
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
        