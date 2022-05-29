from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db import models

# from .models import CustomUser, UserType
import api.models
from api.utils import getFirebaseUID

class CustomUserManager(BaseUserManager):
    def create_user(self, username, **extra_fields):
        if not username:
            raise ValueError(_('The Username must be set'))
        user = self.model(username=username, **extra_fields)
        user.save()
        return user
    
    def create_superuser(self, username, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(username, **extra_fields)

class CustomerManager(models.Manager):
    def create(self, **kwargs):
        if 'username' in kwargs and 'name' in kwargs:
            user = api.models.CustomUser.objects.create_user(username=getFirebaseUID(kwargs['username']), name=kwargs['name'], type=api.models.UserType.CUSTOMER)
            kwargs['user'] = user
            del kwargs['username']
            del kwargs['name']
        else:
            raise ValueError(_('Name and Username Needed'))
        return super(CustomerManager, self).create(**kwargs)

class RestaurantManager(models.Manager):
    def create(self, **kwargs):
        if 'username' in kwargs and 'name' in kwargs:
            user = api.models.CustomUser.objects.create_user(username=getFirebaseUID(kwargs['username']), name=kwargs['name'], type=api.models.UserType.RESTAURANT)
            kwargs['user'] = user
            del kwargs['username']
            del kwargs['name']
        else:
            raise ValueError(_('Name and Username Needed'))
        return super(RestaurantManager, self).create(**kwargs)
        