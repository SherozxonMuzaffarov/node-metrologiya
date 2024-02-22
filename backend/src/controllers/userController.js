require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Depo } = require('../../models');

module.exports = {
  register: async (req, res) => {
    try {
      const { name, phone_number, password } = req.body;
      const existingUser = await User.findOne({ where: { phone_number } });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ name, phone_number, password: hashedPassword });

      // Generate JWT token
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {expiresIn: "36h"});

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      const { phone_number, password } = req.body;

      // console.log("phone_number: " +phone_number);

      // Find user by phone_number
      const user = await User.findOne({ where: { phone_number } });

      if (!user) {
        return res.status(400).json({ message: 'Invalid phone_number or password.' });
      }

      // Compare passwords
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid phone_number or password.' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAll: async (req, res) => {
    try {
      let model = await User.findAll({
        include: [
          {
            model: Depo,
            as: 'depo',
            attributes: ['id', 'name']
          }
        ]
      });
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getOne: async (req, res) => {
    try {
      let model = await User.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!model) {
        res.status(404).json({
          message: `${req.params.id} id record not found`,
        });
      }
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  identifyUser: async (req, res) => {
    try {
      let model = await User.findOne({ 
        where: {
          id: req.user.id,
        }
      });

      if (!model) {
        res.status(404).json({
          message: `${req.params.id} id record not found`,
        });
      }
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getUserId: async (req, res) => {
    try {
      let model = await User.findOne({
        include: [
          {
            model: Depo,
            as: 'depo'
          }
        ],
        where: {
          id: req.user.id,
        },
        attributes: ['id', 'name', 'phone_number', 'depo_id', 'role']
      });

      if (!model) {
        res.status(404).json({
          message: `${req.params.id} id record not found`,
        });
      }
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  create: async (req, res) => {
    try {
      let { name, phone_number, password, depo_id, role } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const model = await User.create({ name, phone_number, password: hashedPassword, depo_id, role });

      res.json(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error'})
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { name, phone_number, password, depo_id, role } = req.body

      const [ updatedRow ] = await User.update(
        { name, phone_number, password, depo_id, role },
        {
            where: { id }
        }
      );

      if (updatedRow === 0) {
        return res.status(400).json({ meesgae: 'User not found'})
      }

      const updatedModel = await User.findOne({ where: {id}});
      res.send(updatedModel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error'})
    }
  },

  delete: async(req, res) => {
    try {
      const { id } = req.params;

      const deletedRowCount = await User.destroy({ where: { id: req.params.id}});

      if (deletedRowCount === 0) {
          return res.status(404).json({ message: 'User not found'})
      }

      res.json(deletedRowCount)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error'});
    }
  }
};
