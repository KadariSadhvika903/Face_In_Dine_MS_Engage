import json
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.contrib.auth import authenticate, logout, get_user_model

from api.authentication import FirebaseAuthentication
from rest_framework.permissions import IsAuthenticated

from api.permissions import IsCustomerPermission, IsRestaurantPermission
from api.utils import getFirebaseUID

from .serializers import *
from .models import *

import pyrebase
from django.conf import settings


with open(settings.FIREBASE_CONFIG) as json_file:
    config = json.load(json_file)

firebase = pyrebase.initialize_app(config)
database = firebase.database()
storage = firebase.storage()

# Create your views here.

CustomUser = get_user_model()

class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class RestaurantViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class CuisineViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    queryset = CuisineType.objects.all()
    serializer_class = CuisineSerializer

class DishViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    queryset = Dish.objects.all()
    serializer_class = DishSerializer


class AuthViewSet(viewsets.GenericViewSet):
    authentication_classes = []
    permission_classes = [AllowAny, ]
    serializer_class = EmptySerializer

    @action(methods=['POST', ], detail=False, authentication_classes=[FirebaseAuthentication])
    def login(self, request): 
        try:
            authenticate(request)
            if request.user:
                userType = request.user.type
                if (userType == UserType.CUSTOMER):
                    data = CustomerSerializer(request.user.customer).data
                    return Response(data=data, status=status.HTTP_200_OK)
                elif (userType == UserType.RESTAURANT):
                    data = RestaurantSerializer(request.user.restaurant).data
                    return Response(data=data, status=status.HTTP_200_OK)
                else:
                    data = {'message': 'Server Error', 'detail': 'User type not admissible'}
                    return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
            else:
                data = {'message': 'No such user exists'}
                return Response(data=data, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            data = {'message': 'Server Error'}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

    
    @action(methods=['POST', ], detail=False)
    def register(self, request):
        userType = request.data['type']

        if not userType:
            data = {'message': 'Server Error', 'details': 'No User type present in the header'}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        if (userType == UserType.CUSTOMER):
            serializer = CustomerSerializer(data=request.data)

        elif (userType == UserType.RESTAURANT):
            serializer = RestaurantSerializer(data=request.data)

        else:
            data = {'message': 'Server Error', 'details': 'User type not admissible'}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            serializer.is_valid(raise_exception=True)

            uid = getFirebaseUID(request.data['user']['username'])
            database.child('checkin').child(uid).set("")

            serializer.create(serializer.validated_data)
            return Response(data=request.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            data = {'message': 'Invalid Data', 'details': 'Sent details are invalid'}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=['POST', ], detail=False)
    def logout(self, request):
        logout(request)
        data = {'success': 'Sucessfully logged out'}
        return Response(data=data, status=status.HTTP_200_OK)

class CustomerHandlerViewSet(viewsets.GenericViewSet):
    authentication_classes = [FirebaseAuthentication]
    permission_classes = [IsAuthenticated, IsCustomerPermission]

    @action(methods=['GET', ], detail=False)
    def dashboard(self, request):
        if request.user:
            try:
                orders = Order.objects.filter(customer__user=request.user)
                customer = CustomerSerializer(request.user.customer)
                orderSerializer = OrderOutputSerializer(orders, many=True)
                data = {'customer': customer.data, 'orders': modifyOrderDishes(orderSerializer)}
                return Response(data=data, status=status.HTTP_200_OK)
            except:
                data = {'message': 'Server Error'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(methods=['GET', ], detail=False)
    def getrestaurants(self, request):
        if request.user:
            restaurants = Restaurant.objects.all()
            serializer = RestaurantSerializer(restaurants, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(methods=['POST', ], detail=False)
    def getrestaurantlandingpage(self, request): 
        if request.user:
            try:
                if request.data['restaurantId']:
                    restaurant = Restaurant.objects.get(user__username=request.data['restaurantId'])
                    restaurantSerializer = RestaurantSerializer(restaurant)
                    menu = Dish.objects.filter(restaurant__user=restaurant.user)
                    menuSerializer = DishSerializer(menu, many=True)
                    data = {'restaurant': restaurantSerializer.data, 'menu': menuSerializer.data}
                    return Response(data=data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                data = {'message': 'Data invalid'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
            return Response(data=Restaurant.objects.all(), status=status.HTTP_200_OK)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

    @action(methods=['POST', ], detail=False)
    def placeorder(self, request):
        if request.user:
            try:
                serializer = OrderInputSerializer(data={**request.data, 'customer': request.user.username})
                serializer.is_valid(raise_exception=True)
                serializer.create(serializer.validated_data)
                print(serializer)
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                data = {'message': 'Data invalid'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

    @action(methods=['POST', ], detail=False)
    def settlepayment(self, request): 
        if request.user:
            try:
                orderId = request.data['orderId']
                order = Order.objects.get(pk=orderId)
                assert(order.customer.user == request.user)
                #TODO: Integrate razorpay
                order.paymentStatus = PaymentStatus.COMPLETE
                order.save(update_fields=['paymentStatus'])
                serializer = OrderOutputSerializer(order)
                return Response(data=modifyOrderDishes(serializer), status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                data = {'message': 'Server Error'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)


class RestaurantHandlerViewSet(viewsets.GenericViewSet):
    authentication_classes = [FirebaseAuthentication]
    permission_classes = [IsAuthenticated, IsRestaurantPermission]

    @action(methods=['GET', ], detail=False)
    def dashboard(self, request):
        if request.user:
            try:
                restaurant = RestaurantSerializer(request.user.restaurant)
                return Response(data=restaurant.data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                data = {'message': 'Invalid Data'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(methods=['POST', ], detail=False)
    def addish(self, request):
        if request.user:
            try:
                serializer = DishSerializer(data={**request.data, 'restaurant': request.user.username})
                serializer.is_valid(raise_exception=True)
                serializer.create(serializer.validated_data)
                return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                data = {'message': 'Invalid Data'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(methods=['GET', ], detail=False)
    def getmenu(self, request):
        if request.user:
            menu = Dish.objects.filter(restaurant__user=request.user)
            serializer = DishSerializer(menu, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

    @action(methods=['POST', ], detail=False)
    def getcustomerinfo(self, request):
        if request.user:
            try:
                username_list_str = request.data['usernames']
                username_list = username_list_str.split(',')
                customers = Customer.objects.filter(user__username__in=username_list)
                serializer = CustomerSerializer(customers, many=True)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                data = {'message': 'Invalid Data'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(methods=['POST', ], detail=False)
    def verification(self, request):
        if request.user:
            try:
                last_users = database.child('checkin').child(request.user.username).get().val().split(",")
                new_users = list(json.loads(request.data))
                print(new_users)
                print(last_users)

                bool_map = {}
                for user in new_users:
                    database.child('checkin').child(user['username']).set(request.user.username)
                    database.child('emotion').child(user['username']).set(user['emotion'])
                    bool_map[user['username']] = 1
                
                print('Reached here')

                for user in last_users:
                    if user != ''  and (user not in bool_map or not bool_map[user]):
                        database.child('checkin').child(user).set("")
                        database.child('emotion').child(user).set("")
                
                print('Reached here')

                database.child('checkin').child(request.user.username).set(",".join([user['username'] for user in new_users]) if len(new_users) > 0 else "")

                data = {'message': 'Users Verified'}
                return Response(data=data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                data = {'message': 'Invalid Data'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(methods=['GET', ], detail=False)
    def getuserlist(self, request):
        if request.user:
            try:
                users = Customer.objects.all()
                serializer = CustomerSerializer(users, many=True)
                user_data = []
                for data in serializer.data:
                    user_data.append({
                        'username': data['user']['username'],
                        'url': data['picLink'],
                    })
                return Response(data=user_data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                data = {'message': 'Invalid Data'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

    @action(methods=['GET', ], detail=False)
    def getorders(self, request):
        if request.user:
            try:
                restaurantOrders = Order.objects.filter(restaurant__user=request.user)
                serializer = OrderOutputSerializer(restaurantOrders, many=True)
                return Response(data=modifyOrderDishes(serializer), status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                data = {'message': 'Invalid Data'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(methods=['POST', ], detail=False)
    def updateorder(self, request): 
        if request.user:
            try:
                orderId = request.data['orderId']
                order = Order.objects.get(pk=orderId)
                assert(order.restaurant.user == request.user)
                order.orderStatus = OrderStatus.COMPLETE
                order.save(update_fields=['orderStatus'])
                serializer = OrderOutputSerializer(order)
                return Response(data=modifyOrderDishes(serializer), status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                data = {'message': 'Invalid Data'}
                return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        else:
            data = {'message': 'Not Authorized'}
            return Response(data=data, status=status.HTTP_401_UNAUTHORIZED)

