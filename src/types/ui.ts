import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface NumpadBtnProps {
    icon: string,
    isOp: boolean,
    onPress: () => void,
}

export interface ScreenProps {
    navigation: DrawerNavigationProp<any, any>,
}

export interface DrawerItemMap {
    [name: string]: DrawerItemProps;
}

export interface DrawerItemProps {
    icon: string,
    label: string,
}
