import { pool } from '../db.js';

const getAllPets = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Pet');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching pets' });
    }
};

const getPetsByIdUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM Pet WHERE idUser = ?', [idUser]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Pets not found for the specified user ID' });
        }
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching pets by user ID' });
    }
};

const getPetById = async (req, res) => {
    const { idPet } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM Pet WHERE idPet = ?', [idPet]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Pet not found' });
        }
        res.json(results[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching pet' });
    }
};

const createPet = async (req, res) => {
    const { idUser, name, type, breed, size, birthdate, description } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO Pet (idUser, name, type, breed,  size, birthdate, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [idUser, name, type, breed, size, birthdate, description]);
        res.status(201).json({ id: result.insertId, idUser, name, type, breed, size, birthdate, description });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating pet' });
    }
};

const updatePet = async (req, res) => {
    const { idPet } = req.params;
    const { idUser, name, type, breed, size, birthdate, description } = req.body;
    try {
        await pool.query('UPDATE Pet SET idUser = ?, name = ?, type = ?, breed = ?, size = ?, birthdate = ?, description = ? WHERE idPet = ?', [idUser, name, type, breed, size, birthdate, description, idPet]);
        res.json({ message: `Pet with ID ${idPet} updated` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating pet' });
    }
};

const deletePet = async (req, res) => {
    const { idPet } = req.params;
    try {
        await pool.query('DELETE FROM Pet WHERE idPet = ?', [idPet]);
        res.json({ message: `Pet with ID ${idPet} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting pet' });
    }
};

export { getAllPets, getPetsByIdUser, getPetById, createPet, updatePet, deletePet };

