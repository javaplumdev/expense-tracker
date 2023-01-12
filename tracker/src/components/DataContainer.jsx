import React, { useContext } from 'react';
import { ContextVar } from '../context/context-config';

const DataContainer = () => {
	const { data, user } = useContext(ContextVar);

	let userData = data.filter((item) => item.uid === user.uid);

	console.log(userData);

	return (
		<div>
			{userData.length === 0 ? (
				<p>No data yet</p>
			) : (
				<>
					<div className="p-3 border border-red-200 rounded my-3 grid sm:grid-cols-2  md:grid-cols-4">
						<p>expense_type</p>
						<p>date</p>
						<p>method</p>
						<p>amount</p>
					</div>
					{userData.map((item) => {
						return (
							<div
								key={item.postId}
								className="bg-red-500 p-3 my-3 text-white rounded grid sm:grid-cols-2  md:grid-cols-4"
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
