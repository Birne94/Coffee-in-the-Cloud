pandoc introduction.md organisationalProcess.md technology/angular.md technology/django.md architecture/overview.md architecture/frontend.md architecture/backend.md modules/others.md setup.md user.md conclusion.md -f markdown -t latex -o coffee-in-the-cloud.tex

format.py

pdflatex header.tex


copy /Y header.pdf coffee-in-the-cloud.pdf