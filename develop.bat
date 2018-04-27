@if [%1]==[] goto no_port

dev_appserver.py --port=%~1 app.yaml
exit /b

:no_port
dev_appserver.py app.yaml
