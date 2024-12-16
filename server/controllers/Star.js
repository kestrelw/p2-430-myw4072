const models = require('../models');

const { Star } = models;

const makeStar = async (req, res) => {
  // if (!req.body.name || !req.body.age/* || !req.body.rarity */) {
  //   return res.status(400).json({ error: 'Both name and age are required!' });
  // }

  const starData = {
    // name: req.body.name,
    // age: req.body.age,
    rarity: req.body.rarity/* ||Math.floor(Math.random() * 5 + 1) */,
    owner: req.session.account._id,
  };

  console.log(starData);

  try {
    const newStar = new Star(starData);
    await newStar.save();
    // req.session.star = Star.toAPI(newStar);
    return res.status(201).json({ rarity: newStar.rarity });
  } catch (err) {
    console.log(err);
    // if (err.code === 11000) {
    //   return res.status(400).json({ error: 'Star already exists!' });
    // }
    return res.status(500).json({ error: 'An error occured making star!' });
  }
};//

const starPage = (req, res) => res.render('app');

const getStars = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Star.find(query).select('rarity createdDate').lean().exec();

    return res.json({ stars: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving stars!' });
  }
};

const getLogin = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Star.find(query).select('username password').lean().exec();

    return res.json({ accounts: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving login!' });
  }
};

const historyPage = (req, res) => res.render('app');

const inventoryPage = (req, res) => res.render('app');

const profilePage = (req, res) => res.render('app');

const changePasswordPage = (req, res) => res.render('app');

const changePassword = (req, res) => res.render('app');

module.exports = {
  starPage,
  makeStar,
  getStars,
  getLogin,
  historyPage,
  inventoryPage,
  profilePage,
  changePasswordPage,
  changePassword,
};
