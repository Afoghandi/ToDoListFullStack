/* eslint-disable import/no-anonymous-default-export */
import { SET_COMPLETE_TODOS, SET_INCOMPLETE_TODOS } from '../types';

export default (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_COMPLETE_TODOS:
			return {
				...state,
				completeToDos: payload,
			};
		case SET_INCOMPLETE_TODOS:
			return {
				...state,
				incompleteToDos: payload,
			};

		default:
			return state;
	}
};
