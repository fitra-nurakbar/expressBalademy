const db = require("../config/db");
const User = require("../models/user");
const axios = require("axios").default;

db.authenticate().then(() => console.log("Database berhasil terkoneksi"));

module.exports = {
  index: async (req, res) => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      const data = response.data;
      const pokemon = data.results;
  
      res.render("index", { data, pokemon });
    } catch (error) {
      console.log(error);
    }
  },
  about: async (req, res) => {
    try {
      const response = await axios.get("http://localhost:3001/user");
      const users = response.data;
  
      res.render("about", { users });
    } catch (error) {
      console.log(error);
    }
  },
  create: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const newUser = new User({
        username,
        email,
        password,
      });

      await newUser.save();

      res.json(newUser);
    } catch (err) {
      res.status(500).send("server error");
      console.error(err.message);
    }
  },
  showAll: async (req, res) => {
    try {
      const getAllUser = await User.findAll();

      res.json(getAllUser);
    } catch (err) {
      res.status(500).send("server error");
      console.error(err.message);
    }
  },
  showId: async (req, res) => {
    try {
      const id = req.params.id;

      const getUser = await User.findOne({
        where: { id: id },
      });

      res.json(getUser);
    } catch (err) {
      res.status(500).send("server error");
      console.error(err.message);
    }
  },
  update: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const id = req.params.id;

      const updateUser = await User.update(
        {
          username,
          email,
          password,
        },
        { where: { id: id } }
      );

      await updateUser;

      res.json("Data berhasil di update");
    } catch (err) {
      res.status(500).send("server error");
      console.error(err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const deleteUser = await User.destroy({
        where: { id: id },
      });

      await deleteUser;

      res.json("Data berhasil di hapus");
    } catch (err) {
      res.status(500).send("server error");
      console.error(err.message);
    }
  },
};
