import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/auth/AuthContext';

const ToDoCard = ({ toDo }) => {
	const authContext = useContext(AuthContext);
	const [content, setContent] = useState(toDo.content);

	const { toDoComplete, toDoIncomplete, removeToDo, updateToDo } = authContext;

	const [editing, setEditing] = useState(false);
	const input = useRef(null);

	const onEdit = (e) => {
		e.preventDefault();
		setEditing(true);
		input.current.focus();
	};

	const stopEditing = (e) => {
		if (e) {
			e.preventDefault();
		}
		setEditing(false);
		setContent(toDo.content);
	};

	const markAsComplete = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(`/api/todos/${toDo._id}/complete`);

			toDoComplete(res.data);
		} catch (err) {
			console.log(err.message);
		}
	};
	const markAsIncomplete = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(`/api/todos/${toDo._id}/incomplete`);

			toDoIncomplete(res.data);
		} catch (err) {
			console.log(err.message);
		}
	};

	const deleteToDo = async (e) => {
		e.preventDefault();
		try {
			if (window.confirm('Are you sure you want to delete this ToDo?')) {
				await axios.delete(`/api/todos/${toDo._id}`);
				removeToDo(toDo);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const editToDo = (e) => {
		e.preventDefault();

		axios
			.put(`/api/todos/${toDo._id}`, { content })
			.then((res) => {
				updateToDo(res.data);
				setEditing(false);
			})
			.catch(() => {
				stopEditing();
			});
	};
	return (
		<div className={`todo ${toDo.complete ? 'todo--complete' : ''}`}>
			{' '}
			<input
				type='checkbox'
				checked={toDo.complete}
				onChange={!toDo.complete ? markAsComplete : markAsIncomplete}
			/>
			<input
				type='text'
				ref={input}
				value={content}
				readOnly={!editing}
				onChange={(e) => setContent(e.target.value)}
			/>
			<div className='todo__controls'>
				{!editing ? (
					<>
						{!toDo.complete && <button onClick={onEdit}>Edit</button>}

						<button onClick={deleteToDo}>Delete</button>
					</>
				) : (
					<>
						<button onClick={stopEditing}>Cancel</button>
						<button onClick={editToDo}>Save</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ToDoCard;
