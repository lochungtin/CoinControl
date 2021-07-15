import { NumpadBtnProps } from "../types/uiprops";

export const makeGrid = (
    onPressMem: () => void,
    onPressPar: () => void,
    onPressClr: () => void,
    onPressBkS: () => void,
    onPressEql: () => void,
    onPressChr: (chr: string) => void,

): Array<Array<NumpadBtnProps>> => ([
    [
        {
            icon: 'alpha-m',
            isOp: true,
            onPress: onPressMem,
        },
        {
            icon: 'code-parentheses',
            isOp: true,
            onPress: onPressPar,
        },
        {
            icon: 'alpha-c',
            isOp: true,
            onPress: onPressClr,
        },
        {
            icon: 'backspace-outline',
            isOp: false,
            onPress: onPressBkS,
        },
    ],
    [
        {
            icon: 'numeric-7',
            isOp: false,
            onPress: () => onPressChr('7'),
        },
        {
            icon: 'numeric-8',
            isOp: false,
            onPress: () => onPressChr('8'),
        },
        {
            icon: 'numeric-9',
            isOp: false,
            onPress: () => onPressChr('9'),
        },
        {
            icon: 'division-box',
            isOp: true,
            onPress: () => onPressChr('/'),
        },
    ],
    [
        {
            icon: 'numeric-4',
            isOp: false,
            onPress: () => onPressChr('4'),
        },
        {
            icon: 'numeric-5',
            isOp: false,
            onPress: () => onPressChr('5'),
        },
        {
            icon: 'numeric-6',
            isOp: false,
            onPress: () => onPressChr('6'),
        },
        {
            icon: 'multiplication-box',
            isOp: true,
            onPress: () => onPressChr('*'),
        },
    ],
    [
        {
            icon: 'numeric-1',
            isOp: false,
            onPress: () => onPressChr('1'),
        },
        {
            icon: 'numeric-2',
            isOp: false,
            onPress: () => onPressChr('2'),
        },
        {
            icon: 'numeric-3',
            isOp: false,
            onPress: () => onPressChr('3'),
        },
        {
            icon: 'minus-box',
            isOp: true,
            onPress: () => onPressChr('-'),
        },
    ],
    [
        {
            icon: 'decimal',
            isOp: false,
            onPress: () => onPressChr('.'),
        },
        {
            icon: 'numeric-0',
            isOp: false,
            onPress: () => onPressChr('0'),
        },
        {
            icon: 'equal-box',
            isOp: false,
            onPress: () => onPressEql(),
        },
        {
            icon: 'plus-box',
            isOp: true,
            onPress: () => onPressChr('+'),
        },
    ],
]);
