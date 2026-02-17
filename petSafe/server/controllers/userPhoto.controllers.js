import { pool } from "../db.js";

const getAllUserPhotos = async (req, res) => {

    try {
        const [results] = await pool.query('SELECT * FROM UserPhoto');
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching UserPhotos' })
    }   
}

const getAllUserPhotosByIdUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM UserPhoto WHERE idUser = ?', [idUser]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'User Photos not found for the specified User ID' })
        }
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching User Photos for the specified User ID' })
    }
}

const getPhotoByIdUserPhoto = async (req, res) => {
    const { idUserPhoto } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM UserPhoto WHERE idUserPhoto = ?', [idUserPhoto]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'User Photo not found' })
        }
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching User Photo' })
    }
}

const createUserPhoto = async (req, res) => {
    const { idUser, title, URL_UserPhoto } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO UserPhoto (idUser, title, URL_UserPhoto) VALUES (?, ?, ?)', [idUser, title, URL_UserPhoto]);
        res.status(201).json({ id: result.insertId, idUser, title, URL_UserPhoto })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating User Photo' })
    }
}

const updateUserPhoto = async (req, res) => {
    const { idUserPhoto } = req.params;
    const { idUser, title, URL_UserPhoto } = req.body;
    try {
        await pool.query('UPDATE UserPhoto SET idUser = ?, title = ?, URL_UserPhoto = ? WHERE idUserPhoto = ?', [idUser, title, URL_UserPhoto, idUserPhoto]);
        res.json({ message: `User Photo with ID ${idUserPhoto} updated` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating User Photo' })
    }
}

const deleteUserPhoto = async (req, res) => {
    const { idUserPhoto } = req.params;
    try {
        await pool.query('DELETE FROM UserPhoto WHERE idUserPhoto = ?', [idUserPhoto]);
        res.json({ message: `User Photo with ID ${idUserPhoto} deleted` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting User Photo' })
    }
}

export { getAllUserPhotos, getAllUserPhotosByIdUser, getPhotoByIdUserPhoto, createUserPhoto, updateUserPhoto, deleteUserPhoto };