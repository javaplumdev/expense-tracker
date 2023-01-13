import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextVar } from '../context/context-config';
import { BiLogOut } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';
import Modal from 'react-modal';
import { GrClose } from 'react-icons/gr';
import { v4 as uuidv4 } from 'uuid';
import DataContainer from './DataContainer';
import { customStyles } from '../assets/styles';
import { ProgressBar } from 'react-loader-spinner';

Modal.setAppElement(document.getElementById('root'));

const Home = () => {
	const { user, isLoading, logOut, modalIsOpen, setIsOpen, postContent } =
		useContext(ContextVar);
	let navigate = useNavigate();

	const [expense_type, setExpense_type] = useState('');
	const [date, setDate] = useState('');
	const [category, setCategory] = useState('');
	const [method, setMethod] = useState('');
	const [amount, setAmount] = useState('');

	const handleLogout = () => {
		logOut();
		navigate('/');
	};

	let subtitle;

	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		let postId = uuidv4();
		postContent(expense_type, date, category, method, amount, user.uid, postId);

		setIsOpen(false);
	};

	return (
		<>
			{isLoading ? (
				<div
					className="flex justify-center items-center"
					style={{ minHeight: '100vh' }}
				>
					<ProgressBar
						height="80"
						width="80"
						ariaLabel="progress-bar-loading"
						wrapperStyle={{}}
						wrapperClass="progress-bar-wrapper"
						borderColor="#F4442E"
						barColor="#51E5FF"
					/>
				</div>
			) : (
				<div className="container mx-auto p-3">
					<div className="flex justify-between">
						<h1 className="text-3xl font-medium text-slate-800">
							Expense Tracker
						</h1>

						<button onClick={() => handleLogout()}>
							<BiLogOut size={30} />
						</button>
					</div>
					<div className="flex justify-between mt-9">
						<p>Hi, {user.email}!</p>
						<button
							onClick={openModal}
							className="flex content-center bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white"
						>
							<p>Add</p> <MdAddCircleOutline className="icon ml-1" size={25} />
						</button>

						<Modal
							isOpen={modalIsOpen}
							onAfterOpen={afterOpenModal}
							onRequestClose={closeModal}
							style={customStyles}
							contentLabel="Example Modal"
						>
							<div className="flex justify-between">
								<h2 ref={(_subtitle) => (subtitle = _subtitle)}>
									Expense Tracker
								</h2>
								<button onClick={closeModal}>
									<GrClose />
								</button>
							</div>

							<form style={{ maxWidth: '320px' }} onSubmit={handleSubmit}>
								<p className="py-3">Please enter the details.</p>
								<input
									type="text"
									placeholder="Expense Type"
									className=" placeholder-slate-400 p-1 px-3 border rounded border-gray-200 w-full"
									onChange={(e) => setExpense_type(e.target.value)}
								/>
								<input
									type="date"
									placeholder="Date"
									className="w-full my-2 border rounded border-gray-200 p-1 px-3"
									onChange={(e) => setDate(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Category"
									className="placeholder-slate-400 p-1 px-3 border rounded border-gray-200 w-full"
									onChange={(e) => setCategory(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Method"
									className="my-2 placeholder-slate-400 p-1 px-3 border rounded border-gray-200 w-full"
									onChange={(e) => setMethod(e.target.value)}
								/>
								<input
									type="number"
									placeholder="Amount"
									className="placeholder-slate-400 p-1 px-3 border rounded border-gray-200 w-full"
									onChange={(e) => setAmount(e.target.value)}
								/>
								<button className="mt-3 w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white">
									Add
								</button>
							</form>
						</Modal>
					</div>
					<DataContainer />
				</div>
			)}
		</>
	);
};

export default Home;
