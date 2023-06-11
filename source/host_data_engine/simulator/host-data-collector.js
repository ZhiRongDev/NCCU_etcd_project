const server = require('fastify')();
let ipaddr = process.argv[2];
// fixed port as 8443
// let srvport = process.argv[3];
function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

let host_data = {
	host: 'Host1',
    workload: 0, //cumulative
    count: 0, //cumulative
	ms: 0, // disposable
	node: 0, // disposable
    scores: 100 //cumulative
};

// deep copy of array
let hini = JSON.parse(JSON.stringify(host_data));
let errMsg = JSON.stringify({"error":"not found"});
let hosts = [];

server.get('/check', function (req, res) {
    console.log('request url is '+req.url);
	
	return JSON.stringify(hosts);
});

// maintenance
server.get('/hdSimu/ini', function (req, res) {
    console.log('request url is '+req.url);
	host_data = JSON.parse(JSON.stringify(hini));
	return host_data;
});

// url params:region(USA, EUR, ASI), service(homepage, APP, ..)
// url query:perf(0,1,2)
server.get('/hdSimu/:region/:service', function (req, res) {
    console.log('request url is '+req.url);
	
	let from = req.params.region;
	let usage = req.params.service;
	let qry = req.query.perf;
	console.log('query:'+qry);
	
	// node hopping
	let n = 0;
	if (from === 'USA')
		n = between(3,5);
	else if (from === 'EUR')
		n = between(4,8);
	else if (from === 'ASI')
		n = between(1,4);
	else
		n = 9;
	host_data.node = n;
	// service usage
	let wl = 0; //workload
	if (usage === 'index.html')
		wl = 10;
	else
		wl = 40;
	host_data.workload+=wl;
	// performance
	let spd = 0;
	switch (qry) {
		case '0':
			spd=200;
			break;
		case '1':
			spd=100;
			break;
		case '2':
			spd=10;
			break;
		default:
			spd=1;
	}
	console.log('speed:'+spd);
	host_data.ms = spd;
	
	host_data.count++;
	let cnt = host_data.count;
	if (cnt <= 10)
		cnt=1;
	else
		cnt=2;
	
	// weighting example
	host_data.scores+=-wl/10-cnt-n-spd/10;
	
	console.log(ipaddr+':'+srvport+' :this host scores nowadays is '+host_data.scores);
	
	if (!host_data) {
		console.log(errMsg);
		return errMsg;
	}
	else
		return host_data;
});

server.post('/add', function (req, res) {
    // 依Lab說明寫作
	console.log('request url is '+req.url);
	let addHost = req.body;
	hosts.push(addHost);
	return { hosts_count: hosts.length};
});

server.put('/hogRider/:name', function (req, res) {
    // 依Lab說明寫作
	console.log('request url is '+req.url);
	// retrieve index of name in query path
	let index = hogRiders.findIndex(element => element.name === req.params.name);
	console.log('update index:'+index+' with new data:');
	console.log(req.body);
	hogRiders[index]=req.body;
	return hogRiders[index];
});

server.listen(8443, ipaddr);
/* 
@author CWayneH
https://github.com/CWayneH/hde-dns-etcd/blob/main/simulator/host-data.js
*/