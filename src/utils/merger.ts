import moment from "moment";

import { firebaseOverwriteAll } from "../firebase/data";
import { categoryOverwrite, dataOverwrite, displayOverwrite } from "../redux/action";
import { store } from "../redux/store";
import { Categories, CategoryMap, CategoryStore, CategoryType, DataMap, DataType } from "../types/data";
import { FirebaseFullSnapshot } from "../types/firebase";

const getLatest = (srcA: DataType | CategoryType, srcB: DataType | CategoryType): (DataType | CategoryType) => {
    let lmtA: moment.Moment = moment(srcA.lmt);
    let lmtB: moment.Moment = moment(srcB.lmt);

    return lmtA.isAfter(lmtB) ? srcA : srcB;
}

const mergeObj = (objA: DataMap | CategoryMap, objB: DataMap | CategoryMap): (DataMap | CategoryMap) => {
    let merged: (DataMap | CategoryMap) = {};

    let keys: Array<string> = Array.from(new Set([...Object.keys(objA), ...Object.keys(objB)]));

    keys.forEach((key: string) => {
        let srcA: (DataType | CategoryType) = objA[key];
        let srcB: (DataType | CategoryType) = objB[key];

        if (!srcA)
            merged[key] = srcB;

        else if (!srcB)
            merged[key] = srcA;

        else
            merged[key] = getLatest(srcA, srcB);
    });

    return merged;
}

export const merge = (uid: string, data: DataMap, categoryStore: CategoryStore, dbSnapshot: FirebaseFullSnapshot) => {
    let mergedData: any = mergeObj(data, dbSnapshot.records);
    let mergedExpense: any = mergeObj(categoryStore[Categories.EXPENSE], dbSnapshot.categories[0]);
    let mergedIncome: any = mergeObj(categoryStore[Categories.INCOME], dbSnapshot.categories[1]);
    let mergedCategories: any = {
        0: mergedExpense,
        1: mergedIncome,
    };

    console.log(mergedData);

    store.dispatch(categoryOverwrite(mergedCategories));
    store.dispatch(dataOverwrite(mergedData));
    store.dispatch(displayOverwrite(mergedData));

    firebaseOverwriteAll(uid, mergedData, mergedCategories);
}
