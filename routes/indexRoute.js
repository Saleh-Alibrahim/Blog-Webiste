const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const DatabaseManger = require('../DatabaseManger');
const _ = require('lodash');
const db = new DatabaseManger();

router.get('/', async (req, res) => {
  let posts = await db.getPosts();
  let data = await db.getData('home');
  res.render("home", { homeStartingContent: data.content, posts: posts });
});
router.get('/about', async (req, res) => {
  let data = await db.getData('about');
  res.render("about", { aboutContent: data.content });
});
router.get('/posts/:post', async (req, res) => {
  let id = req.params.post;
  let post = await db.getPostByID(id);
  if (post != null) {
    res.render("post", {
      title: post.title,
      content: post.content
    });
  }
  else { res.redirect('/'); }

});
router.get('/contact', async (req, res) => {
  let data = await db.getData('contact');
  res.render("contact", { contactContent: data.content });
});
router.get('/compose', (req, res) => {
  res.render("compose");
});
router.post('/compose', async (req, res) => {
  await db.addComposeItem(req.body.posttitle, req.body.postarea);
  res.redirect('/');
});

module.exports = router;

