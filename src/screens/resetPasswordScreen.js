import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import { connect } from 'react-redux';

import Logo from '../components/Logo';
import ScreenHeader from '../components/ScreenHeader';
import SignUpInput from '../components/SignUpInput';
import firebase from '../firebase/config';

import { black, shade2, shade3 } from '../data/color';
import { accountScreenStyles, maxHeight, styles, } from '../styles';

class Screen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            prompt: '',
        }
    }

    color = () => this.props.settings.darkMode ? shade2 : shade3;

    reset = () => {
        if (this.state.email === '')
            this.setState({ prompt: 'Please enter your email to reset your password' });
        else
            firebase
                .auth()
                .sendPasswordResetEmail(this.state.email)
                .then(result => this.setState({ prompt: 'Please check your email to continue' }))
                .catch(error => console.log(error))
    }

    updateEmail = email => this.setState({ email });

    render() {
        return (
            <View style={this.props.settings.darkMode ? styles.screenD : styles.screenL}>
                <View style={{ ...styles.rows, justifyContent: 'space-between', height: maxHeight - 170 }}>
                    <View style={{ ...styles.rows, justifyContent: 'center' }}>
                        <ScreenHeader back={this.props.navigation.goBack} name={'Reset Password'} />
                        <Logo dim={150} style={{ marginTop: 20, }} />
                        <Text style={{ color: this.color(), textAlign: 'center', marginVertical: 20, width: 300, }}>
                            Oops, looks like someone forgot their password. Don't worry, you can reset your password with your email.
                        </Text>
                        <SignUpInput
                            onChangeText={this.updateEmail}
                            placeholder={'Email'}
                            type={'confirmation'}
                            value={this.state.email}
                        />
                        <Text style={{ color: this.color(), marginTop: 10 }}>
                            {this.state.prompt}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.reset} style={{ ...styles.columns, ...accountScreenStyles.submitBtn, backgroundColor: this.props.settings.accent }}>
                            <Text style={{ color: black }}>
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
});

export default connect(mapStateToProps)(Screen);