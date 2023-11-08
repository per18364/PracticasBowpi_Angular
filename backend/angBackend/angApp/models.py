from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# class CustomUserManager(BaseUserManager):
#     def create(self, email, name, lastname, password=None, **extra):
#         if not email:
#             raise ValueError('Los usuarios deben tener un email')
#         user = self.model(
#             email=self.normalize_email(email),
#             name=name,
#             lastname=lastname,
#             **extra
#         )
#         user.set_password(password)
#         user.save()
#         return user


# class User(AbstractBaseUser, models.Model):
#     # name = models.CharField(max_length=50, unique=True)
#     # lastname = models.CharField(max_length=50, unique=True)
#     # email = models.EmailField(max_length=50, unique=True)
#     # password = models.CharField(max_length=255)

#     # def __str__(self):
#     #     return self.name
#     # id = models.AutoField(primary_key=True)
#     # id = models.CharField(primary_key=True, default=str,
#     #                       editable=False, max_length=24)
#     name = models.CharField(max_length=50)
#     lastname = models.CharField(max_length=50)
#     email = models.EmailField(max_length=50, unique=True)

#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name', 'lastname']

#     def __str__(self):
#         return self.name

class User(models.Model):
    # id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Create your models here.
