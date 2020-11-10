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
  let { title, technologies, budget, description, contact_email } = req.body;

  // Insert into table
  try {
    let gig = await Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email,
    });
    res.send(gig);
  } catch (error) {
    res.send(error);
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term;

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then((gigs) => res.send(gigs))
    .catch((err) => res.send(err));
});

router.put('/:id', async (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  try {
    let gig = await Gig.findByPk(req.params.id);
    gig.update({
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
    res.send(gig);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
