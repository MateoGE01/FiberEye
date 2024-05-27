from rest_framework import routers
from .viewsets import UserViewSet, companyViewSet, tankViewSet, sensorViewSet, sensor_readingViewSet, alertViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('companies', companyViewSet)
router.register('tanks', tankViewSet)
router.register('sensors', sensorViewSet)
router.register('sensor_readings', sensor_readingViewSet)
router.register('alerts', alertViewSet)