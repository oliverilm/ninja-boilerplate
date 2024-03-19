from django.contrib import admin
from application.models import AppUser
# Register your models here.

class AppUserModelAdmin(admin.ModelAdmin):
    list_display = ["email", "first_name", "last_name", "is_staff", "is_superuser"]

admin.site.register(AppUser, AppUserModelAdmin)