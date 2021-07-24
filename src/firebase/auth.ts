import { showMessage } from 'react-native-flash-message';

import { flashMessageConfig } from '../data/color';
import { AccountType } from '../types/data';
import firebaseConfig from './config';

export const resetPswd = (email: string) => {
    if (!email)
        return showMessage({ ...flashMessageConfig.fail, message: 'Email Required' });

    firebaseConfig.auth().sendPasswordResetEmail(email)
        .then(() => showMessage({ ...flashMessageConfig.success, message: 'Reset password email sent' }))
        .catch((err: any) => {
            let message: string;

            switch (err.code) {
                case 'auth/user-not-found':
                    message = 'No accounts registered under this email';
                    break;
                default:
                    message = err.toString();
                    break;
            }

            showMessage({ ...flashMessageConfig.fail, message });
        });
}

export const signIn = async (email: string, pswd: string, onSuccess: (account: AccountType) => void) => {
    if (!email)
        return showMessage({ ...flashMessageConfig.fail, message: 'Email Required' });

    if (!pswd)
        return showMessage({ ...flashMessageConfig.fail, message: 'Password Required' });

    firebaseConfig.auth().signInWithEmailAndPassword(email, pswd)
        .then((res: any) => {
            onSuccess({ email: res.user?.email || '', uid: res.user?.uid || '' });
            showMessage({ ...flashMessageConfig.success, message: 'Login successful' });
        })
        .catch((err: any) => {
            let message: string;

            switch (err.code) {
                case 'auth/invalid-email':
                    message = 'Invalid email';
                    break;
                case 'auth/wrong-password':
                    message = 'Password entered is not correct';
                    break;
                case 'auth/user-not-found':
                    message = 'There is no account under this email address'
                    break;
                default:
                    message = err.toString();
                    break;
            }

            showMessage({ ...flashMessageConfig.fail, message });
        });
}

export const signOut = async () =>
    await firebaseConfig.auth().signOut();

export const signUp = async (email: string, pswd: string, rePswd: string, onSuccess: (account: AccountType) => void) => {
    if (!email)
        return showMessage({ ...flashMessageConfig.fail, message: 'Email Required' });

    if (!pswd)
        return showMessage({ ...flashMessageConfig.fail, message: 'Password Required' });

    if (pswd !== rePswd)
        return showMessage({ ...flashMessageConfig.fail, message: `Passwords don't match` });

    if (pswd.length < 6)
        return showMessage({ ...flashMessageConfig.fail, message: 'Password must have 6+ characters' });

    firebaseConfig.auth().createUserWithEmailAndPassword(email, pswd)
        .then((res: any) => {
            onSuccess({ email: res.user?.email || '', uid: res.user?.uid || '' });
            showMessage({ ...flashMessageConfig.success, message: 'Login successful' });
        })
        .catch((err: any) => {
            let message: string;

            switch (err.code) {
                case 'auth/invalid-email':
                    message = 'Invalid Email';
                    break;
                case 'auth/email-already-in-use':
                    message = 'Email already in use, try logging in';
                    break;
                default:
                    message = err.toString();
            }

            showMessage({ ...flashMessageConfig.fail, message });
        });
}
