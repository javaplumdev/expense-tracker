import React, { createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { setDoc, doc, onSnapshot, collection } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';

export const ContextVar = createContext();

export const ContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);

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
	}, []);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => {
			unsub();
		};
	}, []);

	const logOut = () => {
		return signOut(auth);
	};

	return (
		<ContextVar.Provider value={{ createAccount, logIn, user, users, logOut }}>
			{children}
		</ContextVar.Provider>
	);
};
