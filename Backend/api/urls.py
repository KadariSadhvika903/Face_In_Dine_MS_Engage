from django.urls import include, path
from rest_framework import routers

from .views import AuthViewSet, CustomerHandlerViewSet, RestaurantHandlerViewSet

router = routers.DefaultRouter()
router.register('auth', AuthViewSet, basename='auth')
# router.register(r'admin-customers', CustomerViewSet)
# router.register(r'admin-restaurants', RestaurantViewSet)
# router.register(r'admin-users', UserViewSet)
# router.register(r'admin-cuisine', CuisineViewSet)
# router.register(r'admin-dishes', DishViewSet)
router.register('customer', CustomerHandlerViewSet, basename='customer')
router.register('restaurant', RestaurantHandlerViewSet, basename='restaurant')