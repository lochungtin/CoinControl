import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface DisplaySectionType {
    date: string,
    keys: Array<string>,
}

export interface DrawerItemMap {
    [name: string]: DrawerItemProps;
}

export interface DrawerItemProps {
    icon: string,
    label: string,
}

export interface NumpadBtnProps {
    icon: string,
    isOp: boolean,
    onPress: () => void,
}

export interface ScreenProps {
    navigation: DrawerNavigationProp<any, any>,
    route?: any,
}

export interface SettingsCategory {
    header: string,
    body: Array<SettingsItem>,
}

export interface SettingsItem {
    blurred?: boolean
    icon: string,
    label: string,
    onPress: (value: boolean) => void,
    switch?: boolean,
}
