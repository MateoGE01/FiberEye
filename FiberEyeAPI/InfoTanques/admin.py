from django.contrib import admin
from .models import User, Company, Tank, Sensor, Sensor_reading, Alert
# Register your models here.

admin.site.register(Company)
admin.site.register(Tank)
admin.site.register(Sensor)
admin.site.register(Sensor_reading)
admin.site.register(Alert)