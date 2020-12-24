import React, {useState, useEffect} from 'react';
import { Text, View, Button} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth,{firebase} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '486441035059-mqd6rf0e178kn2uke7k2pfdtii632qb1.apps.googleusercontent.com', offlineAccess: false,
   
});

class Screen extends React.Component {

    constructor(props) {
        super(props);
    }
      _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const {accessToken, idToken} = await GoogleSignin.signIn();
          const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );
          await auth().signInWithCredential(credential);
        } catch (error) {console.log(error)}}

    async  onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    // googleCredential.token = googleCredential.token.idToken;

    return auth().signInWithCredential(googleCredential);
        }

    render() {
        return (
            <View style={styles.screen}>
                <Text>Account Screen</Text>
                <Button onPress={this._signIn } title="googleLogin">
                </Button>
            </View>
        );
    }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Screen);