import React from 'react';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemeType } from '../types/color';
import { DrawerStyles } from "./styles";

import { drawerItemData } from '../data/drawerItems';

export const makeDrawer = (props: any, theme: ThemeType) =>
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.dynamic.screen.secondaryBgC }}>
        <View style={DrawerStyles.root}>
            <View>
                {props.state.routeNames.slice(0, 4).map((route: any, index: number) => {
                    return (
                        <View style={DrawerStyles.itemContainer}>
                            <DrawerItem
                                key={route.key}
                                icon={(props: any) => {
                                    return (
                                        <Icon
                                            color={theme.static.accentC}
                                            name={drawerItemData[route].icon}
                                            size={props.size}
                                        />
                                    );
                                }}
                                label={drawerItemData[route].label}
                                labelStyle={{ ...DrawerStyles.labelStyle, color: theme.dynamic.text.labelC }}
                                onPress={() => props.navigation.navigate(route)}
                                style={DrawerStyles.item}
                            />
                            <Icon
                                color={props.state.index === index ? theme.dynamic.text.mainC : 'transparent'}
                                name='chevron-left'
                                size={30}
                            />
                        </View>
                    );
                })}
            </View>
            <View style={DrawerStyles.itemContainer}>
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
                <Icon
                    color={props.state.index === 5 ? theme.dynamic.text.mainC : 'transparent'}
                    name='chevron-left'
                    size={30}
                />
            </View>
        </View>
    </DrawerContentScrollView>