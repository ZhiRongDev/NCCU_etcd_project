const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let Domain_ip = {
    "NSD.com": "192.168.0.182"
}

app.post('/', (req, res) => {
    let Domain = req.body.Domain
    console.log(Domain)

    if (Domain_ip[Domain]) {
        res.send(Domain_ip[Domain]);
    } else {
        res.status(400).json({ message: "No such IP" })
    }
});

app.listen(3000);