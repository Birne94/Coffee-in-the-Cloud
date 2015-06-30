from rest_framework import permissions


class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user:
            return obj == request.user
        return False


class IsBalanceAdministrator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated() and request.user.has_perm("authentication.manage_balance")