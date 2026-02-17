import { pool } from "../db.js";

const getAllPetPhotos = async (req, res) => {

    try {
        const [results] = await pool.query('SELECT * FROM PetPhoto');
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching PetPhotos' })
    }
}

const getAllPetPhotosByIdPet = async (req, res) => {
    const { idPet } = req.params;

    try {
        const [results] = await pool.query('SELECT * FROM PetPhoto WHERE idPet = ?', [idPet]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Pet Photos not found for the specified Pet ID' })
        }
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching Pet Photos' })
    }
}

const PetPhotoByIdPetPhoto = async (req, res) => {
    const { idPetPhoto } = req.params;

    try {
        const [results] = await pool.query('SELECT * FROM PetPhoto WHERE idPetPhoto = ?', [idPetPhoto]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Pet Photo not found' })
        }
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500), json({ error: 'Error fetchin Pet Photo' })
    }
}

const createPetPhoto = async (req, res) => {
    const { idPet, title, URL_PetPhoto } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO PetPhoto (idPet, title, URL_PetPhoto) VALUES (?, ?, ?)', [idPet, title, URL_PetPhoto]);
        res.status(201).json({ id: result.insertId, idPet, title, URL_PetPhoto })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating Pet Photo' })
    }
}

const updatePetPhoto = async (req, res) => {
    const { idPetPhoto } = req.params;
    const { idPet, title, URL_PetPhoto } = req.body;

    try {
        const [result] = await pool.query('UPDATE PetPhoto SET idPet = ?, title = ?, URL_PetPhoto = ? WHERE idPetPhoto = ?', [idPet, title, URL_PetPhoto, idPetPhoto]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pet Photo not found' })
        }
        res.json({ message: 'Pet Photo updated successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating Pet Photo' })
    }
}

const deletePetPhoto = async (req, res) => {
    const { idPetPhoto } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM PetPhoto WHERE idPetPhoto = ?', [idPetPhoto]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Pet Photo not found' })
        }
        res.json({ message: 'Pet Photo deleted successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting Pet Photo' })
    }
}

export { getAllPetPhotos, getAllPetPhotosByIdPet, PetPhotoByIdPetPhoto, createPetPhoto, updatePetPhoto, deletePetPhoto }