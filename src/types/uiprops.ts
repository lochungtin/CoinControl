import { DrawerNavigationProp } from "@react-navigation/drawer";

export interface NumpadBtnProps {
    icon: string,
    isOp: boolean,
    onPress: () => void,
}

export interface ScreenProps {
    navigation: DrawerNavigationProp<any, any>,
}
