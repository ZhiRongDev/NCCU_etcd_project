## Workflow
### This contains all steps for HDE demo; in addition to this, some maintenance batch tool included.
- run netman.bat to activate network interface
   ```
   netman.bat add {NIC card} {network domain}
   ```
- open 1 [forwarding portal host](../data%20engine/fw-to-host.js)(optional), 17 [distributed host](../data%20engine/host-raw-data.js) for services, and 1 [collector host](../data%20engine/hosts-data-collector.js) to catch all hosts data.
   ```
   openode.bat {working directory} {conda environment} {network domain} " 30001`
   ```
- (optional)run [client request simulator](./client%20request.ps1) w/ powershel script.
   ```
   powershell.exe -f '.\client request.ps1'
   ```
- while collecting enough data, call collector seize interface; then mechanism will write a .csv file in server-end.
   ```
   curl http://{collector IP}:8443/seize
   ```
- we use [R script](../data%20engine/data%20process.R) for data analysis, that processing hosts data to output priority IP address.
   ```
   Rscript "data process.R" {hosts data} {hostmap.csv} {outcome.csv}
   ```
- after all, we push outcome in [.py code](../host_table_controller/push_data.py) regularly.
   ```
   python push_data.py
   ```
