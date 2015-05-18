from django.http import JsonResponse
from core.decorators import login_required

API_VERSION = "1.0"

ERROR_MESSAGES = {
    "auth_required": (401, "authentication required"),
    "auth_failed": (403, "authentication failed"),
    "value_error": (400, "invalid value supplied")
}


def index(request):
    return JsonResponse({"status": True,
                         "version": API_VERSION})


def error(type):
    error_info = ERROR_MESSAGES.get(type)

    if not error_info:
        error_info = (400, "unknown error")

    return JsonResponse({"status": False,
                         "error": error_info[0],
                         "message": error_info[1]})


def error_auth():
    return error("auth_required")
