import { pool } from '../db.js';

const getAllServices = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Service');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching services' });
    }
};

const getServiceById = async (req, res) => {
    const { idService } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM Service WHERE idService = ?', [idService]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching service' });
    }
};

const getServicesByIdUserCarer = async (req, res) => {
    const { idUserCarer } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM Service WHERE idUserCarer = ?', [idUserCarer]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Services not found for the specified user ID' });
        }
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching services by user ID' });
    }
};

const createService = async (req, res) => {
    const { idUserCarer, startDate, endDate, idUserCreator, published } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO Service (idUserCarer, startDate, endDate, idUserCreator, published) VALUES (?, ?, ?, ?, ?)', [idUserCarer, startDate, endDate, idUserCreator, published]);
        res.status(201).json({ id: result.insertId, idUserCarer, startDate, endDate, idUserCreator, published });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating service' });
    }
};

const updateService = async (req, res) => {
    const { idService } = req.params;
    const { idUserCarer, startDate, endDate, published } = req.body;
    try {
        await pool.query('UPDATE Service SET idUserCarer = ?, startDate = ?, endDate = ?, published = ? WHERE idService = ?', [idUserCarer, startDate, endDate, published, idService]);
        res.json({ message: `Service with ID ${idService} updated` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating service' });
    }
};

const lowPublishService = async (req, res) => {
    const { idService } = req.params;
    try {
        await pool.query('UPDATE Service SET published = 0 WHERE idService = ?', [idService]);
        res.json({ message: `Service with ID ${idService} unpublished` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error unpublishing service' });
    }
};

const deleteService = async (req, res) => {
    const { idService } = req.params;
    try {
        await pool.query('DELETE FROM Service WHERE idService = ?', [idService]);
        res.json({ message: `Service with ID ${idService} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting service' });
    }
};

export { getAllServices, getServiceById, getServicesByIdUserCarer, createService, updateService, lowPublishService, deleteService };