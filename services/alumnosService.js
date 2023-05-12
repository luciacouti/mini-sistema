const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'alumnos.json');

async function getAlumnos() {
 const data = await fs.readFile(dataPath, 'utf-8');
 return JSON.parse(data);
}

async function getAlumnoByLegajo(legajo) {
 const alumnos = await getAlumnos();
 return alumnos.find((alumno) => alumno.legajo === legajo);
}

async function addAlumno(alumnoData) {
 const alumnos = await getAlumnos();
 alumnos.push(alumnoData);
 await fs.writeFile(dataPath, JSON.stringify(alumnos, null, 2));
}

// Aquí se deben agregar las funciones para las funcionalidades extra
async function updateAlumno(legajo, alumnoData) {
 const alumnos = await getAlumnos();
 const index = alumnos.findIndex((alumno) => alumno.legajo === legajo);
 if (index !== -1) {
  alumnos[index] = alumnoData;
  await fs.writeFile(dataPath, JSON.stringify(alumnos, null, 2));
 } else {
  throw new Error('Alumno no encontrado');
 }
}


module.exports = {
 getAlumnos,
 getAlumnoByLegajo,
 addAlumno,
 updateAlumno
};