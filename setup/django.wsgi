import os, sys
sys.path.append('/var/www/django')
sys.path.append('/var/www/django/Coffee-in-the-Cloud')
sys.path.append('/var/www/django/Coffee-in-the-Cloud/server')
os.environ['DJANGO_SETTINGS_MODULE'] = 'server.settings'

import django.core.handlers.wsgi

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()