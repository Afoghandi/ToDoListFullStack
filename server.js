import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoute from './routes/auth.js';
import todosRoute from './routes/todos.js';

dotenv.config();
const app = express();

//connect Database

connectDB();

//import routes
//import { authRoute } from './routes/auth.js';
//import { toDosRoute } from './routes/todos.js';
//const authRoute = require('./routes/auth');
//const toDosRoute = require('./routes/todos');

//init middleware
app.use(express.json({ extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('To do list full stack');
});

app.use('/api', authRoute);
app.use('/api/auth', authRoute);
app.use('/api/todos', todosRoute);

//app.use('/api/auth', authRoute);
//app.use('/api/toDos', toDosRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
