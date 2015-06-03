from rest_framework import permissions, viewsets, mixins
from rest_framework.response import Response

from schedule.models import ScheduleEntry
from schedule.serializers import ScheduleEntrySerializer


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

        return super(TallyListEntryViewSet, self).perform_create(serializer)
