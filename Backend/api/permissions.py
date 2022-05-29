from rest_framework import permissions
from api.models import UserType

class IsCustomerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.type == UserType.CUSTOMER

class IsRestaurantPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.type == UserType.RESTAURANT