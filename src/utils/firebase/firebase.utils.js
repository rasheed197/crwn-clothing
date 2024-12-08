
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMPhQLn-rc-8kZpSMR_eoFA76zTn1MCtI",
    authDomain: "crwn-clothing-db-ad6a0.firebaseapp.com",
    projectId: "crwn-clothing-db-ad6a0",
    storageBucket: "crwn-clothing-db-ad6a0.firebasestorage.app",
    messagingSenderId: "725909646347",
    appId: "1:725909646347:web:b4874d8f1198cbffa92b0e"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({promt: "select_account"})

export const auth = getAuth();

export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, googleProvider)
}

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
        }
        catch(error) {
            console.log("error creating the user", error.message)
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field="title") => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("DONE");
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}
