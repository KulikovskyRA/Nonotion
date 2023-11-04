require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');
const app = express();

const { PORT, CORS_URL } = process.env;
// const corsOptions = {
//   origin: [CORS_URL],
//   credentials: true,
// };

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log('Сервер крутится!');
  console.log('➜ ', `http://localhost:${PORT}/`);
});

// app.get('/', (req, res) => {
//   res.send('Привет, моряк!');
// });
