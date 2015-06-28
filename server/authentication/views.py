from django.contrib.auth import authenticate, login, logout

from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response

from authentication.permissions import IsAccountOwner
from authentication.models import Account
from authentication.serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def list(self, request):
        def sorting_helper(a, b):
            if a == b:
                return 0
            if a.is_guest():
                return -1
            elif b.is_guest():
                return 1
            else:
                return -cmp(a.get_tally_list_entries(), b.get_tally_list_entries())

        queryset = sorted(self.queryset.all(), cmp=sorting_helper)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    def post(self, request, format=None):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)


class StatusView(views.APIView):
    permission_classes = ()

    def get(self, request, format=None):
        user = request.user
        if isinstance(user, Account):
            serialized = AccountSerializer(user)
            return Response({"user": serialized.data,
                             "status": True}, status=status.HTTP_200_OK)
        return Response({"status": False}, status=status.HTTP_200_OK)


class SettingsView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    user_settings = ["receive_emails", "show_in_rankings"]

    def get(self, request, format=None):
        result = {}
        for setting in self.user_settings:
            value = getattr(request.user, setting, None)

            if value is not None:
                result[setting] = value

        return Response(result, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        old_password = request.data.get("pw_old", None)
        new_password = request.data.get("pw_new", None)

        if old_password and new_password:
            if request.user.check_password(old_password):
                request.user.set_password(new_password)
                request.user.save()
                print request.user.email
                account = authenticate(email=request.user.email, password=new_password)
                print account
                login(request, account)
            else:
                return Response({}, status=status.HTTP_400_BAD_REQUEST)

        for setting in self.user_settings:
            value = request.data.get(setting, None)

            if value is not None:
                setattr(request.user, setting, value)
        request.user.save()

        return Response({}, status=status.HTTP_204_NO_CONTENT)
