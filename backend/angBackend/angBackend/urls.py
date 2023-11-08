"""angBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from angApp.views import UserViewSet, LoginViewSet, proxy_view, images_view
# from api import viewsets


router = DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'login', LoginViewSet, basename='login')
# router.register(r'image', viewsets.ImagenViewset)
# router.register(r'categoria_restaurante',
#                 viewsets.Restaurante_categoriaViewset)
# router.register(r'menu', viewsets.MenuViewset)
# router.register(r'platillos_imagenes', viewsets.Platillos_imagenesViewset)
# router.register(r'platillos', viewsets.PlatillosViewset)
# router.register(r'restaurante_categoria',
#                 viewsets.Restaurante_categoriaViewset)
# router.register(r'restaurante_imagenes', viewsets.Restaurante_imagenesViewset)
# router.register(r'restaurante', viewsets.RestauranteViewset)
# router.register(r'restaurantes_favoritos',
#                 viewsets.Restaurante_favoritosViewset)

urlpatterns = [
    path('api/', include(router.urls)),
    re_path(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
    path('proxy-endpoint/', proxy_view, name='proxy_view'),
    path('images-endpoint/', images_view, name='images_view')
]
