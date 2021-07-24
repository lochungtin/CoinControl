import { StaticThemeType, ThemeType } from '../types/color';
import { ACCENT, BLACK, GREY, ICONS, WHITE } from './color';

const staticTheme: StaticThemeType = {
    accentC: ACCENT,
    bulletTextC: {
        active: BLACK,
        inactive: WHITE,
    },
    icon: {
        actionC: GREY,
        drawerC: GREY,
        categoryC: WHITE,
        homeC: GREY,
        mainC: ICONS,
    },
    secondaryC: GREY,
    thumbC: WHITE,
    trackC: WHITE,
}

export const lightTheme: ThemeType = {
    dynamic: {
        modal: {
            closeBarC: '#CACAC7',
            shadow: {
                alpha: 0.2,
                color: BLACK,
            },
        },
        percentageTrackC: '#F1F1F1',
        screen: {
            bgC: WHITE,
            secondaryBgC: '#F1F1F1',
        },
        text: {
            contrastC: WHITE,
            labelC: BLACK,
            mainC: BLACK,
            secondaryC: '#7A7A7A',
        },
    },
    static: staticTheme,
}

export const darkTheme: ThemeType = {
    dynamic: {
        modal: {
            closeBarC: '#C4C4C4',
            shadow: {
                alpha: 0.2,
                color: WHITE,
            },
        },
        percentageTrackC: '#212121',
        screen: {
            bgC: BLACK,
            secondaryBgC: '#212121',
        },
        text: {
            contrastC: BLACK,
            labelC: '#CBCBCB',
            mainC: WHITE,
            secondaryC: '#7A7A7A',
        },
    },
    static: staticTheme,
}
