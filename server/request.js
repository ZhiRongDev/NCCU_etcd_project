const axios = require('axios');
const host = ['NSD.com', 'BDS.com', 'CLIP.com', 'NCCUCS.com	', 'NCCU.com', 'BTSLIN.com', 'unionlab.com']

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

for (let i = 0; i < 2000; i++) {
    let random_host = getRandomElement(host);
    // console.log(random_host);
    let data = {
        Domain: random_host
    }
    let options = {
        method: 'POST',
        url: 'http://localhost:3000/',
        data: data
    }
    axios(options)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}