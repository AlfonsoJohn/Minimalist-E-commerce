const express = require('express');
const path = require('path');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand, GetCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configure AWS SDK
const REGION = 'us-east-1'; // Update to your region
const ddbClient = new DynamoDBClient({ region: REGION });
const dynamoDB = DynamoDBDocumentClient.from(ddbClient);
const tableName = 'Items';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Add this route to handle the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Get all items
app.get('/items', async (req, res) => {
  const params = {
    TableName: tableName,
  };

  try {
    const data = await dynamoDB.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new item
app.post('/items', async (req, res) => {
  const { id, name } = req.body;
  const params = {
    TableName: tableName,
    Item: { id, name },
  };

  try {
    await dynamoDB.send(new PutCommand(params));
    res.json({ message: 'Item added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single item by ID
app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: tableName,
    Key: { id },
  };

  try {
    const data = await dynamoDB.send(new GetCommand(params));
    res.json(data.Item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an item by ID
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: tableName,
    Key: { id },
  };

  try {
    await dynamoDB.send(new DeleteCommand(params));
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Checkout endpoint
app.post('/checkout', async (req, res) => {
  const { cartItems } = req.body;

  try {
    const orderParams = {
      TableName: 'Orders',
      Item: {
        orderId: new Date().toISOString(),
        items: cartItems,
      },
    };
    await dynamoDB.send(new PutCommand(orderParams));
    res.json({ message: 'Checkout successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

