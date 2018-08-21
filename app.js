const express = require('express');

const graph = [
    [0, 10, 0, 30, 100],
    [0, 0, 50, 0, 0],
    [0, 0, 0, 0, 10],
    [0, 0, 20, 0, 60],
    [0, 0, 0, 0, 0],
];

const calculate = (n) => {
    const d = graph[n];
    const v = [];

    v.push(n);

    while (v.length < graph.length) {
        let min = Math.max(...d);
        let imin = null;

        d.forEach((item, i) => {
            if (item !== 0 && item <= min && !v.includes(i)) {
                min = item;
                imin = i;
            }
        });

        if (!imin) {
            break;
        }

        graph[imin].forEach((item, i) => {
            if (item !== 0 && (d[imin] + item < d[i] || !d[i])) {
                d[i] = d[imin] + item;
            }
        });

        v.push(imin);
    }

    return d;
};

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/graph', (req, res) => {
    res.status(200).json(graph);
});

app.use('/way/:v', (req, res) => {
    const {v} = req.params;
    res.status(200).json(calculate(v));
});

app.listen(process.env.PORT || '8080', () => {
    console.log('Server listening port');
});
