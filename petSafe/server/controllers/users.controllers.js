import { pool } from '../db.js';

const getAllUsers = async (req, res) => {

  try {
    const [results] = await pool.query('SELECT * FROM User');
    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }

};

const getUserById = async (req, res) => {

  try {
    const [results] = await pool.query('SELECT * FROM User WHERE idUser = ?', [req.params.id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

const createUser = async (req, res) => {

  const { mail, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto } = req.body;
    try {
    const [result] = await pool.query('INSERT INTO User (mail, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto) VALUES (?, ?, ?, ?, ?, ?)', [mail, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto]);
    res.status(201).json({ id: result.insertId, mail, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

const updateUser = async (req, res) => {

  const { id } = req.params;
  const { mail, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto } = req.body;
  try {
    await pool.query('UPDATE User SET mail = ?, name = ?, lastName = ?, birthdate = ?, phoneNumber = ?, URL_PerfilePhoto = ? WHERE idUser = ?', [mail, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto, id]);
    res.json({ message: `User with ID ${id} updated` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' });
  }

};
const lowLogicUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE User SET lowLogic = 1 WHERE idUser = ?', [id]);
    res.json({ message: `User with ID ${id} logically deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logically deleting user' });
  }
};

export { getAllUsers, getUserById, createUser, updateUser, lowLogicUser };