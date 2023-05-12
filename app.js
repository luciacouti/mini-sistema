// const express = require('express');
// const app = express();
// const alumnosRoutes = require('./routes/alumnos');

// app.use(express.urlencoded({
//  extended: true
// }));
// app.use(express.json());
// app.use(express.static('public'));

// app.use('/alumnos', alumnosRoutes);

// app.listen(2023, () => {
//  console.log('Server listening on port 2023');
// });

// const express = require('express');
// const app = express();
// const fs = require('fs');

// app.use(express.static('public'));

// app.get('/alumnos', (req, res) => {
//  fs.readFile('data/alumnos.json', 'utf8', (err, data) => {
//   if (err) {
//    res.status(500).send('Error al leer el archivo de alumnos');
//   } else {
//    res.setHeader('Content-Type', 'application/json');
//    res.send(data);
//   }
//  });
// });

// app.listen(2023, () => {
//  console.log('Servidor escuchando en el puerto 2023');
// });

const express = require('express');
const app = express();
const fs = require('fs');
const alumnosRoutes = require('./routes/alumnos');

app.use(express.urlencoded({
 extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.use('/alumnos', alumnosRoutes);

app.listen(2023, () => {
 console.log('Servidor escuchando en el puerto 2023');
});