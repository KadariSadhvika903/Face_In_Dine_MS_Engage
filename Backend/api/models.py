from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
import api.managers

class UserType(models.TextChoices):
    CUSTOMER = "Customer", "CUSTOMER"
    RESTAURANT = "Restaurant", "RESTAURANT"

class PaymentStatus(models.TextChoices):
    PENDING = "Pending", "PENDING"
    COMPLETE = "Complete", "COMPLETE"

class OrderStatus(models.TextChoices):
    PENDING = "Pending", "PENDING"
    COMPLETE = "Complete", "COMPLETE"

class CustomUser(AbstractUser):
    username = models.CharField(_('User Name'), max_length=2550, primary_key=True)
    name = models.CharField(_('Name'), max_length=200)
    type = models.CharField(_('Type'), max_length=50, choices=UserType.choices, default=UserType.CUSTOMER)
    password = None

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name', 'type']

    objects = api.managers.CustomUserManager()

    def __str__(self):
        return self.name


class Customer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    phoneNo = models.CharField(_('Phone Number'), max_length=13)
    upiId = models.CharField(_('UPI ID'), max_length=100)
    picLink = models.CharField(_('Profile Picture Link'), max_length=250)

    objects = api.managers.CustomerManager()

    def __str__(self):
        return self.user.name
    

class Restaurant(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    phoneNo = models.CharField(_('Phone Number'), max_length=13)
    restaurantName = models.CharField(_('Restaurant Name'), max_length=250)
    upiId = models.CharField(_('UPI ID'), max_length=100)
    picLink = models.CharField(_('Restaurant Picture'), max_length=250)

    description = models.TextField()

    objects = api.managers.RestaurantManager()

    def __str__(self):
        return self.user.name

class CuisineType(models.Model):
    cuisineId = models.AutoField(_('Cuisine ID'), primary_key = True)
    name = models.CharField(_('Cuisine Name'), max_length=200)

    def __str__(self):
        return self.name

class Dish(models.Model):
    dishId = models.AutoField(_('Dish ID'), primary_key=True)
    name = models.CharField(_('Dish Name'), max_length=250)
    price = models.IntegerField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    cuisine = models.ForeignKey(CuisineType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class CartItem(models.Model):
    id = models.AutoField(_('ID'), primary_key=True)
    # dishId = models.IntegerField()
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.IntegerField()

class Order(models.Model):
    orderId = models.AutoField(_('Order ID'), primary_key=True)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    dishes = models.ManyToManyField(CartItem, related_name='dishes')
    orderStatus = models.CharField(_('Order Status'), max_length=50, choices=OrderStatus.choices, default=OrderStatus.PENDING)
    paymentStatus = models.CharField(_('Payment Status'), max_length=50, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)

    def __str__(self):
        return str(self.orderId)


