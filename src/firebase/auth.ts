import firebaseConfig from './config';

export const resetPswd = async (email: string) => 
    await firebaseConfig.auth().sendPasswordResetEmail(email);

export const signIn = async (email: string, pswd: string) => 
    await firebaseConfig.auth().signInWithEmailAndPassword(email, pswd);

export const signOut = async () => 
    await firebaseConfig.auth().signOut();

export const signUp = async (email: string, pswd: string) => 
    await firebaseConfig.auth().createUserWithEmailAndPassword(email, pswd);
