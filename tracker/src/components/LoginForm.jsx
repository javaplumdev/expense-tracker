import React, { useContext, useState } from 'react';
import { ContextVar } from '../context/context-config';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const { logIn } = useContext(ContextVar);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [alert, setAlert] = useState('');

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await logIn(email, password);
			navigate('/home');
		} catch (e) {
			setAlert(e.message);
		}
	};

	return (
		<div
			className="flex justify-center items-center p-3"
			style={{ height: '100vh' }}
		>
			<form
				className="bg-white  p-3 shadow"
				style={{ width: '520px' }}
				onSubmit={handleSubmit}
			>
				<div className="my-3">
					<h1 className="text-2xl  text-blue-800">Expense Tracker</h1>
					<p className="text-slate-700 font-medium">Login Form</p>
					{alert && (
						<p className="bg-red-800 text-white p-2 rounded mt-3">{alert}</p>
					)}
				</div>
				<label className="block">
					<span className="block text-sm font-medium text-slate-700">
						Username
					</span>
					<input
						type="text"
						className="placeholder-slate-400 p-1 px-3 border rounded border-gray-200 w-full"
						placeholder="Enter your username"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label className="block my-3">
					<span className="block text-sm font-medium text-slate-700">
						Password
					</span>
					<input
						type="password"
						className="placeholder-slate-400 p-1 px-3 border rounded border-gray-200 w-full"
						placeholder="Enter your password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button className="bg-blue-700 w-full px-3 py-2 rounded text-white hover:bg-blue-800">
					Log in
				</button>

				<div className="text-center w-full my-3 text-sm">
					<p>
						Don't have an account?{' '}
						<Link to="/register" className="text-blue-500 underline">
							Register
						</Link>{' '}
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
