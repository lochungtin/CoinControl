import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { white } from '../styles';

export default ExpandButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Icon name={'dots-horizontal'} size={25} color={white} />
        </TouchableOpacity>
    )
}