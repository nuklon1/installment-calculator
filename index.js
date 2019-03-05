const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/routes', require('./routes'));

// app.use((req, res, next) => {
//     res.status(404).send("Sorry can't find that!")
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// });

app.listen(4000, () => console.log('Server is listening...'));