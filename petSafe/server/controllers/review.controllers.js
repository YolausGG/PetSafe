import { pool } from "../db.js";

const getAllReviews = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Review');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching reviews' });
    }
};

const getReviewsByIdService = async (req, res) => { 
    const { idService } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM Review WHERE idService = ?', [idService]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Reviews not found for the specified service ID' });
        }   
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching reviews by service ID' });
    }
};

const createReview = async (req, res) => {
    const { idService, idUser, classification, comment } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO Review (idService, idUser, classification, comment) VALUES (?, ?, ?, ?)', [idService, idUser, classification, comment]);
        res.status(201).json({ id: result.insertId, idService, idUser, classification, comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating review' });
    }
};

const updateReview = async (req, res) => {
    const { idReview } = req.params;
    const { idService, idUser, classification, comment } = req.body;
    try {
        await pool.query('UPDATE Review SET idService = ?, idUser = ?, classification = ?, comment = ? WHERE idReview = ?', [idService, idUser, classification, comment, idReview]);
        res.json({ message: `Review with ID ${idReview} updated` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating review' });
    }
};

const deleteReview = async (req, res) => {
    const { idReview } = req.params;    
    try {
        await pool.query('DELETE FROM Review WHERE idReview = ?', [idReview]);
        res.json({ message: `Review with ID ${idReview} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting review' });
    }
};

export { getAllReviews, getReviewsByIdService, createReview, updateReview, deleteReview };