import pool from '../database.js';

const getAllUsers = (req, res) => {

  pool.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching users' });
    }
    res.json(results);
  });
};

const getUserById = (req, res) => {
  pool.query('SELECT * FROM User WHERE idUser = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching user' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
};

const createUser = (req, res) => {
  const { mail, userPassword, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto } = req.body;
  pool.query('INSERT INTO users (mail, userPassword, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto ) VALUES (?, ?, ?, ?, ?, ?, ?)', [mail, userPassword, name, lastName, birthdate, phoneNumber, URL_PerfilePhoto], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error creating user' });
    }
    res.json({ message: `User created with ID ${results.insertId}` });
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({ message: `Update user with ID ${id} to name ${name} and email ${email}` });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Delete user with ID ${id}` });
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };