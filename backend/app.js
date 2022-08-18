require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const { validateUser, validateLogin } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { mongoDbServer, port } = require('./utils/config');

const { PORT = port, MONGO_DB_SERVER = mongoDbServer } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(require('./middlewares/cors'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(
  MONGO_DB_SERVER,
  { useNewUrlParser: true },
);

app.use(requestLogger); // подключаем логгер ошибок

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(() => {
  throw new NotFoundError('Путь не найден');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(require('./middlewares/errors'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
