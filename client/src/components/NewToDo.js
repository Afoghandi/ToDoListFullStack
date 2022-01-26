import axios from 'axios';
import React, { useState, useContext } from 'react';
import TodoContext from '../context/todo/TodoContext';

const NewToDo = () => {
	const todoContext = useContext(TodoContext);
	const { addToDo } = todoContext;

	const [content, setContent] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		axios.post('/api/todos/new', { content }).then((res) => {
			setContent('');
			addToDo(res.data);
		});
	};
	return (
		<form className='new' onSubmit={onSubmit}>
			<input
				type='text'
				onChange={(e) => setContent(e.target.value)}
				value={content}
			/>
			<button className='btn' type='submit' disabled={content.length === 0}>
				Add
			</button>
		</form>
	);
};

export default NewToDo;
