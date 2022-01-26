import React, { useReducer } from 'react';
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
				fetchingUser: state.fetchingUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;
