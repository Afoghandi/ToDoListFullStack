import axios from 'axios';
import React, { useState } from 'react';

const NewToDo = () => {
	const [content, setContent] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		axios.post('/api/todos/new', { content }).then((res) => {
			setContent('');
			//addToDo(res.data)
		});
	};
	return (
		<form
			className='new'
			value={content}
			onChange={(e) => setContent(e.target.value)}
			onSubmit={onSubmit}
		>
			<input type='text' />
			<button className='btn' type='submit'>
				Add
			</button>
		</form>
	);
};

export default NewToDo;
