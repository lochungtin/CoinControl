export const mix = (foreground, background, alpha) => {
    const rF = parseInt(foreground.substring(1, 3), 16);
    const gF = parseInt(foreground.substring(3, 5), 16);
    const bF = parseInt(foreground.substring(5, 7), 16);

    const rB = parseInt(background.substring(1, 3), 16);
    const gB = parseInt(background.substring(3, 5), 16);
    const bB = parseInt(background.substring(5, 7), 16);

    const rR = Math.floor(rF * alpha + rB * (1 - alpha));
    const gR = Math.floor(gF * alpha + gB * (1 - alpha));
    const bR = Math.floor(bF * alpha + bB * (1 - alpha));

    return '#' + rR.toString(16) + gR.toString(16) + bR.toString(16);
}

export const str2rgb = string => {
    const r = parseInt(string.substring(1, 3), 16);
    const g = parseInt(string.substring(3, 5), 16);
    const b = parseInt(string.substring(5, 7), 16);

    return [r, g, b];
}