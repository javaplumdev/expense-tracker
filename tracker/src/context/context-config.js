import React, { createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import {
	setDoc,
	doc,
	onSnapshot,
	collection,
	query,
	orderBy,
	serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';
import { toast } from 'react-hot-toast';

export const ContextVar = createContext();

export const ContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);
	const [data, setData] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const createAccount = (email, password) => {
		onAuthStateChanged(auth, (currentUser) => {
			try {
				setDoc(doc(db, 'users', currentUser.uid), {
					id: currentUser.uid,
					email: email,
					password: password,
				});
			} catch (e) {
				console.log(e);
			}
		});

		return createUserWithEmailAndPassword(auth, email, password);
	};

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		});

		onSnapshot(
			query(collection(db, 'data'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

				setIsLoading(false);
			}
		);
	}, []);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsub();
		};
	}, []);

	const postContent = (
		expense_type,
		date,
		category,
		method,
		amount,
		uid,
		postId
	) => {
		if (
			!expense_type.trim() ||
			expense_type === '' ||
			!category.trim() ||
			category === '' ||
			!method.trim() ||
			method === '' ||
			!amount.trim() ||
			amount === ''
		) {
			toast.error('Please enter missing field');
		} else {
			setDoc(doc(db, 'data', postId), {
				expense_type: expense_type,
				date: date,
				method: method,
				amount: +amount,
				uid: uid,
				postId: postId,
				timestamp: serverTimestamp(),
			});

			toast.success('Successfully added!');
		}
	};

	const logOut = () => {
		return signOut(auth);
	};

	return (
		<ContextVar.Provider
			value={{
				createAccount,
				logIn,
				user,
				users,
				logOut,
				modalIsOpen,
				setIsOpen,
				postContent,
				data,
				isLoading,
			}}
		>
			{children}
		</ContextVar.Provider>
	);
};
