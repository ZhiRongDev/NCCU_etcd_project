const server = require('fastify')();
const client = require('node-fetch');
// const client = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

let ipAddr = process.argv[2];
let srvport = process.argv[3];
let rdAddr = process.argv[4];
// random by range
function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
// data initial
let host_data = {
	host: ipAddr,
	region: '',
	service: '',
	ctlPerf: -1,
    workload: 0, //cumulative
    count: 0, //cumulative
	ms: 0, // disposable
	node: 0, // disposable
    //scores: 100 //cumulative
	ts: -1 // timestamp
};

// deep copy of array
let hini = JSON.parse(JSON.stringify(host_data));
let errMsg = JSON.stringify({"error":"not found"});

server.get('/hdSimu', function (req, res) {
    console.log('request url is '+req.url);
	//res.redirect(host_data,redir+":8443/check");
	return host_data;
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
	let srv = req.params.service;
	// handle service dispatch
	if (/APP/i.test(srv))
		srv = 'APP';
	else if (/FILE/i.test(srv))
		srv = 'FILE';
	else
		srv = 'index.html';
	let usage = srv;
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
	
	// service usage
	let wl = 0; //workload
	if (usage === 'FILE')
		wl = between(20,40);
	else if (usage === 'APP')
		wl = between(15,25);
	else
		wl = 10;
	// performance-workload tradeoff
	let spd = 0;
	switch (qry) {
		case '0':
			spd=between(101,200);
			wl+=1000/spd;
			break;
		case '1':
			spd=between(76,120);
			wl+=900/spd;
			break;
		case '2':
			spd=between(40,80);
			wl+=800/spd;
			break;
		default:
			spd=200;
			wl+=5;
	}
	// console.log('speed:'+spd);
	
	host_data.node = n;
	host_data.region = from;
	host_data.service = usage;
	host_data.ctlPerf = qry;
	host_data.workload+=Math.round(wl);
	host_data.ms = spd;
	host_data.count++;
	host_data.ts = Date.now();
	// simulate weight of count
	/*
	let w = host_data.count;
	if (w <= 10)
		w=1;
	else
		w=2;
	*/
	
	// weighting example
	// host_data.scores+=-wl/10-w-n-spd/10;
	// console.log(ipAddr+':'+srvport+' :this host scores nowadays is '+host_data.scores);
	
	// forward to collector
	let redUrl = "http://"+rdAddr+":8443/add";
	console.log(redUrl);
	
	(async () => {
		const rpons = await client(redUrl, {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(host_data)
		});
		const data = await rpons.json();
		console.log(data);
	})();

	
	if (!host_data) {
		console.log(errMsg);
		return errMsg;
	}
	else
		return host_data;
});


server.listen(srvport, ipAddr);
/* 
@author CWayneH
https://github.com/CWayneH/hde-dns-etcd/blob/main/simulator/host-raw-data.js
*/
