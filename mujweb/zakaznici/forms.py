from django import forms
from django.core.exceptions import ValidationError


class ZakazniciForm(forms.Form):

    # funkce pro zabezpečení formuláře, tato funkce se spouští automaticky v rámci procesu validace ve views.py
    def clean_id_sap(self):
        id_sap = str(self.cleaned_data.get('id_sap'))
        if not id_sap.isdigit() or len(id_sap) != 10:
            raise forms.ValidationError("Zadejte přesně 10 číslic.")
        return int(id_sap)

    # vytvoříme formular s jednotlivymi vstupy
    id_sap = forms.IntegerField(label="ID SAP",
                                widget=forms.TextInput(attrs={"placeholder": "ID SAP = Zadejte 10 číslic",
                                                              "pattern": "\d{10}",
                                                              "title": "Zadejte přesně 10 číslic"
                                                              }))
    nazev = forms.CharField(label="Název zákazníka", widget=forms.TextInput(attrs={"placeholder": "Název zákazníka"}))
    mesto = forms.CharField(label="Mesto", widget=forms.TextInput(attrs={"placeholder": "Město"}))
    ulice = forms.CharField(label="Ulice", widget=forms.TextInput(attrs={"placeholder": "Ulice"}))
    poznamka = forms.CharField(label="Poznamka", required=False,
                               widget=forms.TextInput(attrs={"placeholder": "Poznámka (nepovinné)"}))
    latitude = forms.FloatField(label="Latitude",
                                widget=forms.TextInput(attrs={"placeholder": "GPS šířka 50. (musí být tečka)"}))
    longitude = forms.FloatField(label="Longitude",
                                 widget=forms.TextInput(attrs={"placeholder": "GPS délka 14. (musí být tečka)"}))
