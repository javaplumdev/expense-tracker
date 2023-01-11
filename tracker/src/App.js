import React from 'react';
import './App.css';
import { ContextProvider } from './context/context-config';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { Toaster } from 'react-hot-toast';

const App = () => {
	return (
		<ContextProvider>
			<Toaster />
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/register" element={<RegisterForm />} />
			</Routes>
		</ContextProvider>
	);
};

export default App;
