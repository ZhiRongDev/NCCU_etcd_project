const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let key_value = {
    "foo": "127.0.0.1",
    "foo2": "8.8.8.8"
}

const { Etcd3 } = require('etcd3');
const client = new Etcd3();

client.watch()
    .prefix('foo')
    .create()
    .then(watcher => {
        watcher
            .on('disconnected', () => console.log('disconnected...'))
            .on('connected', () => console.log('successfully reconnected!'))
            .on('put', res => {
                (async () => {
                    console.log(res.key.toString())
                    console.log(res.value.toString())
                    key_value[res.key.toString()] = res.value.toString()

                    const allFkeys = await client.getAll().prefix('f').keys();
                    console.log('all our keys starting with "f":', allFkeys);
                })();
            });
    });

app.post('/', (req, res) => {
    console.log(req.body.key)
    let key = req.body.key
    res.send(key_value[key]);
});

app.listen(3000);