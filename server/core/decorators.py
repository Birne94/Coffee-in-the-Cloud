from functools import wraps
from django.utils.decorators import available_attrs
from django.core.exceptions import ObjectDoesNotExist
import api.views
from core.models import CoffeeUser


def decorator(function=None, update=None):
    def dec(view_func):
        @wraps(view_func, assigned=available_attrs(view_func))
        def _wrapped_view(request, *args, **kwargs):
            if function(request):
                if update:
                    kwargs.update(update(request))
                return view_func(request, *args, **kwargs)

            return api.views.error_auth()

        return _wrapped_view
    return dec


def _find_user(request):
    user_id = request.session.get("user_id", -1)
    try:
        user = CoffeeUser.objects.get(pk=user_id)
    except ObjectDoesNotExist:
        user = None

    return user


def login_required(function=None):
    actual_decorator = decorator(lambda r: _find_user(r) is not None,
                                 lambda r: {"user": _find_user(r)})

    return actual_decorator