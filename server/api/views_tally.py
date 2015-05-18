from django.http import JsonResponse
from core.decorators import login_required
from core.models import TallyListEntry, CoffeeUser
from api.views import error


@login_required()
def status(request, user):
    entries = TallyListEntry.objects.filter(User=user, Processed=False)
    coffee_count = sum([entry.Amount for entry in entries])
    coffees = map(lambda c: c.json("Amount", "Time"), entries)

    return JsonResponse({"status": True,
                         "coffee_count": coffee_count,
                         "coffees": coffees})


@login_required()
def add(request, user):
    try:
        amount = int(request.POST.get("amount", 0))
    except ValueError:
        return error("value_error")

    if amount <= 0:
        return error("value_error")

    entry = TallyListEntry.objects.create(User=user,
                                          Amount=amount)
    entry.save()

    return JsonResponse({"status": True})