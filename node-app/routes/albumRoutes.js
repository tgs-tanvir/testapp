const express = require('express');
const router = express.Router();
const { saveData } = require('../controllers/albumController');

 
router.post('/store-data',saveData );   
 
module.exports = router;
