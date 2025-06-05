from django.db import models


class Zakaznici(models.Model):
    id_sap = models.IntegerField(primary_key=True, default=1111111111)  # přidat default
    nazev = models.CharField(max_length=100)
    mesto = models.CharField(max_length=100)
    ulice = models.CharField(max_length=100)
    poznamka = models.TextField(max_length=100, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()



