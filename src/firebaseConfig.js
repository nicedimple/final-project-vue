// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore' // Use getFirestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDfCPeoU51X7QiepVKpEZW554Uh7ZfRcB8',
  authDomain: 'library-system-14c17.firebaseapp.com',
  projectId: 'library-system-14c17',
  storageBucket: 'library-system-14c17.firebasestorage.app',
  messagingSenderId: '208952591001',
  appId: '1:208952591001:web:0ea2b155d08da4f607ee08',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
