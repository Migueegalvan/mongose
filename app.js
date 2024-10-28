// app.js

// Importar Mongoose y dotenv
const mongoose = require('mongoose');
require('dotenv').config();

// Obtener la cadena de conexión desde el archivo .env
const uri = process.env.MONGODB_URI;

// Conectar a MongoDB usando Mongoose
mongoose.connect(uri)
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
        // Llamar a la función CRUD aquí si lo deseas
        ejecutarCRUD();
    })
    .catch(error => {
        console.error('Error al conectar a MongoDB:', error);
    });

// Definir el esquema y modelo para Superhéroes
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now }
});

const SuperHero = mongoose.model('SuperHero', superheroSchema);

// Métodos CRUD

// Método 1: Insertar un Documento
async function insertSuperHero() {
    try {
        const hero = new SuperHero({
            nombreSuperHeroe: 'Spiderman',
            nombreReal: 'Peter Parker',
            edad: 25,
            planetaOrigen: 'Tierra',
            debilidad: 'Radioactiva',
            poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
            aliados: ['Ironman'],
            enemigos: ['Duende Verde']
        });

        const resultado = await hero.save();
        console.log('Superhéroe insertado:', resultado);
    } catch (error) {
        console.error('Error al insertar superhéroe:', error);
    }
}

// Método 2: Actualizar un Documento
async function updateSuperHero(nombreSuperHeroe) {
    try {
        const resultado = await SuperHero.updateOne(
            { nombreSuperHeroe: nombreSuperHeroe },
            { $set: { edad: 26 } }
        );
        console.log('Resultado de la actualización:', resultado);
    } catch (error) {
        console.error('Error al actualizar superhéroe:', error);
    }
}

// Método 3: Eliminar un Documento
async function deleteSuperHero(nombreSuperHeroe) {
    try {
        const resultado = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
        console.log('Superhéroe eliminado:', resultado);
    } catch (error) {
        console.error('Error al eliminar superhéroe:', error);
    }
}

// Método 4: Buscar Documentos
async function findSuperHeroes() {
    try {
        const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
        console.log('Superhéroes encontrados:', heroes);
    } catch (error) {
        console.error('Error al buscar superhéroes:', error);
    }
}

// Ejecutar las Operaciones CRUD
async function ejecutarCRUD() {
    await insertSuperHero();
    await updateSuperHero('Spiderman');
    await findSuperHeroes();
    await deleteSuperHero('Spiderman');

    // Cerrar la conexión después de las operaciones
    mongoose.connection.close();
}

ejecutarCRUD();
