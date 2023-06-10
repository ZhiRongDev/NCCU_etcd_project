let domain_name = document.getElementById("domain_name");
let search_btn = document.getElementById("search_btn");
let search_result = document.getElementById("search_result");

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

search_btn.addEventListener('click', function (e) {
    // console.log(domain_name.value)
    let data = {
        Domain: domain_name.value.replace(/\s/g, '')
    }
    let options = {
        method: 'POST',
        url: 'http://localhost:3000/',
        data: data
    }
    axios(options)
        .then(function (res) {
            // console.log(res.data);
            const IP = res.data;

            const region = ['ASI', 'USA', 'EUR']
            const service = ['APP', 'index.html', 'FILE']
            const ctlPerf = [0, 1, 2]

            let random_region = getRandomElement(region);
            let random_service = getRandomElement(service);
            let random_ctlPerf = getRandomElement(ctlPerf);

            let request_url = `http://${IP}:30001/hdSimu/${random_region}/${random_service}?perf=${random_ctlPerf}`

            let str = `
                <p>對應 Host IP: ${IP}</p>
                <p>模擬 request: ${request_url}</p> 
            `;
            search_result.innerHTML = str;

            // 發模擬 request
            let options = {
                method: 'GET',
                url: request_url
            }
            axios(options)
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
        .catch(function (err) {
            console.log(err);
            search_result.innerHTML = `<p>查無此域名</p>`;
        })
})