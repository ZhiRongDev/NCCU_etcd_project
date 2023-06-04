let area1_input = document.getElementById("area1_input");
let area2_input = document.getElementById("area2_input");
let area3_input = document.getElementById("area3_input");

let area1_ip = document.getElementById("area1_ip");
let area2_ip = document.getElementById("area2_ip");
let area3_ip = document.getElementById("area3_ip");

area1_input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // console.log(area1_input.value)
        let data = {
            key: area1_input.value
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
})

area2_input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // console.log(area2_input.value)
        let data = {
            key: area2_input.value
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
})

area3_input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log(area3_input.value)
        let data = {
            key: area3_input.value
        }
        let options = {
            method: 'POST',
            url: 'http://localhost:3000/',
            data: data
        }
        axios(options)
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                // console.log(error);
            })
    }
})