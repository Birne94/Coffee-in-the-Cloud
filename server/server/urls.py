from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.views.decorators.csrf import csrf_exempt
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView, StatusView
from tallylist.views import TallyListEntryViewSet, AccountTallyListEntryViewSet, BlameView
from schedule.views import ScheduleEntryViewSet
from statistics.views import StatisticsView, StatisticsOwnView, StatisticsCoffeeTypeView

router = routers.SimpleRouter()
router.register("accounts", AccountViewSet)
router.register("tally", TallyListEntryViewSet)
router.register("schedule", ScheduleEntryViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, "accounts", lookup="user"
)
accounts_router.register("tally", AccountTallyListEntryViewSet)

urlpatterns = [
    url(r'^admin/?', include(admin.site.urls)),
    url(r'^api/v1/?', include(router.urls)),
    url(r'^api/v1/?', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/?$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/?$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/auth/status/?$', StatusView.as_view(), name='status'),
    url(r'^api/v1/statistics/?$', StatisticsView.as_view(), name='statistics'),
    url(r'^api/v1/statistics/own/?$', StatisticsOwnView.as_view(), name='statistics_own'),
    url(r'^api/v1/statistics/type/?$', StatisticsCoffeeTypeView.as_view()),
    url(r'^api/v1/blame/?$', BlameView.as_view()),

    url(r'^$', 'django.views.static.serve', {
        'path': 'index.html',
        'document_root': settings.CLIENT_ROOT
    }),
    url(r'^(static|coffee)/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.STATICFILES_DIRS[0]
    }),
    url(r'^(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.CLIENT_ROOT
    }),
]