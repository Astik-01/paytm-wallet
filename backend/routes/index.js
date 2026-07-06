const express = require('express');

const userRouter = require('./user');
const accountRouter = require('./account');
const router = express.Router();

// You can add a quick test route here just to make sure it's working
router.get('/', (req, res) => {
  res.send('API v1 is working!');
});

router.use('/user', userRouter);
router.use('/account', accountRouter);

// Export the router so it can be used in your main index.js file
module.exports = router;