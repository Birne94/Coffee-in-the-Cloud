import json
from django.db import models


def convert_to_json(obj, fields=[]):
    result = {}

    for field in fields:
        value = getattr(obj, field, None)
        if callable(value):
            value = value()
        if isinstance(value, models.Model) and hasattr(value, "json"):
            value = value.json()
        result[field] = value

    return result