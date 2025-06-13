from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Permite lectura a todos, pero solo escritura a usuarios staff.
    """
    def has_permission(self, request, view):
        # Lectura: GET, HEAD, OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return True
        # Escritura: POST, PUT, DELETE (solo staff)
        return request.user and request.user.is_staff
