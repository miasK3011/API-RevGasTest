from django.db import models

class Bancos(models.Model):
    codigo = models.CharField(max_length=100, primary_key=True)
    instituicao = models.CharField(max_length=255)

    def __str__(self):
        return self.instituicao