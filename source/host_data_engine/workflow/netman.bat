rem FOR /L %A IN (170 10 240) DO netsh interface ipv4 add address "乙太網路" 192.168.0.%A 255.255.255.0
rem netman.bat add "乙太網路" 192.168.0
FOR /L %%A IN (170,10,240) DO netsh interface ipv4 %1 address %2 %3.%%A% 255.255.255.0
netsh interface ipv4 %1 address %2 %3.182 255.255.255.0
netsh interface ipv4 %1 address %2 %3.193 255.255.255.0
netsh interface ipv4 %1 address %2 %3.196 255.255.255.0
netsh interface ipv4 %1 address %2 %3.201 255.255.255.0
netsh interface ipv4 %1 address %2 %3.202 255.255.255.0
netsh interface ipv4 %1 address %2 %3.218 255.255.255.0
netsh interface ipv4 %1 address %2 %3.226 255.255.255.0
netsh interface ipv4 %1 address %2 %3.236 255.255.255.0
netsh interface ipv4 %1 address %2 %3.241 255.255.255.0
netsh interface ipv4 %1 address %2 %3.242 255.255.255.0
PAUSE