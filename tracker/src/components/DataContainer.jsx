import React, { useContext } from 'react';
import { ContextVar } from '../context/context-config';

const DataContainer = () => {
	const { data, user } = useContext(ContextVar);

	let userData = data.filter((item) => item.uid === user.uid);

	console.log(userData);

	let total = userData
		.map((item) => item.amount)
		.reduce((prev, next) => prev + next, 0);

	console.log(total);

	return (
		<div>
			{userData.length === 0 ? (
				<p>No data yet</p>
			) : (
				<>
					<div className="my-3">
						<h3 className="sm:text-2xl md:text-3xl">
							You've already spent: <span className="font-bold">₱{total}</span>
						</h3>
					</div>
					<div className="hidden md:block">
						<div className="p-3 rounded my-1 grid sm:grid-cols-2  md:grid-cols-4">
							<p>expense_type</p>
							<p>date</p>
							<p>method</p>
							<p>amount</p>
						</div>
					</div>
					{userData.map((item) => {
						return (
							<div
								key={item.postId}
								className="bg-red-500 p-3 mb-3 text-white rounded grid sm:grid-cols-2  md:grid-cols-4"
							>
								<p>{item.expense_type}</p>
								<p>{item.date}</p>
								<p>{item.method}</p>
								<p>₱{item.amount}</p>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default DataContainer;
