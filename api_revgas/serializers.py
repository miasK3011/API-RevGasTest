from rest_framework import serializers
from .models import Bancos

class BancoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bancos
        fields = ['codigo', 'instituicao']