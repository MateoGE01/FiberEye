from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """
    Permiso personalizado que solo permite a los administradores realizar acciones.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff
    
    
    
class IsUser(permissions.BasePermission):
    """
    Permiso personalizado que solo permite a los usuarios autenticados.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated