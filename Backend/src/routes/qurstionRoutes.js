const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const {  Create, getAllQuestion } = require('../controllers/questionController');

router.post('/', protect, Create);
router.get('/',getAllQuestion);
router.get('/:id',getOneQuestion);
router.put('/:id', protect, Update);
// ✅ Delete a question (Only Author can delete)
router.delete('/:id', protect, Delete);

module.exports = router;
