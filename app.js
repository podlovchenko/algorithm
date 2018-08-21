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
    const p = graph[n].map((item, i) => item !== 0 || i === n ? n : -1);
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

        if (imin === null) {
            break;
        }

        graph[imin].forEach((item, i) => {
            if (item !== 0 && (d[imin] + item < d[i] || !d[i])) {
                d[i] = d[imin] + item;
                p[i] = imin;
            }
        });

        v.push(imin);
    }

    const answer = {};

    for (let i = 0; i < p.length; i++) {
        answer[i] = {};

        answer[i].way = [];
        answer[i].weight = d[i];

        let j = i;
        let state = true;

        while (p[j] !== n) {
            if (p[j] === -1) {
                state = false;

                break;
            }

            answer[i].way.push(p[j]);

            j = p[j];
        }

        if (state) {
            answer[i].way.push(n);
            answer[i].way.reverse();
        } else {
            answer[i].way = -1;
        }
    }

    return answer;
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
    const v = Number(req.params.v);

    if (v >= 0 && v < graph.length) {
        res.status(200).json(calculate(v));
    } else {
        res.status(400).json('error');
    }
});

app.listen(process.env.PORT || '8080', () => {
    console.log('Server listening port');
});
