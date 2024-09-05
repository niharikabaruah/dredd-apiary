const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(express.json({ type: 'application/json; charset=utf-8' }));

// In-memory database
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]; // Example users for initial data

// Simulate a bad request
app.get('/api/v1/bad-request', (req, res) => {
  res.status(400).json({ error: 'Invalid request parameters' });
});

// Simulate a server error
app.get('/api/v1/server-error', (req, res) => {
  res.status(500).json({ error: 'Internal server error' });
});

// Get users
app.get('/api/v1/users', (req, res) => {
  res.status(200).json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ]);
});




//POST
// Create a new user
app.post('/api/v1/users', (req, res) => {
  const { name } = req.body;
  // Validate request body
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required and should be a string' });
    }
  const newUser = { id: 3, name: name };
  res.status(201).json(newUser);
});



//PUT
// Update user by ID (just a placeholder, not fully implemented)
app.put('/api/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name } = req.body;
  if (!name) {
    return res.status(404).json({ error: 'User Not Found' });
  }
  const updatedUser = { id: userId, name };
  res.status(200).json(updatedUser);
});




// DELETE endpoint to delete a user by ID
app.delete('/api/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  // Example validation to trigger 404 if user is not found
  if (userId !== 1) { // Simulate that only user with ID 1 exists
    res.status(404).json({ error: 'User not found' });
  } else {
    // Simulate successful deletion
    res.status(200).json({ message: 'User deleted' }); // Actually, 204 should not have a body
  }
});


// Get user details by ID - Error case: Return only 4 fields instead of 5
app.get('/api/v1/users/details/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  // Mocked user data (missing 'address' field to cause the error case)
  const user = {
    id: userId,
    name: 'Niharika Baruah',
    email: 'niharikabaruah@example.com',
    age: 30
    // 'address' field is intentionally omitted to cause the Dredd test to fail
  };

  if (userId === 1) {
    // Intentionally send incomplete data to cause test failure
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
