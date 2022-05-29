from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnList, ReturnDict

from .models import *


class EmptySerializer(serializers.Serializer):
    pass

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'name', 'type']
        read_only_fields = ['type']
    
class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = ['user', 'phoneNo', 'upiId', 'picLink']
    
    def create(self, validated_data):
        arg_data = validated_data
        arg_data['username'] = validated_data['user']['username']
        arg_data['name'] = validated_data['user']['name']
        del arg_data['user']
        return Customer.objects.create(**arg_data)

class RestaurantSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Restaurant
        fields = ['user', 'phoneNo', 'restaurantName', 'upiId', 'description', 'picLink']
    
    def create(self, validated_data):
        arg_data = validated_data
        arg_data['username'] = validated_data['user']['username']
        arg_data['name'] = validated_data['user']['name']
        del arg_data['user']
        return Restaurant.objects.create(**arg_data)

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuisineType
        fields = ['cuisineId', 'name']

class DishSerializer(serializers.ModelSerializer):
    restaurant = serializers.CharField(max_length=250)
    cuisine = serializers.CharField(max_length=250)

    class Meta:
        model = Dish
        fields = ['dishId', 'name', 'price', 'cuisine', 'restaurant']
    
    def create(self, validated_data):
        try:
            validated_data['restaurant'] = Restaurant.objects.get(user__username=validated_data['restaurant'])
            if CuisineType.objects.filter(name=validated_data['cuisine']).exists():
                validated_data['cuisine'] = CuisineType.objects.get(name=validated_data['cuisine'])
            else:
                validated_data['cuisine'] = CuisineType.objects.create(name=validated_data['cuisine'])
            return Dish.objects.create(**validated_data)
        except Exception as e:
            raise e

class OrderInputSerializer(serializers.ModelSerializer):
    customer = serializers.CharField(max_length=250)
    dishes = serializers.ListField(child=serializers.IntegerField())
    restaurant = serializers.CharField(max_length=250)

    class Meta:
        model = Order
        fields = ['restaurant', 'customer', 'dishes']
        depth = 1
    
    def create(self, validated_data):
        try:
            validated_data['customer'] = Customer.objects.get(user__username=validated_data['customer'])
            validated_data['restaurant'] = Restaurant.objects.get(user__username=validated_data['restaurant'])
            
            dishes_set = validated_data.pop('dishes', None)
            order = Order.objects.create(**validated_data)
            validated_data['dishes'] = dishes_set
            quantity_wise = {}
            dish_wise = {}
            for id in dishes_set:
                dish = Dish.objects.get(dishId=id)
                assert(dish.restaurant == validated_data['restaurant'])
                dish_wise[id] = dish
                if id in quantity_wise:
                    quantity_wise[id] += 1
                else:
                    quantity_wise[id] = 1
                
            for dishId, quantity in quantity_wise.items():
                order.dishes.add(CartItem.objects.create(dish=dish_wise[dishId], quantity=quantity))
            order.save()
            return order
        except Exception as e:
            raise e

class CartItemSerializer(serializers.ModelSerializer):
    dish = DishSerializer()

    class Meta:
        model = CartItem
        fields=['dish', 'quantity']
        depth = 1

class OrderOutputSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    dishes = CartItemSerializer(many=True)
    restaurant = RestaurantSerializer()

    class Meta:
        model = Order
        fields = ['orderId', 'restaurant', 'customer', 'dishes', 'orderStatus', 'paymentStatus']
        depth = 1


def modifyOrderDishes(serializer):
    orderData = serializer.data
    if (type(orderData) == ReturnList):
        for datadict in orderData:
            dishes = datadict['dishes']
            fDishes = []
            for item in dishes:
                for _ in range(item['quantity']):
                    fDishes.append(item['dish'])
            datadict['dishes'] = fDishes
        return orderData
    elif (type(orderData) == ReturnDict):
        dishes = orderData['dishes']
        fDishes = []
        for item in dishes:
            for _ in range(item['quantity']):
                fDishes.append(item['dish'])
        orderData['dishes'] = fDishes
        return orderData