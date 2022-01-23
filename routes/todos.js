import express from 'express';
import requiresAuth from '../middleware/permissions.js';
import {
	test,
	newToDos,
	current,
	todoComplete,
	todoIncomplete,
	updateTodo,
	deleteTodo,
} from '../controllers/todos.js';

const router = express.Router();

//@route GET /api/todos/test

router.get('/test', test);

//@route GET /api/todos/new

router.post('/new', requiresAuth, newToDos);

//@route GET /api/todos/current

router.get('/current', requiresAuth, current);

//@route PUT /api/todos/:toDoId/complete

router.put('/:toDoId/complete', requiresAuth, todoComplete);

//@route PUT /api/todos/:toDoId/incomplete

router.put('/:toDoId/incomplete', requiresAuth, todoIncomplete);

//@route UPDATE /api/todos/:toDoId

router.put('/:toDoId', requiresAuth, updateTodo);

//@route DELETE /api/todos/:toDoId

router.delete('/:toDoId', requiresAuth, deleteTodo);

export default router;
