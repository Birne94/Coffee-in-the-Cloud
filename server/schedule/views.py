from rest_framework import permissions, viewsets, views, status
from rest_framework.response import Response

from schedule.models import ScheduleEntry
from schedule.serializers import ScheduleEntrySerializer

from authentication.models import Account


class ScheduleEntryViewSet(viewsets.ModelViewSet):
    queryset = ScheduleEntry.objects.order_by('-date')
    serializer_class = ScheduleEntrySerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(),)

    def list(self, request):
        queryset = self.queryset#.filter(user__pk=request.user.pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)

        return super(ScheduleEntryViewSet, self).perform_create(serializer)


class ScheduleDoneView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        if isinstance(request.user, Account):
            latest = ScheduleEntry.objects.order_by('-date')[0]

            if not latest.done and latest.user.pk == request.user.pk:
                latest.done = True
                latest.save()

                return Response({}, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_401_UNAUTHORIZED)