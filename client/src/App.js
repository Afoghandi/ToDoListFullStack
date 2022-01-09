import React from 'react';
import Layout from './components/Layout';
import { GlobalProvider } from './context/GlobalContext';
import './main.scss';

const App = () => {
	return (
		<GlobalProvider>
			<Layout />
		</GlobalProvider>
	);
};

export default App;
