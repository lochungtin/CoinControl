import { CategoryMap, DataMap } from "./data";

// snapshot type
export interface FirebaseFullSnapshot {
    records: DataMap,
    categories: {
        '0': CategoryMap,
        '1': CategoryMap,
    }
}

// update object
export interface FirebaseUpdateType {
    [path: string]: any,
}
