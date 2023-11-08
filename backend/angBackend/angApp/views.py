import traceback
from rest_framework import serializers, viewsets, status
from .models import User
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password, make_password
from django.http import HttpResponseServerError, JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from bson.objectid import ObjectId
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
import requests
from django.views.decorators.csrf import csrf_exempt


def proxy_view(request):
    # URL del AWS API Gateway o el endpoint que desees
    url = "https://rulthq4jyg.execute-api.us-east-1.amazonaws.com/DEV/dpi/monitoring/display"

    # Envía la solicitud al AWS API Gateway
    params = request.GET.dict()
    response = requests.get(url, params=params)

    # Devuelve la respuesta del AWS API Gateway al frontend
    return HttpResponse(content=response.content, status=response.status_code, content_type=response.headers['content-type'])


@csrf_exempt
def images_view(request):
    # if request.method == 'POST':
    #     front_image = request.FILES['front']
    #     back_image = request.FILES['back']
    #     metadata = request.POST['request']

    #     # Aquí debes enviar los archivos y metadatos al servicio AWS
    #     response = requests.post(
    #         "https://rulthq4jyg.execute-api.us-east-1.amazonaws.com/qa/dpi/inference",
    #         files={'front': front_image, 'back': back_image},
    #         data={'request': metadata}
    #     )

    #     # Devuelve la respuesta del servicio AWS al frontend
    #     return JsonResponse(response.json(), safe=False, status=response.status_code)
    if request.method == 'POST':
        try:
            front_image = request.FILES['front']
            back_image = request.FILES['back']
            metadata = request.POST['request']

            response = requests.post(
                "https://rulthq4jyg.execute-api.us-east-1.amazonaws.com/qa/dpi/inference",
                files={'front': front_image, 'back': back_image},
                data={'request': metadata}
            )

            response.raise_for_status()  # Esto lanzará una excepción si la respuesta es un error
            return JsonResponse(response.json(), safe=False, status=response.status_code)
        except requests.exceptions.RequestException as e:
            # Esto capturará errores de la solicitud, como problemas de conexión o tiempos de espera
            traceback.print_exc()
            return HttpResponseServerError({'error': str(e)})
        except Exception as e:
            # Esto capturará cualquier otro error
            traceback.print_exc()
            return HttpResponseServerError({'error': 'An unexpected error occurred'})


class UserSerializer(serializers.ModelSerializer):
    # id = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['name', 'lastname', 'password', 'email']


# class UserReadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = (
#             'id',
#             # 'username',
#             'name',
#             'lastname',
#             'email',
#         )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        password = request.data.get('password')
        hashed_password = make_password(password)
        request.data['password'] = hashed_password
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # token, created = Token.objects.get_or_create(user=usuario)
        # serializer = UserReadSerializer(usuario)
        headers = self.get_success_headers(serializer.data)
        return Response({"user": "Ok"}, status=status.HTTP_201_CREATED, headers=headers)

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def create(self, request, *args, **kwargs):
#         data = request.data
#         serializer = self.get_serializer(data=data)
#         serializer.is_valid(raise_exception=True)
#         usuario = User.objects.create(
#             # username=data.get('username'),
#             name=data.get('name'),
#             lastname=data.get('lastname'),
#             email=data.get('email'),
#         )
#         usuario.set_password(data.get('password'))
#         usuario.save()
#         # token, created = Token.objects.get_or_create(user=usuario)
#         # serializer = UserReadSerializer(usuario)
#         headers = self.get_success_headers(serializer.data)
#         return Response({"user": "Ok"}, status=status.HTTP_201_CREATED, headers=headers)

#     def retrieve(self, request, *args, **kwargs):
#         try:
#             # Convertir la cadena 'pk' a ObjectId
#             instance = self.get_object(pk=ObjectId(kwargs['pk']))
#             serializer = self.get_serializer(instance)
#             return Response(serializer.data)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))

#     @action(methods=["post"], detail=False)
#     def token(self, request, *args, **kwargs):
#         url = 'http://127.0.0.1:8000/api/user/token'
#         # data = request.data
#         if url.status_code == 200:
#             url = url.json()
#             try:
#                 user = User.objects.get(
#                     username=url["username"], active=True)
#                 if user.check_password(url["password"]):
#                     token, created = Token.objects.get_or_create(user=user)
#                     serializer = UserReadSerializer(user)
#                     return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
#                 return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
#             except User.DoesNotExist:
#                 return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
#             except KeyError as e:
#                 return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


class LoginViewSet(viewsets.ViewSet):

    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        if check_password(password, user.password):
            # token, created = Token.objects.get_or_create(user=user)
            # if not created:
            #     token.delete()
            #     token = Token.objects.create(user=user)
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

# Create your views here.
