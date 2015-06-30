from django.template.loader import render_to_string

from rest_framework import permissions, viewsets, views, status
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist

from tallylist.permissions import IsTallyUser, IsRecentTally
from tallylist.serializers import TallyListEntrySerializer
from tallylist.models import TallyListEntry

from authentication.models import Account, Settings
from authentication.permissions import IsBalanceAdministrator

from server.mail import send_email
from server.settings import MAIL_SENDER

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


class TallyListAllEntryViewSet(viewsets.ModelViewSet):
    queryset = TallyListEntry.objects.order_by('-created_at')
    serializer_class = TallyListEntrySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(),)

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)

        return Response(serializer.data)


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


class BlameView(views.APIView):
    permission_classes = ()

    def post(self, request, format=None):
        user = TallyListEntry.objects.order_by('-created_at')[0].user

        send_email(MAIL_SENDER,
                       [user.email],
                       "You have been blamed!",
                       render_to_string("mail-blame.txt", {
                           "firstname": user.first_name,
                           "lastname": user.last_name
                       }))

        return Response({}, status=status.HTTP_204_NO_CONTENT)


class GlobalBalanceView(views.APIView):
    permission_classes = (permissions.IsAuthenticated, IsBalanceAdministrator)

    def post(self, request, format=None):
        try:
            balance = float(Settings.objects.get(name="total_balance").value)
        except ObjectDoesNotExist, ValueError:
            balance = 0
            try:
                Settings.objects.create(name="total_balance",
                                        value="0.0").save()
            except:
                pass

        amount = request.data.get("amount", None)
        user = request.data.get("user", None)

        if amount:
            amount = float(amount.replace(",", "."))

            if user:
                user = Account.objects.get(pk=int(user))
                user.balance += amount
                user.save()

            balance += amount
            setting = Settings.objects.get(name="total_balance")
            setting.value = str(balance)
            setting.save()

        return Response({"balance": balance}, status=status.HTTP_200_OK)

    def get(self, request, format=None):
        try:
            balance = float(Settings.objects.get(name="total_balance").value)
        except ObjectDoesNotExist, ValueError:
            balance = 0
            try:
                Settings.objects.create(name="total_balance",
                                        value="0.0").save()
            except:
                pass
        return Response({"balance": balance}, status=status.HTTP_200_OK)