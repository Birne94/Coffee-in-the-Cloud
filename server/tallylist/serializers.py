from rest_framework import serializers
from authentication.serializers import AccountSerializer
from tallylist.models import TallyListEntry


class TallyListEntrySerializer(serializers.ModelSerializer):
    user = AccountSerializer(read_only=True, required=False)
    user_id = serializers.IntegerField(required=False)

    class Meta:
        model = TallyListEntry
        fields = ("id", "user", "user_id", "amount", "processed", "created_at", "is_deletable")
        read_only_fields = ('created_at',)

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(TallyListEntrySerializer, self).get_validation_exclusions()

            return exclusions

        def create(self, data):
            if data.get("user_id"):
                del data["user_id"]
            return TallyListEntry.objects.create(**data)


class TallyListStatisticSerializer(serializers.ModelSerializer):
    month = serializers.CharField(required=False)
    amount__sum = serializers.IntegerField(required=False)
    pk__count = serializers.IntegerField(required=False)

    class Meta:
        model = TallyListEntry
        fields = ("month", "amount__sum", "pk__count")

        def get_validation_exclusions(self, *args, **kwargs):
            exclusions = super(TallyListEntrySerializer, self).get_validation_exclusions()

            return exclusions
