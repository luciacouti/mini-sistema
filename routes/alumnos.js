const express = require('express');
const router = express.Router();
const alumnosService = require('../services/alumnosService');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
 const alumnos = await alumnosService.getAlumnos();
 res.sendFile('public/alumnos.html', {
  root: __dirname + '/../'
 });
});

router.get('/data', async (req, res) => {
 const alumnos = await alumnosService.getAlumnos();
 res.json(alumnos);
});

router.get('/nuevo', async (req, res) => {
 // Aquí se debe enviar el archivo HTML correspondiente a la vista de nuevo alumno
 res.sendFile('public/nuevoAlumno.html', {
  root: __dirname + '/../'
 });
});

router.get('/:legajo', async (req, res) => {
 const alumno = await alumnosService.getAlumnoByLegajo(req.params.legajo);
 // Aquí se debe enviar el archivo HTML correspondiente a la vista del alumno
 // y pasar la información del alumno obtenida para mostrarla en la vista
 res.sendFile('public/alumno.html', {
  root: __dirname + '/../'
 });
});

router.get('/data/:legajo', async (req, res) => {
 const alumno = await alumnosService.getAlumnoByLegajo(req.params.legajo);
 res.json(alumno);
});

// Aquí se deben agregar las rutas para las funcionalidades extra

router.post('/', async (req, res) => {
 try {
  await alumnosService.addAlumno(req.body);
  res.redirect('/alumnos');
 } catch (error) {
  res.status(500).send('Error al agregar el alumno');
 }
});

router.get('/editar/:legajo', async (req, res) => {
 const alumno = await alumnosService.getAlumnoByLegajo(req.params.legajo);
 // Aquí se debe enviar el archivo HTML correspondiente a la vista de editar alumno
 // y pasar la información del alumno obtenida para mostrarla en la vista
 res.sendFile('public/editarAlumno.html', {
  root: __dirname + '/../'
 });
});

const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.put('/:legajo', async (req, res) => {
 try {
  await alumnosService.updateAlumno(req.params.legajo, req.body);
  res.redirect(`/alumnos/\\${req.params.legajo}`);
 } catch (error) {
  res.status(500).send('Error al actualizar el alumno');
 }
});

router.post('/editar/:legajo', function (req, res, next) {
 const legajo = req.params.legajo;
 const nombre = req.body.nombre;
 const apellido = req.body.apellido;
 const email = req.body.email;
 const telefono = req.body.telefono;

 const filePath = path.join(__dirname, '../data/alumnos.json');

 fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) {
   console.log(err);
   res.status(500).send('Error al leer el archivo de alumnos');
  } else {
   const alumnos = JSON.parse(data);
   const alumnoIndex = alumnos.findIndex(alumno => alumno.legajo.toString() === legajo);

   if (alumnoIndex !== -1) {
    alumnos[alumnoIndex].nombre = nombre;
    alumnos[alumnoIndex].apellido = apellido;
    alumnos[alumnoIndex].email = email;
    alumnos[alumnoIndex].telefono = telefono;

    fs.writeFile(filePath, JSON.stringify(alumnos, null, 2), 'utf8', function (err) {
     if (err) {
      console.log(err);
      res.status(500).send('Error al actualizar el archivo de alumnos');
     } else {
      res.redirect('/alumnos');
     }
    });
   } else {
    res.status(404).send('Alumno no encontrado');
   }
  }
 });
});

module.exports = router;