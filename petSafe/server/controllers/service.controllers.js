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

const getServicesPublished = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Service WHERE published = 1');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching published services' });
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
    const { idUserCarer, startDate, endDate, description, idUserCreator, published } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO Service (idUserCarer, startDate, endDate, description, idUserCreator, published) VALUES (?, ?, ?, ?, ?, ?)', [idUserCarer, startDate, endDate, description, idUserCreator, published]);
        res.status(201).json({ id: result.insertId, idUserCarer, startDate, endDate, description, idUserCreator, published });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating service' });
    }
};

const addCarerToService = async (req, res) => {
    const { idService } = req.params;
    const { idUserCarer } = req.body;
    try {
        await pool.query('UPDATE Service SET idUserCarer = ? WHERE idService = ?', [idUserCarer, idService]);
        res.json({ message: `Carer added to service with ID ${idService}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding carer to service' });
    }
};

const updateService = async (req, res) => {
    const { idService } = req.params;
    const { idUserCarer, startDate, endDate, description, published } = req.body;
    try {
        await pool.query('UPDATE Service SET idUserCarer = ?, startDate = ?, endDate = ?, description = ?, published = ? WHERE idService = ?', [idUserCarer, startDate, endDate, description, published, idService]);
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

export { getAllServices, getServicesPublished, getServiceById, getServicesByIdUserCarer, createService, addCarerToService, updateService, lowPublishService, deleteService };