require('dotenv').config();
const express = require("express");
const initializeDatabase = require('./config/db')
const cors = require('cors')

const app = express();
app.use(cors({ origin: '*', methods: 'GET, PUT, PATCH, POST, DELETE' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json("HEllo wordl")
})

//Import and use routes
const authRoutes = require('./src/routes/authRoutes')
const depoRoutes = require('./src/routes/depoRoutes')
const regionRoutes = require('./src/routes/regionRoutes')
const userRoutes = require('./src/routes/userRoutes')


app.use('/auth', authRoutes)
app.use('/depo', depoRoutes)
app.use('/region', regionRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; font-src 'self' data:;"
  );
  next();
});

const PORT = process.env.PORT || 3000;
  
const startServer = async () => {

  await initializeDatabase()

  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start your server
startServer();