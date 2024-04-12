from django.http import Http404
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from .models import Bancos
from .serializers import BancoSerializer

class BancoViewSet(viewsets.ModelViewSet):
    queryset = Bancos.objects.all()
    serializer_class = BancoSerializer
    lookup_field = 'codigo'
    
    def get_object(self):
        try:
            return super().get_object()
        except Http404:
            raise NotFound("Banco não encontrado com o código fornecido.")
