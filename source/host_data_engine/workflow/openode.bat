rem @ECHO off
rem ECHO "add ipv4 into interface"
rem FOR /L %A IN (170,10,240) DO netsh interface ipv4 add address "Wi-Fi" 10.0.1.%A 255.255.255.0
ECHO "move to working directory"
PAUSE
rem pass working path to %1
rem "D:\Wayne\DSys\etcd"
cd /D %1
rem %2 for env
call conda activate %2
ECHO "start host node.."
rem %3 for domain IP
start "collector" node hosts-data-collector.js %3.170
rem ugly but fine: openode.bat {working dir} {conda env} 192.168.0 " 30001
FOR /L %%A IN (180,10,240) DO start "host%%A" node host-raw-data.js "%3.%%A% %%4 %3.170
PAUSE
start "host182" node host-raw-data.js %3.182 30001 %3.170
start "host193" node host-raw-data.js %3.193 30001 %3.170
start "host196" node host-raw-data.js %3.196 30001 %3.170
start "host201" node host-raw-data.js %3.201 30001 %3.170
start "host202" node host-raw-data.js %3.202 30001 %3.170
start "host218" node host-raw-data.js %3.218 30001 %3.170
start "host226" node host-raw-data.js %3.226 30001 %3.170
start "host236" node host-raw-data.js %3.236 30001 %3.170
start "host241" node host-raw-data.js %3.241 30001 %3.170
start "host242" node host-raw-data.js %3.242 30001 %3.170
rem start "FWinterface" node fw-to-host.js 172.20.10.2 30001
ECHO "Prepare to kill host process"
PAUSE
FOR /L %%A IN (180,10,240) DO taskkill /FI "WindowTitle eq host%%A" /T /F
taskkill /FI "WindowTitle eq host182" /T /F
taskkill /FI "WindowTitle eq host193" /T /F
taskkill /FI "WindowTitle eq host196" /T /F
taskkill /FI "WindowTitle eq host201" /T /F
taskkill /FI "WindowTitle eq host202" /T /F
taskkill /FI "WindowTitle eq host218" /T /F
taskkill /FI "WindowTitle eq host226" /T /F
taskkill /FI "WindowTitle eq host236" /T /F
taskkill /FI "WindowTitle eq host241" /T /F
taskkill /FI "WindowTitle eq host242" /T /F
rem taskkill /FI "WindowTitle eq FWinterface" /T /F
ECHO "Prepare to kill collector process"
PAUSE
taskkill /FI "WindowTitle eq collector" /T /F
rem ECHO "delete ipv4 from interface"
PAUSE
rem FOR /L %A IN (170,10,190) DO netsh interface ipv4 delete address "乙太網路" 192.168.0.%A
ECHO "done."
PAUSE
