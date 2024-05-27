from django.db import models
from django.contrib.auth.models import User

class company(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    

    def __str__(self):
        return self.name

class tank(models.Model):
    company = models.ForeignKey(company, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    capacity = models.FloatField()
    material = models.CharField(max_length=50)
    location = models.CharField(max_length=255)
    install_date = models.DateField()

    def __str__(self):
        return self.name
    
class sensor(models.Model): 
    tank = models.ForeignKey(tank, on_delete=models.CASCADE)
    model = models.CharField(max_length=50)#es el nombre del sensor
    type = models.CharField(max_length=50)
    install_date = models.DateField()

    def __str__(self):
        return self.name
    
class sensor_reading(models.Model):
    sensor = models.ForeignKey(sensor, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    value = models.FloatField()

    def __str__(self):
        return self.name
    
class alert(models.Model):
    tank = models.ForeignKey(tank, on_delete=models.CASCADE)
    sensor = models.ForeignKey(sensor, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=50)
    message = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

    def __str__(self):
        return f'Alert {self.alert_type} on {self.tank} at {self.timestamp}'