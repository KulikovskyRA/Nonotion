const { Router } = require('express');
const bcrypt = require('bcrypt');

const { body, validationResult } = require('express-validator');

const { User } = require('../../db/models');

const authRouter = new Router();

module.exports = authRouter
  .post(
    '/new',
    //! username
    body('name').isString().notEmpty(),
    //! пароль дб больше 5 знаков
    body('password').isString().isLength({ min: 5, max: 15 }),
    async (req, res) => {
      //! Проверка на ошибки валидации
      const { errors } = validationResult(req);
      if (errors.length) {
        res
          .status(400)
          .json({ type: 'Ошибка валидации введённых параметров', errors });
      } else {
        const { name, password } = req.body;
        //! Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);
        //! Создаём запись в БД
        try {
          // Проверка на наличие аккаунта с таким же username
          const userCheck = await User.findOne({ where: { name }, raw: true });

          //   console.log(userCheck);

          if (!userCheck) {
            const response = await User.create({
              name,
              password: hashedPassword,
            });

            const userSessionData = { id: response.id, name: response.name };

            req.session.user = userSessionData;

            res.status(200).json({ user: userSessionData });
          } else {
            res
              .status(406)
              .json({ type: 'Юзер с данным именем уже существует' });
          }
        } catch (err) {
          res.status(400).json({ type: 'Что-то пошло не так' });
        }
      }
    }
  )

  .post(
    '/login',
    //! username
    body('name').isString().notEmpty(),
    //! пароль дб больше 5 знаков
    body('password').isString().isLength({ min: 5, max: 15 }),
    async (req, res) => {
      //! Проверка на ошибки валидации
      const { errors } = validationResult(req);
      if (errors.length) {
        res
          .status(400)
          .json({ type: 'Ошибка валидации введённых параметров', errors });
      } else {
        const { name, password } = req.body;
        try {
          const userCheck = await User.findOne({ where: { name }, raw: true });
          if (!userCheck) {
            return res.status(403).json({ type: 'Введен неверный логин' });
          }

          const isPasswordValid = await bcrypt.compare(
            password,
            userCheck.password
          );

          if (!isPasswordValid) {
            res.status(400).json({ type: 'Введен неверный пароль' });
          } else {
            const userSessionData = { id: userCheck.id, name: userCheck.name };
            req.session.user = userSessionData;
            res.status(200).json({ user: userSessionData });
          }
        } catch (err) {
          res.status(400).json({ type: 'Что-то пошло не так' });
        }
      }
    }
  )

  .get('/logout', async (req, res) => {
    try {
      req.session.destroy(() => {
        res.clearCookie('nonotion-cookie');
        res.json({ status: 'ok' });
      });
    } catch (error) {
      res.sendStatus(400);
    }
  })

  // Проверка авторизованности по сессиям
  .get('/', async (req, res) => {
    try {
      if (req.session.user) {
        res.json({
          user: req.session.user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
