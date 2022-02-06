import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthContext from '../context/auth/AuthContext';
import AuthBox from './AuthBox';
import Dashboard from './Dashboard';
import Header from './Header';

const Layout = () => {
	const authContext = useContext(AuthContext);
	const { fetchingUser } = authContext;

	return fetchingUser ? (
		<div className='loading'>
			<h1>Loading</h1>{' '}
		</div>
	) : (
		<BrowserRouter>
			{/* add header*/}
			<Header />
			<Routes>
				<Route exact path='/' element={<AuthBox />} />
				<Route path='/register' element={<AuthBox register />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Layout;
