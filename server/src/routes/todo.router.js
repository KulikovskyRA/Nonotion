const { Router } = require('express');

const { body, validationResult } = require('express-validator');

const { Todo } = require('../../db/models');

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
        order: [['id', 'DESC']],
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
      } else if (!req?.session?.user?.id) {
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
  )

  .patch('/', body('id').isNumeric().notEmpty(), async (req, res) => {
    ///! Проверка на ошибки валидации
    const { errors } = validationResult(req);
    if (errors.length) {
      res.status(400).json({ type: 'Проблема валидации данных' });
    }
    try {
      const todo = await Todo.findByPk(req.body.id);
      if (todo.userId !== req.session.user.id) {
        res.status(400).json({ type: 'Не авторизованное изменение' });
      }
      todo.isDone = !todo.isDone;
      todo.save();
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(404);
    }
  })

  .patch(
    '/inner',
    body('id').isNumeric().notEmpty(),
    body('inner').isString().notEmpty(),
    async (req, res) => {
      ///! Проверка на ошибки валидации
      const { errors } = validationResult(req);
      if (errors.length) {
        res.status(400).json({ type: 'Проблема валидации данных' });
      }
      try {
        const todo = await Todo.findByPk(req.body.id);
        if (todo.userId !== req.session.user.id) {
          res.status(400).json({ type: 'Не авторизованное изменение' });
        }
        todo.inner = req.body.inner;
        todo.save();
        res.sendStatus(200);
      } catch (err) {
        res.sendStatus(404);
      }
    }
  )

  .delete('/', body('id').isNumeric().notEmpty(), async (req, res) => {
    ///! Проверка на ошибки валидации
    const { errors } = validationResult(req);
    if (errors.length) {
      res.status(400).json({ type: 'Проблема валидации данных' });
    }
    if (!req.session.user.id) {
      res.status(400).json({ type: 'Не авторизованное удаление' });
    }
    try {
      Todo.destroy({ where: { id: req.body.id } });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(404);
    }
  });
