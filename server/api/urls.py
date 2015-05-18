from django.conf.urls import patterns, url
from api import views, views_user, views_tally

urlpatterns = patterns("",
                       url(r"^$", views.index, name="index"),

                       url(r"^user$", views_user.status, name="user_status"),
                       url(r"^user/login$", views_user.login, name="user_login"),
                       url(r"^user/logout$", views_user.logout, name="user_logout"),
                       url(r"^users$", views_user.list, name="user_list"),

                       url(r"^tally$", views_tally.status, name="tally_status"),
                       url(r"^tally/add$", views_tally.add, name="tally_add"),
)