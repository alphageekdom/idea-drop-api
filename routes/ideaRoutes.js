import express from 'express';
const router = express.Router();
import Idea from '../models/Idea.js';
import mongoose from 'mongoose';

// @route GET       /api/ideas
// @description     Get all ideas
// @access          Public
router.get('/', async (req, res, next) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @route GET       /api/ideas
// @description     Get a single ideas
// @access          Public
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Idea Not Found');
    }

    const idea = await Idea.findById(id);

    if (!idea) {
      res.status(404);
      throw new Error('Idea Not Fount');
    }
    res.json(idea);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// @route POST      /api/ideas
// @description     Post an idea
// @access          Public
router.post('/', (req, res) => {
  const { title } = req.body;

  res.send(title);
});

export default router;
