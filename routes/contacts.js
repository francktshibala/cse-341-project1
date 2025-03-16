const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').findOne({ _id: userId });
    
    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Create a new contact
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const contact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };
    
    const result = await mongodb.getDb().collection('contacts').insertOne(contact);
    res.status(201).json({ 
      id: result.insertedId,
      message: 'Contact created successfully' 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update a contact
router.put('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const userId = new ObjectId(req.params.id);
    
    // Validate required fields
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    };
    
    const result = await mongodb.getDb().collection('contacts')
      .updateOne({ _id: userId }, { $set: updatedContact });
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Changed from 204 to 200 to include a message
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: userId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;