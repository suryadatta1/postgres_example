const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get user list
router.get('/', async (req, res) => {
  try {
    let users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

// Add a user
router.post('/add', async (req, res) => {
  let { name, email, userGroup } = req.body;

  // Insert into table
  try {
    let user = await User.create({
      name,
      email,
      userGroup,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', async (req, res) => {
  let { name, email, userGroup } = req.body;
  try {
    let user = await User.findByPk(req.params.id);
    user.update({
      name,
      email,
      userGroup,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.get('/:id', async (req, res) => {
  // var id = req.params.id;
  try {
    let userId = await User.findByPk(req.params.id);
    // console.log(userId.name)
    if (userId.userGroup == 'HR') {
      res.status(200).json('Hello, You can only view and modify pages');
    }
    if (userId.userGroup == 'Accountant') {
      res.status(200).json('Hello, You can  view, modify and delete the pages');
    }
    if (userId.userGroup == 'Engineer') {
      res.status(200).json('Hello, You can only view the pages');
    }
  } catch (error) {
    res.status(404).json('Error in finding user by ID', error);
  }
});

module.exports = router;
