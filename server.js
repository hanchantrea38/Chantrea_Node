
import express from 'express'
import {db} from './database.js'
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World')
})


// list
// app.get('/users', (req, res) => {
//   res.send(users);
// })

app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create
// app.post('/users', (req, res) => {
//   const user = {
//     id: Date.now(),
//     name: req.body.name
//   }
//   users.push(user);
//   res.status(201).send(user)
// })

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

// update
// app.put('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   let user = users.find(u => u.id === id);
//   if(!user) {
//     return res.status(404).send({ error: 'User not found' })
//   }
//   user.name = req.body.name
//   res.send(user)
// })

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


// delete
// app.delete('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = users.findIndex(u => u.id === id);
//   // console.log(index);
//   if(index === -1) {
//     return res.status(404).send({ error: 'User not found' })
//   }
//   users.splice(index, 1);
//   res.json({ message: 'User deleted successfully' })
// })

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
