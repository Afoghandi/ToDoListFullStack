import React, { useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import TodoContext from '../context/todo/TodoContext';
import ToDoCard from './ToDoCard';
import NewToDo from './NewToDo';

const Dashboard = () => {
	const authContext = useContext(AuthContext);

	const { user, completeToDos, incompleteToDos } = authContext;

	const navigate = useNavigate();

	useEffect(() => {
		if (!user && navigate) {
			navigate('/');
		}
	}, [user, navigate]);
	return (
		<div className='dashboard'>
			<NewToDo />
			<div className='todos'>
				{' '}
				{incompleteToDos.map((toDo) => (
					<ToDoCard toDo={toDo} key={toDo._id} />
				))}{' '}
			</div>

			{completeToDos.length > 0 && (
				<div className='todos'>
					<h2 className='todos__title'> Complete ToDo's</h2>
					{completeToDos.map((toDo) => (
						<ToDoCard toDo={toDo} key={toDo._id} />
					))}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
