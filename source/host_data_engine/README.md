# HDE-DNS-etcd
Host Data Engine(HDE) for KV of name mapping priority in etcd store.
About How to make our Data interpretability.
### what host data stand for?
Basically, the client accesses services according to priority IP recommended; then we capture each entry of request for collection and process into necessary information for data science.
### host data component
#### take the http-get `http://127.0.0.1:30001/hdSimu/ASI/index.html?perf=2` for example. [reference from simulator.](../main/simulator/client%20request.ps1)
- host: request host IP address. `e.g.` 127.0.0.1
- region: where this request from? `e.g.` ASI for ASIA
- service: what services be requested, lead to the load the host takes. `e.g.` index.html for WebUI unit
- ctlPerf: how this service be needed? `e.g.` 2 for speed required
- workload: how weight this host be monitored, tradeoff between performance and workload.
- count: what time this host be connected from last reset.
- ms: how fast is the most recent response, corresponding to the workload.
- node: how many hopping nodes which depends on region of request.

[raw data example](../main/data%20engine/raw_data_example.csv)
### where is the host data heading to?
While capturing each host data, we will send to collector for management; and then, this mechanism through controller to pack up effective data for transferring with HTTP method overall the procedure.

<img src="https://github.com/CWayneH/hde-dns-etcd/assets/90815681/a6033c3e-11d6-49dd-8e00-4803637d2bc4" width="60%" height="60%" alt="flow chart">

### data structure
#### this [table](../main/workflow/outcome.csv) we maintained and would dynamic update to etcd
| host | priIP | rbstatus |
| :---         |     :---:      |          ---: |
|NSD.com|192.168.0.182|0|
|BDS.com|192.168.0.190|0|
|CLIP.com|192.168.0.200|0|
|NCCUCS.com|192.168.0.210|0|
|NCCU.com|192.168.0.220|0|
|BTSLIN.com|192.168.0.236|0|
|unionlab.com|192.168.0.240|0|

#### behind this of above, we took care of each host IP status and priority calculation
|host|IP|status|scores|
|:---|:---:|---:|---:|
|BTSLIN.com|192.168.0.180|1|0|
|BTSLIN.com|192.168.0.182|1|0|
|NCCUCS.com|192.168.0.190|1|0|
|NCCUCS.com|192.168.0.193|1|0|
|NCCUCS.com|192.168.0.196|1|0|
|NCCU.com|192.168.0.200|1|0|
|NCCU.com|192.168.0.201|1|0|
|NCCU.com|192.168.0.202|0|0|
|NSD.com|192.168.0.210|1|0|
|NSD.com|192.168.0.218|1|0|
|BDS.com|192.168.0.220|1|0|
|BDS.com|192.168.0.226|1|0|
|CLIP.com|192.168.0.230|1|0|
|CLIP.com|192.168.0.236|1|0|
|unionlab.com|192.168.0.240|0|0|
|unionlab.com|192.168.0.241|1|0|
|unionlab.com|192.168.0.242|1|0|

[data table for example](../main/workflow/hostmap.csv)
