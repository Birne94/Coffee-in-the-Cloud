from rest_framework import permissions


class IsTallyUser(permissions.BasePermission):
    def has_object_permission(self, request, view, tally):
        if request.user:
            return tally.user == request.user
        return False