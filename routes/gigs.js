const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
router.get('/', async (req, res) => {
  try {
    let gigs = await Gig.findAll();
    res.send(gigs);
  } catch (error) {
    res.send(error);
  }
});

// Add a gig
router.post('/add', async (req, res) => {
  let { name, email, userGroup } = req.body;

  // Insert into table
  try {
    let gig = await Gig.create({
      name,
      email,
      userGroup
    });
    res.send(gig);
  } catch (error) {
    res.send(error);
  }
});



router.put('/:id', async (req, res) => {
  let { name, email, userGroup } = req.body;
  try {
    let gig = await Gig.findByPk(req.params.id);
    gig.update({
      name,
      email,
      userGroup
    });
    res.send(gig);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
