// controllers/api/diaryController.js
const express = require('express');
const router = express.Router();
const Diary  = require('../../models/Diary');

// GET route for retrieving all diary entries
router.get('/', async (req, res) => {
  try {
    const diaryEntries = await Diary.findAll();
    res.status(200).redirect('/')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST route for adding a new diary entry
router.post('/', async (req, res) => {
  try {

    const newDiaryEntry = await Diary.create({ ...req.body, user_id: req.session.user_id });
    res.status(201).redirect('/diary')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id', async (req, res) => {
  try {
    console.log(req.body)
    const newDiaryEntry = await Diary.update(
      {
        content: req.body.content
      },
    {
      where:{
        id : req.params.id
      },
    }
    );
    console.log(newDiaryEntry)
   
    res.status(201).redirect('/diary')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE route for deleting a diary entry by ID
router.post('/delete/:id', async (req, res) => {
  try {
    const diaryEntry = await Diary.findByPk(req.params.id);
    if (!diaryEntry) {
      return res.status(404).json({ message: 'Diary entry not found' });
    }
    await diaryEntry.destroy();
    res.redirect('/diary')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
