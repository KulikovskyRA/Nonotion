require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const authRouter = require('./src/routes/auth.router');
const todoRouter = require('./src/routes/todo.router');
const folderRouter = require('./src/routes/folder.router');

const { PORT, CORS_URL, SECRET_KEY_SESSION } = process.env;

const sessionConfig = {
  name: 'nonotion-cookie',
  store: new FileStore(),
  secret: SECRET_KEY_SESSION ?? 'Секретное слово',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 999999999,
    httpOnly: true,
  },
};

const app = express();

app.use(morgan('dev'));
app.use(session(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: [CORS_URL] })); //!

//! Routes

app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);
app.use('/api/folder', folderRouter);

app.listen(PORT, () => {
  console.log('Сервер работает!');
  console.log('➜ ', `http://localhost:${PORT}/`);
});
