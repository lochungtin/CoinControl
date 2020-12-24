import React from 'react';
import { Text, View, Button} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';


GoogleSignin.configure({
  webClientId: '486441035059-8l61ntdopa47itlm7kknd6acpvmn04q4.apps.googleusercontent.com',
});

    
class Screen extends React.Component {

    constructor(props) {
        super(props);
    }
    async  googleLogin() {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        console.log("fjoabi",googleCredential);
        return auth().signInWithCredential(googleCredential);
        
      }
    onLoginOrRegister = () => {
    GoogleSignin.signIn()
        .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // Login with the credential
        return firebase.auth().signInWithCredential(credential);
        })
        .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
        })
        .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
        });
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text>Account Screen</Text>
                <Button onPress={this.googleLogin} title="googleLogin">
                </Button>
            </View>
        );
    }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Screen);