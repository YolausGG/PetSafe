import { pool } from '../db.js';

const getAllAddresses = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM Address');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching addresses' });
    }
};

const getAddressByIdUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        const [results] = await pool.query('SELECT * FROM Address Where idUser = ?', [idUser])
        if (results.length === 0) {
            return res.status(404).json({ error: 'Address not found for the specified user ID' });
        }
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching address by user ID' });
    }
};

const createAddress = async (req, res) => {
    const { idUser, street, department, city, houseNumber, apartmentNumber, reference, zipCode } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO Address (idUser, street, department, city, houseNumber, apartmentNumber, reference, zipCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [idUser, street, department, city, houseNumber, apartmentNumber, reference, zipCode]);
        res.status(201).json({ id: result.insertId, idUser, street, department, city, houseNumber, apartmentNumber, reference, zipCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating address' });
    }
};

const updateAddress = async (req, res) => {
    const { idAddress } = req.params;
    const { idUser, street, department, city, houseNumber, apartmentNumber, reference, zipCode } = req.body;

    try {
        await pool.query('UPDATE Address SET idUser = ?, street = ?, department = ?, city = ?, houseNumber = ?, apartmentNumber = ?, reference = ?, zipCode = ? WHERE idAddress = ?', [idUser, street, department, city, houseNumber, apartmentNumber, reference, zipCode, idAddress]);
        res.json({ message: `Address with ID ${idAddress} updated` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating address' });
    }
};

const deleteAddress = async (req, res) => {
    const { idAddress } = req.params;
    try {        await pool.query('DELETE FROM Address WHERE idAddress = ?', [idAddress]);
        res.json({ message: `Address with ID ${idAddress} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting address' });
    }
};

export { getAllAddresses, getAddressByIdUser, createAddress, updateAddress, deleteAddress };