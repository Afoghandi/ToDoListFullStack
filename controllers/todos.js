import ToDo from '../models/ToDo.js';

import validateToDoInput from '../validation/toDoValidation.js';

//@desc  Test the todos route
//@access  Public

export const test = async (req, res) => {
	res.send('ToDos route working');
};

//@desc  Create a new todo
//@access  Private

export const newToDos = async (req, res) => {
	try {
		const { isValid, errors } = validateToDoInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		//create a new todo
		const newToDo = new ToDo({
			user: req.user._id,
			content: req.body.content,
			complete: false,
		});
		// save the new todo
		await newToDo.save();
		return res.json(newToDo);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
};

//@desc  Return Current users todos
//@access  Private

export const current = async (req, res) => {
	try {
		const completeToDos = await ToDo.find({
			user: req.user._id,
			complete: true,
		}).sort({ completedAt: -1 });
		const incompleteToDos = await ToDo.find({
			user: req.user._id,
			complete: false,
		}).sort({ createdAt: -1 });

		return res.json({ incomplete: incompleteToDos, complete: completeToDos });
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
};

//@desc  Mark a to do as complete
//@access  Private

export const todoComplete = async (req, res) => {
	try {
		const toDo = await ToDo.findOne({
			user: req.user._id,
			_id: req.params.toDoId,
		});

		if (!toDo) {
			return res.status(404).json({ error: ' Could not find ToDo' });
		}

		if (toDo.complete) {
			return res.status(400).json({ error: 'ToDo is already complete' });
		}
		const updatedToDo = await ToDo.findOneAndUpdate(
			{
				user: req.user._id,
				_id: req.params.toDoId,
			},
			{
				complete: true,
				completedAt: new Date(),
			},
			{
				new: true,
			}
		);

		return res.json(updatedToDo);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
};

//@desc  Mark a to do as incomplete
//@access  Private

export const todoIncomplete = async (req, res) => {
	try {
		const toDo = await ToDo.findOne({
			user: req.user._id,
			_id: req.params.toDoId,
		});
		if (!toDo) {
			return res.status(404).json({ error: 'Could not find ToDo' });
		}
		if (!toDo.complete) {
			return res.status(400).json({ error: 'ToDo is already incomplete' });
		}

		const updatedToDo = await ToDo.findOneAndUpdate(
			{
				user: req.user._id,
				_id: req.params.toDoId,
			},
			{
				complete: false,
				completedAt: null,
			},
			{
				new: true,
			}
		);
		return res.json(updatedToDo);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
};

//@desc  Update a todo
//@access  Private

export const updateTodo = async (req, res) => {
	try {
		const toDo = await ToDo.findOne({
			user: req.user._id,
			_id: req.params.toDoId,
		});

		if (!toDo) {
			return res.status(404).json({ error: 'Could not find ToDo' });
		}
		const { isValid, errors } = validateToDoInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const updatedToDo = await ToDo.findOneAndUpdate(
			{
				user: req.user._id,
				_id: req.params.toDoId,
			},
			{
				content: req.body.content,
			},
			{
				new: true,
			}
		);
		return res.json(updatedToDo);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
};

//@route DELETE /api/todos/:toDoId
//@desc  Delete a todo
//@access  Private

export const deleteTodo = async (req, res) => {
	try {
		const toDo = await ToDo.findOne({
			user: req.user._id,
			_id: req.params.toDoId,
		});
		if (!toDo) {
			return res.status(404).json({ error: 'Could not find ToDo' });
		}

		await ToDo.findOneAndRemove({
			user: req.user._id,
			_id: req.params.toDoId,
		});

		return res.json({ success: true });
	} catch (err) {
		console.log(err);

		return res.status(500).send(err.message);
	}
};
