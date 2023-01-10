import React, { useContext } from 'react';
import { ContextVar } from '../context/context-config';

const LoginForm = () => {
	const { hi } = useContext(ContextVar);

	console.log(hi);

	return (
		<div>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
		</div>
	);
};

export default LoginForm;
