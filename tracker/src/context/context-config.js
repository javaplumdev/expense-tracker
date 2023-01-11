import React, { createContext, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';

export const ContextVar = createContext();

export const ContextProvider = ({ children }) => {
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

	return (
		<ContextVar.Provider value={{ createAccount }}>
			{children}
		</ContextVar.Provider>
	);
};
