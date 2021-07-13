// color picker //
export interface ColorPickerDataType {
    [index: string]: ColorPickerSectorDataType,
};

export interface ColorPickerSectorDataType {
    [index: string]: ColorPickerCellDataType,
};

export interface ColorPickerCellDataType {
    hex: string,
    pos: {
        x: number,
        y: number,
    },
};

// theme //
export interface StaticThemeType {
    accentC: string,
    bullet: BulletThemeType,
    cSwitch: CustomSwitchThemeType,
    progressBar: ProgressBarThemeType,
};

export interface ThemeType {
    dynamic: {
        icon: IconThemeType,
        modal: ModalThemeType,
        percentageTrackC: string,
        screen: ScreenThemeType,
        text: TextThemeType,
    },
    static: StaticThemeType,
};

// static
export interface BulletThemeType {
    bgC: string,
    textC: string,
};

export interface CustomSwitchThemeType {
    active: {
        bgC: string,
        textC: string,
    },
    inactive: {
        bgC: string,
        textC: string,
    },
};

export interface ProgressBarThemeType {
    highlightC: string,
    textC: string,
    trackC: string,
};

// dynamic
export interface IconThemeType {
    actionC: string,
    drawerC: string,
    homeC: string,
    mainC: string,
};

export interface ModalThemeType {
    closeBarC: string,
    shadow: {
        alpha: number,
        color: string,
    },
};

export interface ScreenThemeType {
    bgC: string,
    secondaryBgC: string,
};

export interface TextThemeType {
    labelC: string,
    mainC: string,
    secondaryC: string,
};
