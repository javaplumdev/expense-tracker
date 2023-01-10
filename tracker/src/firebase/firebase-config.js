// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAprViFeCIww6q2ZQlw6YZkB_9TPECxY00',
	authDomain: 'expense-tracker-500fd.firebaseapp.com',
	projectId: 'expense-tracker-500fd',
	storageBucket: 'expense-tracker-500fd.appspot.com',
	messagingSenderId: '357486667245',
	appId: '1:357486667245:web:b825a77911c75400ed73e4',
	measurementId: 'G-4WDL8JM6E1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
