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
export const firebaseUpdateData = (firebaseId,details) => {
    db.ref('/UserData/' + firebaseId).set({
        details: details
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
export const firebaseLoginAccount = async (familyName, givenName, id, type, details,dataMethod) => {
    var isUserExists = false;
    var returnSnapshot = 0;
    var x  =  await db.ref('/UserData').orderByChild("id").equalTo(id).once("value", snapshot => {
        if (snapshot.exists()) {
            isUserExists = true
            returnSnapshot = snapshot.val();
        }
    });
    if(!isUserExists){
        firebaseCreateAccount(familyName,givenName,id,type, details);
        return null;
    }

    const userData = returnSnapshot;
    console.log("exists!", userData);
    //check type and return data
    switch(dataMethod){
        case "localOnDatabase":
            firebaseUpdateData(Object.keys(userData)[0],details);
            return null
        case "databaseOnLocal":
            //working on this
            let firstKey=Object.keys(userData)[0];
            let details= userData[firstKey].details;
            return details
        case "merge":
            //have not worked on this 
            return userData
    }
    console.log("ANSWERANSWER")
    console.log(answer)
    return answer
}

// login to put local data on database

// login to put database on local

// login to merge to combine both database and local
