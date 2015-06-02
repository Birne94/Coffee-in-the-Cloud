from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist

from tallylist.models import TallyListEntry
from tallylist.permissions import IsTallyUser, IsRecentTally
from tallylist.serializers import TallyListEntrySerializer

from authentication.models import Account

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


class AccountTallyListEntryViewSet(viewsets.ModelViewSet):
    queryset = TallyListEntry.objects.select_related('user').order_by('-created_at')
    serializer_class = TallyListEntrySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsRecentTally(),)

    def list(self, request, user_pk=None):
        if user_pk is None:
            user_id = self.request.user.pk

        queryset = self.queryset.filter(user__pk=user_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

    def create(self, request, **kwargs):
        uid = request.data.get("user_id")
        if isinstance(uid, list):
            uid = int(uid[0])
        if uid:
            try:
                user = Account.objects.get(pk=uid)
            except ObjectDoesNotExist:
                pass
            else:
                request.data["user"] = user
                serializer = self.serializer_class(data=request.data)

                if serializer.is_valid():
                    TallyListEntry.objects.create(**serializer.validated_data)
                    return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

                return Response({
                    'status': 'Bad request',
                    'message': 'TallyListEntry could not be created with received data.' + serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'status': 'Bad request',
            'message': 'TallyListEntry could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)