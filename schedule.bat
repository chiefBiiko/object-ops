
schtasks /create /sc onlogon /tn task.bat /tr task.bat 
schtasks /change /tn task.bat /disable
schtasks /tn task.bat /end
schtasks /tn task.bat /delete  # sudo