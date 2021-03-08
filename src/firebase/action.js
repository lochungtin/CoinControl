import Firebase from "./config"

//fetch data
const db = Firebase.database();

//Delete data
export const firebaseDeleteData = (id, path, type) => {
    db.ref('/UserData/' + id + "/" + path).child(type).remove();
}

//Add data
export const firebaseAddData = (id, path, type, data) => {
    db.ref('/UserData/' + id + "/" + path).push({
        type: data
    });
}

//Update data
export const firebaseUpdateData = (id, path, type, data) => {
    db.ref('/UserData/' + id + "/" + path).set({
        type: data
    });
}

//create account if not set up yet
export const firebaseCreateAccount = (familyName, givenName, id, type, details) => {
    db.ref('/UserData').push({
        familyName: familyName,
        givenName: givenName,
        id: id,
        type: type,
        details: details
    });
}

//login account
export const firebaseLoginAccount = (familyName, givenName, id, type, details) => {
    db.ref('/UserData').orderByChild("id").equalTo(id).once("value", snapshot => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("exists!", userData);
            //needa return data here
        }
        else
            firebaseCreateAccount(familyName,givenName,id,type, details);
    });
}