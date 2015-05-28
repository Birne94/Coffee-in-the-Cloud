from rest_framework import serializers
from authentication.serializers import AccountSerializer
from schedule.models import ScheduleEntry


class ScheduleEntrySerializer(serializers.ModelSerializer):
    user = AccountSerializer(read_only=False, required=True)

    class Meta:
        model = ScheduleEntry
        fields = ("user", "type", "date")

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(ScheduleEntrySerializer, self).get_validation_exclusions()

            return exclusions + ['user']
