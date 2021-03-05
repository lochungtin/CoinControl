import Firebase from "./config"

//fetch data

const db = Firebase.database();

//upload data


//create account if not set up yet

export const createAccount=(familyName,givenName,id,type)=>{
    db.ref('/UserData').push({
        familyName: familyName,
        givenName: givenName,
        id:id,
        type:type,
      });
}

//login account
export const loginAccount=(familyName,givenName,id,type)=>{
    db.ref('/UserData').orderByChild("id").equalTo(id).once("value",snapshot => {
        if (snapshot.exists()){
            const userData = snapshot.val();
            console.log("exists!", userData);
            //needa return data here
        }
        else{
            createAccount(familyName,givenName,id,type);
        }
    });
}