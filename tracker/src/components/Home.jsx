import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextVar } from '../context/context-config';
import { BiLogOut } from 'react-icons/bi';
import { MdAddCircleOutline } from 'react-icons/md';
import { customStyles } from '../assets/styles';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const Home = () => {
	const { user, users, logOut } = useContext(ContextVar);
	let navigate = useNavigate();

	console.log(user);
	console.log(users);

	const handleLogout = () => {
		logOut();
		navigate('/');
	};

	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);

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

	return (
		<div className="container mx-auto p-3">
			<div className="flex justify-between">
				<h1 className="text-3xl font-medium text-slate-800">Expense Tracker</h1>

				<button onClick={() => handleLogout()}>
					<BiLogOut size={30} />
				</button>
			</div>
			<div className="flex justify-between mt-9">
				<p>Get started</p>
				<button
					onClick={openModal}
					className="flex content-center bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white"
				>
					<p>Add expense</p>{' '}
					<MdAddCircleOutline className="icon ml-1" size={25} />
				</button>
				<Modal
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
					<button onClick={closeModal}>close</button>
					<div>I am a modal</div>
					<form>
						<input />
						<button>tab navigation</button>
						<button>stays</button>
						<button>inside</button>
						<button>the modal</button>
					</form>
				</Modal>
			</div>
		</div>
	);
};

export default Home;
