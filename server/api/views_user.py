from django.http import JsonResponse
from core.decorators import login_required
from core.models import CoffeeUser
from django.core.exceptions import ObjectDoesNotExist
from api.views import error


# query current login status
def status(request):
    user_id = request.session.get("user_id", -1)
    try:
        user = CoffeeUser.objects.get(pk=user_id)
    except ObjectDoesNotExist:
        user_id = -1

    if user_id < 0:
        return JsonResponse({"status": False})
    else:
        return JsonResponse({"status": True,
                             "user_id": user_id,
                             "user": user.json("FirstName", "LastName", "Balance", "Email")},
                            safe=False)


# login user
def login(request):
    user_id = request.POST.get("user_id", -1)
    try:
        user = CoffeeUser.objects.get(pk=user_id)
    except ObjectDoesNotExist:
        user_id = -1

    if user_id < 0:
        return error("auth_failed")

    request.session["user_id"] = user_id

    return JsonResponse({"status": True})


# logout user
@login_required()
def logout(request, user):
    request.session.clear()

    return JsonResponse({"status": True})


# list all users
def list(request):
    users = map(lambda u: u.json(), CoffeeUser.objects.all())
    return JsonResponse(users, safe=False)