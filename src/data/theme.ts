import { StaticThemeType, ThemeType } from '../types/color';
import { ACCENT, BLACK, SECONDARY_ACCENT, TINTED_GREY, WHITE } from './color';

const staticTheme: StaticThemeType = {
    accentC: ACCENT,
    bullet: {
        active: {
            bgC: ACCENT,
            textC: BLACK,
        },
        inactive: {
            bgC: TINTED_GREY,
            textC: WHITE,
        },
    },
    cSwitch: {
        active: {
            bgC: SECONDARY_ACCENT,
            textC: BLACK,
        },
        inactive: {
            bgC: TINTED_GREY,
            textC: WHITE,
        },
    },
    progressBar: {
        highlightC: ACCENT,
        textC: BLACK,
        trackC: WHITE,
    },
}

export const lightTheme: ThemeType = {
    dynamic: {
        icon: {
            actionC: TINTED_GREY,
            drawerC: TINTED_GREY,
            homeC: '#DEE9E6',
            mainC: '#C4C4C4',
        },
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
            labelC: BLACK,
            mainC: BLACK,
            secondaryC: '#7A7A7A',
        },
    },
    static: staticTheme,
}

export const darkTheme: ThemeType = {
    dynamic: {
        icon: {
            actionC: TINTED_GREY,
            drawerC: TINTED_GREY,
            homeC: TINTED_GREY,
            mainC: '#C4C4C4',
        },
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
            labelC: '#CBCBCB',
            mainC: WHITE,
            secondaryC: '#7A7A7A',
        },
    },
    static: staticTheme,
}
