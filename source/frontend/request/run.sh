# ab - Apache HTTP server benchmarking tool
# Use & to enable concurrent processing

ab -n 10000 -c 10 -T "text/plain" -p ./post_etcd/post_1.json http://172.20.10.5:50010/ &
ab -n 10000 -c 10 -T "text/plain" -p ./post_etcd/post_2.json http://172.20.10.5:50011/ &
ab -n 10000 -c 10 -T "text/plain" -p ./post_etcd/post_3.json http://172.20.10.5:50012/ 