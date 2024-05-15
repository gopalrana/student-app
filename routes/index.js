const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Student API!');
});

router.get('/msg',(req,res)=>{
res.send("This is msg respo")
})

module.exports = router;

