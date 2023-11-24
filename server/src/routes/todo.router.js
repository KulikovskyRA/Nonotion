const { Router } = require('express');

const { body, validationResult } = require('express-validator');

const { User, Todo } = require('../../db/models');

const todoRouter = new Router();

module.exports = todoRouter
  .get('/all', async (req, res) => {
    try {
      if (!req.session.user.id) {
        res
          .status(400)
          .json({ type: 'Проблема авторизации при создании todo' });
      }

      const allMyTodos = await Todo.findAll({
        where: { userId: req.session.user.id },
        order: [['id', 'ASC']],
        attributes: ['id', 'inner', 'updatedAt', 'createdAt', 'isDone'],
      });
      res.json(allMyTodos);
    } catch (error) {
      res.sendStatus(400);
    }
  })

  .post(
    '/new',
    //! Проверка на текст todo
    body('inner').isString().notEmpty(),
    async (req, res) => {
      ///! Проверка на ошибки валидации
      const { errors } = validationResult(req);
      if (errors.length) {
        res
          .status(400)
          .json({ type: 'Ошибка валидации введённых параметров', errors });
      } else if (!req.session.user.id) {
        res
          .status(400)
          .json({ type: 'Проблема авторизации при создании todo' });
      } else {
        const { inner } = req.body;

        try {
          await Todo.create({
            inner,
            userId: req.session.user.id,
            isDone: false,
          });

          res.sendStatus(200);
        } catch (err) {
          res.status(400).json({ type: 'Что-то пошло не так' });
        }
      }
    }
  );
