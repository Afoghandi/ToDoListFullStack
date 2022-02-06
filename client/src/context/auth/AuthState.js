import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import {
	SET_USER,
	RESET_USER,
	SET_COMPLETE_TODOS,
	SET_INCOMPLETE_TODOS,
} from '../types';

const AuthState = ({ children }) => {
	const initialState = {
		user: null,
		fetchingUser: true,
		completeToDos: [],
		incompleteToDos: [],
	};
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		getCurrentUser();
	}, []);

	const getCurrentUser = async () => {
		try {
			const res = await axios.get('/api/auth/current');
			if (res.data) {
				const toDosRes = await axios.get('/api/todos/current');
				if (toDosRes.data) {
					dispatch({ type: SET_USER, payload: res.data });
					dispatch({
						type: SET_COMPLETE_TODOS,
						payload: toDosRes.data.complete,
					});
					dispatch({
						type: SET_INCOMPLETE_TODOS,
						payload: toDosRes.data.incomplete,
					});
				} else {
					dispatch({ type: RESET_USER });
				}
			}
		} catch (err) {
			console.log(err);
			dispatch({ type: RESET_USER });
		}
	};

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

	const logout = async () => {
		try {
			await axios.put('/api/auth/logout');
			dispatch({ type: RESET_USER });
		} catch (err) {
			console.log(err);
			dispatch({ type: RESET_USER });
		}
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				getCurrentUser,
				logout,
				addToDo,
				updateToDo,
				removeTodo,
				toDoIncomplete,
				toDoComplete,
				//fetchingUser: state.fetchingUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;
