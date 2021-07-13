import { StaticThemeType, ThemeType } from '../types';
import { ACCENT, BLACK, SECONDARY_ACCENT, TINTED_GREY, WHITE } from './color';

const staticTheme: StaticThemeType = {
    accentC: ACCENT,
    bullet: {
        bgC: ACCENT,
        textC: BLACK,
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
};

export const lightTheme: ThemeType = {
    dynamic: {
        icon: {
            actionC: '',
            drawerC: '',
            homeC: '',
            mainC: '',
        },
        modal: {
            closeBarC: '',
            shadow: {
                alpha: 0.2,
                color: BLACK,
            },
        },
        percentageTrackC: '',
        screen: {
            bgC: WHITE,
            secondaryBgC: '',
        },
        text: {
            disabled: '',
            label: '',
            main: BLACK,
            placeholder: '',
        },
    },
    static: staticTheme,
};

export const darkTheme: ThemeType = {
    dynamic: {
        icon: {
            actionC: '',
            drawerC: '',
            homeC: '',
            mainC: '',
        },
        modal: {
            closeBarC: '',
            shadow: {
                alpha: 0.2,
                color: WHITE,
            },
        },
        percentageTrackC: '',
        screen: {
            bgC: BLACK,
            secondaryBgC: '',
        },
        text: {
            disabled: '',
            label: '',
            main: WHITE,
            placeholder: '',
        },
    },
    static: staticTheme,
};
