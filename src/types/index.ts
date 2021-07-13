
// color //

export interface ColorPickerDataType {
    blues: ColorPickerSectorDataType,
    greens: ColorPickerSectorDataType,
    oranges: ColorPickerSectorDataType,
    reds: ColorPickerSectorDataType,
    violets: ColorPickerSectorDataType,
    yellows: ColorPickerSectorDataType,
}

export interface ColorPickerSectorDataType {
    a: ColorPickerCellDataType,
    b: ColorPickerCellDataType,
    c: ColorPickerCellDataType,
    d: ColorPickerCellDataType,
    e: ColorPickerCellDataType,
}

export interface ColorPickerCellDataType {
    hex: string,
    pos: {
        x: number,
        y: number,
    },
}

export interface TextThemeType {
    disabled: string,
    label: string,
    main: string,
    placeholder: string,
}

export interface ThemeType {
    accent: string,
    text: TextThemeType,
}

