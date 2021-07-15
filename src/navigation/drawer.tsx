import React from 'react';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View } from "react-native";
import { DrawerStyles } from "./styles";
import { ThemeType } from '../types/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { drawerItemData } from '../data/drawerItems';

export const makeDrawer = (props: any, theme: ThemeType) =>
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.dynamic.screen.secondaryBgC }}>
        {console.log()}
        <View style={DrawerStyles.root}>
            <View>
                {props.state.routes.slice(0, 4).map((route: any) => {
                    return (
                        <DrawerItem
                            key={route.key}
                            icon={(props: any) => {
                                return (
                                    <Icon
                                        color={theme.static.accentC}
                                        name={drawerItemData[route.name].icon}
                                        size={props.size}
                                    />
                                );
                            }}
                            label={drawerItemData[route.name].label}
                            labelStyle={{ ...DrawerStyles.labelStyle, color: theme.dynamic.text.labelC }}
                            onPress={() => props.navigation.navigate(route.name)}
                            style={DrawerStyles.item}
                        />
                    );
                })}
            </View>
            <DrawerItem
                icon={(props: any) => {
                    return (
                        <Icon
                            color={theme.static.accentC}
                            name='cog'
                            size={props.size}
                        />
                    );
                }}
                label='Settings'
                labelStyle={{ ...DrawerStyles.labelStyle, color: theme.dynamic.text.labelC }}
                onPress={() => props.navigation.navigate('settings')}
                style={DrawerStyles.item}
            />
        </View>
    </DrawerContentScrollView>