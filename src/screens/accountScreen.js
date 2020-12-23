import React from 'react';
import { Text, View, Button} from 'react-native';
import { connect } from 'react-redux';

import { styles } from '../styles';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';


GoogleSignin.configure({
  webClientId: '1:486441035059:android:7c02c9a8d0fd6b0f268a46',
});

    
class Screen extends React.Component {

    constructor(props) {
        super(props);
    }
    async  googleLogin() {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
        
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