const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { Folder } = require('../../db/models');

const folderRouter = new Router();

module.exports = folderRouter
  .get('/all', async (req, res) => {
    try {
      if (!req?.session?.user?.id) {
        res
          .status(400)
          .json({ type: 'Проблема авторизации при создании todo' });
      }

      const allMyFolders = await Folder.findAll({
        where: { userId: req.session.user.id },
        order: [['id', 'DESC']],
      });
      res.json(allMyFolders);
    } catch (error) {
      res.sendStatus(400);
    }
  })

  .post('/new', body('title').isString().notEmpty(), async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length) {
      res
        .status(400)
        .json({ type: 'Ошибка валидации введённых параметров', errors });
    }

    if (!req?.session?.user?.id) {
      res.status(400).json({ type: 'Не авторизованное создание папки' });
    }

    try {
      await Folder.create({
        title: req.body.title,
        userId: req?.session?.user?.id,
        isPublic: false,
      });
    } catch (err) {
      res.status(400).json({ type: 'Что-то пошло не так' });
    }
  });
