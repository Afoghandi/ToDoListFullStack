import React from 'react';
import Layout from './components/Layout';

import AuthState from './context/auth/AuthState';
import TodoState from './context/todo/TodoState';
import './main.scss';

const App = () => {
	return (
		<AuthState>
			<TodoState>
				{' '}
				<Layout />
			</TodoState>
		</AuthState>
	);
};

export default App;
