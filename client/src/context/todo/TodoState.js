import React, { useReducer } from 'react';

import TodoContext from './TodoContext';
import TodoReducer from './TodoReducer';

import { SET_COMPLETE_TODOS, SET_INCOMPLETE_TODOS } from '../types';

const TodoState = ({ children }) => {
	const initialState = {
		completeToDos: [],
		incompleteToDos: [],
	};

	const [state, dispatch] = useReducer(TodoReducer, initialState);

	const addToDo = (toDo) => {
		dispatch({
			type: SET_INCOMPLETE_TODOS,
			payload: [toDo, ...state.incompleteToDos],
		});
	};

	const toDoComplete = (toDo) => {
		dispatch({
			type: SET_INCOMPLETE_TODOS,
			payload: state.incompleteToDos.filter(
				(incompleteToDo) => incompleteToDo._id !== toDo._id
			),
		});
		dispatch({
			type: SET_COMPLETE_TODOS,
			payload: [toDo, ...state.completeToDos],
		});
	};

	const toDoIncomplete = (toDo) => {
		dispatch({
			type: SET_COMPLETE_TODOS,
			payload: state.completeToDos.filter(
				(completeToDo) => completeToDo._id !== toDo._id
			),
		});

		const newIncompleteToDos = [toDo, ...state.incompleteToDos];

		dispatch({
			type: SET_INCOMPLETE_TODOS,
			payload: newIncompleteToDos.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			),
		});
	};
	const removeTodo = (toDo) => {
		if (toDo.complete) {
			dispatch({
				type: SET_COMPLETE_TODOS,
				payload: state.completeToDos.filter(
					(completeToDo) => completeToDo._id !== toDo._id
				),
			});
		} else {
			dispatch({
				type: SET_INCOMPLETE_TODOS,
				payload: state.incompleteToDos.filter(
					(incompleteToDo) => incompleteToDo._id !== toDo._id
				),
			});
		}
	};
	const updateToDo = (toDo) => {
		if (toDo.complete) {
			const newCompleteToDos = state.completeToDos.map((completeToDo) =>
				completeToDo._id !== toDo._id ? completeToDo : toDo
			);
			dispatch({
				type: SET_COMPLETE_TODOS,
				payload: newCompleteToDos,
			});
		} else {
			const newIncompleteToDos = state.incompleteToDos.map((incompleteToDo) =>
				incompleteToDo._id !== toDo._id ? incompleteToDo : toDo
			);
			dispatch({
				type: SET_INCOMPLETE_TODOS,
				payload: newIncompleteToDos,
			});
		}
	};

	return (
		<TodoContext.Provider
			value={{
				...state,
				addToDo,
				toDoComplete,
				toDoIncomplete,
				removeTodo,
				updateToDo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoState;
