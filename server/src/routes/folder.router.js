const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { Folder, Article } = require('../../db/models');

const folderRouter = new Router();

module.exports = folderRouter
  .get('/all', async (req, res) => {
    try {
      if (!req?.session?.user?.id) {
        res.status(400).json({ type: 'Проблема авторизации' });
      }

      const allMyFolders = await Folder.findAll({
        where: { userId: req.session.user.id },
        order: [['id', 'DESC']],
      });

      res.status(200).json(allMyFolders);
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
    } else if (!req?.session?.user?.id) {
      res.status(400).json({ type: 'Не авторизованное создание папки' });
    } else {
      try {
        await Folder.create({
          title: req.body.title,
          userId: req?.session?.user?.id,
          isPublic: false,
        });
        res.sendStatus(200);
      } catch (err) {
        res.status(400).json({ type: 'Что-то пошло не так' });
      }
    }
  })

  .get('/:id/articles', async (req, res) => {
    const folderId = req.params.id;
    console.log(folderId);

    try {
      if (!req?.session?.user?.id) {
        res.status(400).json({ type: 'Проблема авторизации ' });
      }

      if (folderId === 'all') {
        const myArticles = await Article.findAll({
          where: { userId: req.session.user.id },
          order: [['id', 'ASC']],
        });
        res.status(200).json(myArticles);
      } else if (folderId === 'no') {
        const myArticles = await Article.findAll({
          where: { userId: req.session.user.id, folderId: null },
          order: [['id', 'ASC']],
        });
        res.status(200).json(myArticles);
      } else {
        const myArticles = await Article.findAll({
          where: { userId: req.session.user.id, folderId: Number(folderId) },
          order: [['id', 'ASC']],
        });

        res.status(200).json(myArticles);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  });
