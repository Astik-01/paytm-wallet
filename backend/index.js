const express = require("express");
const cors = require('cors'); 
const app = express();
const apiRouter = require('./routes/index');



app.use(express.json());
app.use(cors());
// Route all requests starting with /api/v1 to the apiRouter
app.use('/api/v1', apiRouter);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});