const express = require('express');
const router = express.Router();
const alumnosService = require('../services/alumnosService');

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


// router.get('/:legajo', async (req, res) => {
//  const alumno = await alumnosService.getAlumnoByLegajo(req.params.legajo);
//  // Aquí se debe enviar el archivo HTML correspondiente a la vista del alumno
//  // y pasar la información del alumno obtenida para mostrarla en la vista
//  res.sendFile('public/alumno.html', {
//   root: __dirname + '/../'
//  });
// });

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
  res.redirect(`/alumnos/\${req.params.legajo}`);
 } catch (error) {
  res.status(500).send('Error al actualizar el alumno');
 }
});





module.exports = router;