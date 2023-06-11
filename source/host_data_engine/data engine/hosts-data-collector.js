const server = require('fastify')();
const { writeFile } = require('fs').promises;

// convert json object to csv file.
async function json2csvFile (fileName, data) {
  // array to csv format
  csv_d = data.map(row => Object.values(row));
  csv_d.unshift(Object.keys(data[0]));
  const csv = `"${csv_d.join('"\n"').replace(/,/g, '","')}"`;
  
  try {
  	await writeFile(fileName, csv, 'utf8'); 
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

// format time for file name
function format (date) {  
  if (!(date instanceof Date)) {
    throw new Error('Invalid "date" argument. You must pass a date instance')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hr = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const sec = String(date.getSeconds()).padStart(2, '0')

  return `${year}${month}${day}${hr}${min}${sec}`
}

let ipaddr = process.argv[2];
// fixed port as 8443
// let srvport = process.argv[3];

let errMsg = JSON.stringify({"error":"not found"});
let hosts = [];
let bak = [];

// [{"host":"192.168.137.180","region":"ASI","service":"APP","ctlPerf":"2","workload":37,"count":1,"ms":44,"node":1}]
server.get('/seize', function (req, res) {
    console.log('request url is '+req.url);
	if (!!hosts.length)
	{
		let optFN = format(new Date())+'-hosts_data.csv';
		// let optFN = format('hosts_data.csv');
		(async () => {
		  await json2csvFile(optFN, hosts);
		  console.log(`Successfully converted ${optFN}!`);
		})();
	}
	return JSON.stringify(hosts);
});

// maintenance
server.get('/copy', function (req, res) {
    console.log('request url is '+req.url);
	// deep copy of array
	bak = JSON.parse(JSON.stringify(hosts));
	hosts = [];
	return bak;
});

// need to /copy first
server.get('/backup', function (req, res) {
    console.log('request url is '+req.url);
	if (!!bak.length)
	{
		let optFN = format(new Date())+'-hosts_data.bak.csv';
		(async () => {
		  await json2csvFile(optFN, JSON.stringify(bak));
		  console.log(`Successfully converted ${optFN}!`);
		})();
	}
	return bak;
});

server.listen(8443, ipaddr);
/* 
@author CWayneH
https://github.com/CWayneH/hde-dns-etcd/blob/main/simulator/hosts-data-collector.js
*/
