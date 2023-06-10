# ab - Apache HTTP server benchmarking tool
# Use & to enable concurrent processing

ab -n 1000 -c 10 -T 'application/json' -p ./post_data/post_1.json http://localhost:3000/ &
ab -n 1000 -c 10 -T 'application/json' -p ./post_data/post_2.json http://localhost:3000/ &
ab -n 1000 -c 10 -T 'application/json' -p ./post_data/post_3.json http://localhost:3000/ 