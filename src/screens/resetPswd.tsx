import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Input from '../components/auth/input';
import Bullet from '../components/bullet';
import Header from '../components/headers/auth';

import { AuthScreenStyles, ScreenStyles } from './styles';

import { resetPswd } from '../firebase/auth';
import { ReduxThemeType } from '../types/redux';
import { ScreenProps } from '../types/ui';

class Screen extends React.Component<ReduxThemeType & ScreenProps> {

    state = {
        email: '',
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.root, backgroundColor: this.props.theme.dynamic.screen.bgC }}>
                <Header navigation={this.props.navigation} />
                <ScrollView>
                    <View style={{ ...AuthScreenStyles.root }}>
                        <Text style={{ ...AuthScreenStyles.title, color: this.props.theme.dynamic.text.mainC }}>
                            Reset Password
                        </Text>
                        <Text style={{ ...AuthScreenStyles.subtitle, color: this.props.theme.dynamic.text.labelC }}>
                            Send the reset password email to your registered address
                        </Text>
                        <Input
                            icon='email-outline'
                            label='email'
                            onChangeText={(email: string) => this.setState({ email })}
                            placeholder='Enter your email'
                        />
                        <View style={AuthScreenStyles.bullet}>
                            <Bullet
                                onPress={() => resetPswd(this.state.email)}
                                text='login'
                                width={0.8}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxThemeType) => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Screen);
