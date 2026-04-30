
import express from 'express'
import {db} from './database.js'
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World')
})


app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const [result] = await db.execute(
      'INSERT INTO users (name) VALUES (?)',
      [name]
    );

    res.status(201).json({
      id: result.insertId,
      name
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/users/:id', async (req, res) => {
  try {
    const { name } = req.body;

    const [result] = await db.execute(
      'UPDATE users SET name = ? WHERE id = ?',
      [name, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ id: req.params.id, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const [result] = await db.execute(
      'DELETE FROM users WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
