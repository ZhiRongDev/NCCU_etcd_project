const server = require('fastify')();
const client = require('node-fetch');

let ipAddr = process.argv[2];
let srvport = process.argv[3];
server.get('/hdSimu/:region/:service/:IP', function (req, res) {
	console.log('request url is '+req.url);
	let fwAddr = req.params.IP;
	let from = req.params.region;
	let srv = req.params.service;
	let qry = req.query.perf;
	// forward to distributed host
	let fwUrl = "http://"+fwAddr+":30001/hdSimu/"+from+"/"+srv+"?perf="+qry;
	console.log(fwUrl);
	
	(async () => {
		const rpons = await client(fwUrl, {
			method: 'GET',
		});
		const data = await rpons.json();
		console.log(data);
	})();
	// return fwUrl;
});
server.post('/hdSimu/:region/:service', function (req, res) {
    // 依Lab說明寫作
	console.log('request url is '+req.url);
	let fwAddr = req.body;
  // {"ip":"192.168.137.221"}
	let from = req.params.region;
	let srv = req.params.service;
	let qry = req.query.perf;
	// forward to distributed host
	let fwUrl = "http://"+fwAddr.ip+":30001/hdSimu/"+from+"/"+srv+"?perf="+qry;
	console.log(fwUrl);
	
	(async () => {
		const rpons = await client(fwUrl, {
			method: 'GET',
		});
		const data = await rpons.json();
		console.log(data);
	})();
	
	return fwUrl;
});

server.listen(srvport, ipAddr);
/* 
@author CWayneH
https://github.com/CWayneH/hde-dns-etcd/blob/main/data%20engine/fw-to-host.js
*/
