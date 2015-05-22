from rest_framework import permissions, viewsets, mixins
from rest_framework.response import Response

from tallylist.models import TallyListEntry
from tallylist.permissions import IsTallyUser
from tallylist.serializers import TallyListEntrySerializer


class TallyListEntryViewSet(viewsets.ModelViewSet):
    queryset = TallyListEntry.objects.select_related("user").order_by('-created_at')
    serializer_class = TallyListEntrySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsTallyUser(),)

    def list(self, request):
        queryset = self.queryset.filter(user__pk=request.user.pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)

        return super(TallyListEntryViewSet, self).perform_create(serializer)


class AccountTallyListEntryViewSet(viewsets.ViewSet):
    queryset = TallyListEntry.objects.select_related('user').order_by('-created_at')
    serializer_class = TallyListEntrySerializer

    def list(self, request, user_pk=None):
        if user_pk is None:
            user_id = self.request.user.pk

        queryset = self.queryset.filter(user__pk=user_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)