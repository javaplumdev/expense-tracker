import React from 'react';
import './App.css';
import { ContextProvider } from './context/context-config';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';

const App = () => {
	return (
		<ContextProvider>
			<Routes>
				<Route path="/" element={<LoginForm />} />
			</Routes>
		</ContextProvider>
	);
};

export default App;
