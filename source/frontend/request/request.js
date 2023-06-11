const Promise = require('bluebird')
global.Promise = Promise

const requests = [];

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

for (let i = 0; i < 1000; i++) {
    const Ip = ['192.168.137.180', '192.168.137.182', '192.168.137.190', '192.168.137.193', '192.168.137.196', '192.168.137.200', '192.168.137.201', '192.168.137.202', '192.168.137.210', '192.168.137.218', '192.168.137.220', '192.168.137.226', '192.168.137.230', '192.168.137.236', '192.168.137.240', '192.168.137.241', '192.168.137.242'];
    const region = ['ASI', 'USA', 'EUR']
    const service = ['APP', 'index.html', 'FILE']
    const ctlPerf = [0, 1, 2]

    let random_Ip = getRandomElement(Ip);
    let random_region = getRandomElement(region);
    let random_service = getRandomElement(service);
    let random_ctlPerf = getRandomElement(ctlPerf);

    let request_url = `http://172.20.10.2:30001/hdSimu/${random_region}/${random_service}/${random_Ip}?perf=${random_ctlPerf}`

    // 發模擬 request
    let requestPromise = fetch(request_url, {
        method: 'GET',
    }).then(function (res) {
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });

    requests.push(requestPromise);
}

Promise.all(requests)
    .then(function (results) {
        console.log('All requests completed successfully.');
    })
    .catch(function (error) {
        console.log('Error occurred during requests:', error);
    });