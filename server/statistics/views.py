from django.db import connection
from django.db.models import Sum, Count

from rest_framework import status, views
from rest_framework.response import Response

from tallylist.models import TallyListEntry
from tallylist.serializers import TallyListStatisticSerializer

truncate_date = connection.ops.date_trunc_sql('month', 'created_at')

STATISTICS_MONTHS = 5


class StatisticsView(views.APIView):
    serializer_class = TallyListStatisticSerializer

    def get(self, request, format=None):
        qs = TallyListEntry.objects.extra({
            'month':connection.ops.date_trunc_sql('month', 'created_at')
        })
        data = qs.values('month').annotate(Sum('amount'), Count('pk')).order_by('month')
        serializer = self.serializer_class(data, many=True)

        return Response(serializer.data)


class StatisticsOwnView(views.APIView):
    serializer_class = TallyListStatisticSerializer

    def get(self, request, format=None):
        qs = TallyListEntry.objects.filter(user=request.user).extra({
            'month':connection.ops.date_trunc_sql('month', 'created_at')
        })
        data = qs.values('month').annotate(Sum('amount'), Count('pk')).order_by('month')
        serializer = self.serializer_class(data, many=True)

        return Response(serializer.data)


class StatisticsCoffeeTypeView(views.APIView):
    serializer_class = TallyListStatisticSerializer

    def get(self, request, format=None):
        qs = TallyListEntry.objects.select_related("amount")
        data = qs.values('amount').annotate(Count('amount')).order_by('amount')
        serializer = self.serializer_class(data, many=True)

        return Response(serializer.data)

