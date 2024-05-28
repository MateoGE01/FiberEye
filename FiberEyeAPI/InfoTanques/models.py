from django.db import models
from django.contrib.auth.models import User

class Company(models.Model):
    #company_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    

    def __str__(self):
        return self.name

class Tank(models.Model):
    #tank_id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    capacity = models.FloatField()
    material = models.CharField(max_length=50)
    location = models.CharField(max_length=255)
    install_date = models.DateField()
    imagen = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name
    
class Sensor(models.Model): 
    #sensor_id = models.AutoField(primary_key=True)
    tank = models.ForeignKey(Tank, on_delete=models.CASCADE)
    model = models.CharField(max_length=50)#es el nombre del sensor
    type = models.CharField(max_length=50)
    install_date = models.DateField()

    def __str__(self):
        return self.name
    
class Sensor_reading(models.Model):
    #reading_id = models.AutoField(primary_key=True)
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    value = models.FloatField()

    def __str__(self):
        return self.name
    
class Alert(models.Model):
    #alert_id = models.AutoField(primary_key=True)
    tank = models.ForeignKey(Tank, on_delete=models.CASCADE)
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=50)
    message = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f'Alert {self.alert_type} on {self.tank} at {self.timestamp}'