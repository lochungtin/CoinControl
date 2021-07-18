// color picker //
export interface ColorPickerDataType {
    [index: string]: ColorPickerSectorDataType,
}

export interface ColorPickerSectorDataType {
    [index: string]: ColorPickerCellDataType,
}

export interface ColorPickerCellDataType {
    hex: string,
    pos: {
        x: number,
        y: number,
    },
}

// theme //
export interface StaticThemeType {
    accentC: string,
    icon: IconThemeType,
    secondaryC: string,
}

export interface ThemeType {
    dynamic: {
        modal: ModalThemeType,
        percentageTrackC: string,
        screen: ScreenThemeType,
        text: TextThemeType,
    },
    static: StaticThemeType,
}

// dynamic
export interface IconThemeType {
    actionC: string,
    drawerC: string,
    homeC: string,
    mainC: string,
}

export interface ModalThemeType {
    closeBarC: string,
    shadow: {
        alpha: number,
        color: string,
    },
}

export interface ScreenThemeType {
    bgC: string,
    secondaryBgC: string,
}

export interface TextThemeType {
    contrastC: string,
    labelC: string,
    mainC: string,
    secondaryC: string,
}
