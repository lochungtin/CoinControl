import React from 'react';
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { black } from '../styles';

export default ExpandButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Icon name={'dots-horizontal'} size={20} color={black} />
        </TouchableOpacity>
    )
}