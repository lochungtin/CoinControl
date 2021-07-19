import { ColorPickerDataType } from '../types/color';

// colors
export const ACCENT: string = '#00FFB2';
export const BLACK: string = '#000000';
export const ICONS: string = '#C4C4C4';
export const GREY: string = '#838383';
export const WHITE: string = '#FFFFFF';

const rand = (max: number): number => Math.floor(Math.random() * max) % max;

export const pickRandom = (): string => {
    let group: string = Object.keys(colorPickerData)[rand(6)];
    let pos: string = ['a', 'b', 'c', 'd', 'e'][rand(5)];

    return colorPickerData[group][pos].hex;
}

// color picker data
export const colorPickerData: ColorPickerDataType = {
    blues: {
        a: {
            hex: '#23BCD1',
            pos: {
                x: 302,
                y: 94,
            },
        },
        b: {
            hex: '#237ED1',
            pos: {
                x: 302,
                y: 145,
            },
        },
        c: {
            hex: '#235CB1',
            pos: {
                x: 302,
                y: 196,
            },
        },
        d: {
            hex: '#6ABAC5',
            pos: {
                x: 259,
                y: 119,
            },
        },
        e: {
            hex: '#5B99D2',
            pos: {
                x: 259,
                y: 170,
            },
        },
    },
    greens: {
        a: {
            hex: '#00FFB2',
            pos: {
                x: 170,
                y: 18,
            },
        },
        b: {
            hex: '#23D1B2',
            pos: {
                x: 215,
                y: 44,
            },
        },
        c: {
            hex: '#23D1C7',
            pos: {
                x: 259,
                y: 70,
            },
        },
        d: {
            hex: '#96F2A0',
            pos: {
                x: 170,
                y: 68,
            },
        },
        e: {
            hex: '#7BD1C2',
            pos: {
                x: 215,
                y: 94,
            },
        },
    },
    oranges: {
        a: {
            hex: '#DB7D48',
            pos: {
                x: 38,
                y: 246,
            },
        },
        b: {
            hex: '#DEA44D',
            pos: {
                x: 38,
                y: 196,
            },
        },
        c: {
            hex: '#FAD34A',
            pos: {
                x: 38,
                y: 145,
            },
        },
        d: {
            hex: '#EA7E5C',
            pos: {
                x: 81,
                y: 221,
            },
        },
        e: {
            hex: '#E9C466',
            pos: {
                x: 81,
                y: 170,
            },
        },
    },
    reds: {
        a: {
            hex: '#C21889',
            pos: {
                x: 170,
                y: 322,
            },
        },
        b: {
            hex: '#C21860',
            pos: {
                x: 125,
                y: 296,
            },
        },
        c: {
            hex: '#DB4848',
            pos: {
                x: 81,
                y: 271,
            },
        },
        d: {
            hex: '#C7558C',
            pos: {
                x: 170,
                y: 271,
            },
        },
        e: {
            hex: '#E96767',
            pos: {
                x: 125,
                y: 246,
            },
        },
    },
    violets: {
        a: {
            hex: '#7023D1',
            pos: {
                x: 302,
                y: 246,
            },
        },
        b: {
            hex: '#8F23D1',
            pos: {
                x: 259,
                y: 271,
            },
        },
        c: {
            hex: '#C323D1',
            pos: {
                x: 215,
                y: 296,
            },
        },
        d: {
            hex: '#6C46BC',
            pos: {
                x: 259,
                y: 221,
            },
        },
        e: {
            hex: '#BC53E0',
            pos: {
                x: 215,
                y: 246,
            },
        },
    },
    yellows: {
        a: {
            hex: '#FFC700',
            pos: {
                x: 38,
                y: 96,
            },
        },
        b: {
            hex: '#FFE600',
            pos: {
                x: 81,
                y: 68,
            },
        },
        c: {
            hex: '#BDFF00',
            pos: {
                x: 125,
                y: 44,
            },
        },
        d: {
            hex: '#FFEE53',
            pos: {
                x: 81,
                y: 119,
            },
        },
        e: {
            hex: '#C8EC62',
            pos: {
                x: 125,
                y: 94,
            },
        },
    },
}
