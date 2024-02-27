require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/users')
const myCache = require('../../utils/nodeCache')


module.exports = {
  register: async (req, res) => {
    try {
      const { name, phone_number, password } = req.body;
      const existingUser = await User.findOne({ phone_number });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({ name, phone_number, password: hashedPassword });

      // Generate JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '36h' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      const { phone_number, password } = req.body;

      // Find user by phone_number
      const user = await User.findOne({ phone_number });

      if (!user) {
        return res.status(400).json({ message: 'Invalid phone_number or password.' });
      }

      // Compare passwords
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid phone_number or password.' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      myCache.set('userData', user);
      
      res.json({ token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAll: async (req, res) => {
    try {
      let model = await User.find({}).populate('depo_id', 'name');
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getOne: async (req, res) => {
    try {
      let model = await User.findById(req.params.id);

      if (!model) {
        res.status(404).json({
          message: `${req.params.id} id record not found`,
        });
      }
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  identifyUser: async (req, res) => {
    try {
      let model = await User.findById(req.user.id);

      if (!model) {
        res.status(404).json({
          message: `${req.params.id} id record not found`,
        });
      }
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getUserId: async (req, res) => {
    try {
      let model = await User.findById(req.user.id).populate('depo', ['id', 'name']);

      if (!model) {
        res.status(404).json({
          message: `${req.params.id} id record not found`,
        });
      }
      res.send(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  create: async (req, res) => {
    try {
      let { name, phone_number, password, depo_id, role } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const model = await User.create({
        name,
        phone_number,
        password: hashedPassword,
        depo_id,
        role,
      });

      res.json(model);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, phone_number, password, depo_id, role } = req.body;

      const updatedModel = await User.findByIdAndUpdate(
        id,
        { name, phone_number, password, depo_id, role },
        { new: true }
      );

      if (!updatedModel) {
        return res.status(400).json({ message: 'User not found' });
      }

      res.send(updatedModel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRowCount = await User.findByIdAndDelete(id);

      if (!deletedRowCount) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(deletedRowCount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
