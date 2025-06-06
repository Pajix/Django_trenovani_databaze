from django.shortcuts import render, redirect
from .forms import ZakazniciForm
from .models import Zakaznici


# Create your views here.
def zakaznici(request):

    if request.method == "POST":
        # vytvoříme formular na zaklade imporotvaneho forms.py
        form = ZakazniciForm(request.POST)
        if form.is_valid():
            # Zde se spouští celý validační proces včetně funkce clean_id_sap která je ve forms.py
            # Pokud je validace úspěšná, dosadí se vstupní data do objektu zakaznik

            # vytvoříme objekt z formuláře a vložíme do něj všechny nutné vstupy
            zakaznik = Zakaznici(
                id_sap=form.cleaned_data["id_sap"],
                nazev=form.cleaned_data["nazev"],
                mesto=form.cleaned_data["mesto"],
                ulice=form.cleaned_data["ulice"],
                poznamka=form.cleaned_data["poznamka"],
                latitude=form.cleaned_data["latitude"],
                longitude=form.cleaned_data["longitude"],
            )
            # uložíme objekt = po vyplnění objektu se uloží do databáze
            zakaznik.save()
            # po uložení vracíme se na stranku s formulárem, "pridat_zakaznika" je jméno odkazující v urls.py
            return redirect("pridat_zakaznika")

    # vytvoříme formular na zaklade imporotvaneho forms.py
    formular = ZakazniciForm()

    context = {"zakazniciForm": formular,
               "zakaznici": Zakaznici.objects.all()}

    # vracíme html a do html posíláme náš vytvořený formulář, který v html umístíme
    return render(request, "zakaznici/zakaznici.html", context)


def thank_you(request):
    return render(request, "jokesapp/thank-you.html")






