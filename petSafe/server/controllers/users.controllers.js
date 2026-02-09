import { pool } from '../db.js';

const getAllUsers = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM User WHERE lowLogic = 0');
    res.json(results);


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }

};

const getUserById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM User WHERE idUser = ? AND lowLogic = 0', [idUser]);
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
  const { idUser } = req.params;
  const { mail, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto } = req.body;
  try {
    await pool.query('UPDATE User SET mail = ?, name = ?, lastName = ?, birthdate = ?, phoneNumber = ?, URL_PerfilePhoto = ? WHERE idUser = ?', [mail, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto, idUser]);
    res.json({ message: `User with ID ${idUser} updated` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' });
  }

};

const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    await pool.query('DELETE FROM User WHERE idUser = ?', [idUser]);
    res.json({ message: `User with ID ${idUser} deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

const lowLogicUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    await pool.query('UPDATE User SET lowLogic = 1 WHERE idUser = ?', [idUser]);
    res.json({ message: `User with ID ${idUser} logically deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logically deleting user' });
  }
};

const upLogicUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    await pool.query('UPDATE User SET lowLogic = 0 WHERE idUser = ?', [idUser]);
    res.json({ message: `User with ID ${idUser} logically restored` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logically restoring user' });
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser, lowLogicUser, upLogicUser };