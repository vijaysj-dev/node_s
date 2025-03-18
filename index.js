const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('CONNECTED TO VIJAYS NINJA SERVER');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://192.168.29.66:${PORT}`);
});
