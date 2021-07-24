import { showMessage } from 'react-native-flash-message';

import firebaseConfig from './config';

import { flashMessageConfig } from '../data/color';
import { Categories, CategoryStore, CategoryType, DataMap, DataType } from '../types/data';
import { FirebaseUpdateType } from '../types/firebase';
import { defaultCategories } from '../data/default';

const db: firebaseConfig.database.Database = firebaseConfig.database();

const firebaseDefaultErrorCallback = (err: Error | null) => {
    if (err)
        showMessage({
            ...flashMessageConfig.fail,
            description: err.toString(),
            message: 'There was an error accessing cloud storage',
        });
}
// record
// update record
export const firebaseUpdateRecord = (
    uid: string,
    payload: DataType,
) => {
    let update: FirebaseUpdateType = {};

    update[`/UserData/${uid}/records/${payload.key}`] = payload;

    db.ref().update(update, firebaseDefaultErrorCallback);
}

// delete record
export const firebaseDeleteRecord = (
    uid: string,
    key: string,
) => {
    let update: FirebaseUpdateType = {};

    update[`/UserData/${uid}/records/${key}`] = null;

    db.ref().update(update, firebaseDefaultErrorCallback);
}

// category
// update category
export const firebaseUpdateCategory = (
    uid: string,
    categoryType: Categories,
    payload: CategoryType,
) => {
    let update: FirebaseUpdateType = {};

    update[`/UserData/${uid}/categories/${categoryType}/${payload.key}`] = payload;

    db.ref().update(update, firebaseDefaultErrorCallback);
}

// delete category
export const firebaseDeleteCategory = (
    uid: string,
    categoryType: Categories,
    key: string,
    affectedRecord: Array<string>,
) => {
    let update: FirebaseUpdateType = {};

    update[`/UserData/${uid}/categories/${categoryType}/${key}`] = null;

    affectedRecord.forEach((key: string) => {
        update[`/UserData/${uid}/records/${key}/categoryKey/`] = 'C0000000';
    });

    db.ref().update(update, firebaseDefaultErrorCallback);
}

// to default categories
export const firebaseSetDefaultCategories = (
    uid: string,
    affectedRecord: Array<string>,
) => {
    let update: FirebaseUpdateType = {};

    update[`/UserData/${uid}/categories`] = defaultCategories;

    affectedRecord.forEach((key: string) => {
        update[`/UserData/${uid}/records/${key}/categoryKey/`] = 'C0000000';
    });

    db.ref().update(update, firebaseDefaultErrorCallback);
}

// syncing
// overwrite all from firebase
export const firebaseOverwriteAll = (
    uid: string,
    data: DataMap | null,
    categories: CategoryStore | null,
) => {
    let update: FirebaseUpdateType = {};

    update[`/UserData/${uid}/records`] = data;
    if (categories !== null) {
        update[`/UserData/${uid}/categories/${Categories.EXPENSE}`] = categories[Categories.EXPENSE];
        update[`/UserData/${uid}/categories/${Categories.INCOME}`] = categories[Categories.INCOME];
    }

    db.ref().update(update, firebaseDefaultErrorCallback);
}

// fetch all from firebase
export const firebaseFetchAll = async (uid: string) => db
    .ref()
    .child('UserData')
    .child(uid)
    .once('value')
    .then((snapshot: firebaseConfig.database.DataSnapshot) => snapshot.val());
