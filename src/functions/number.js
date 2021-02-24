export const display = val => {
    const splt = val.toString().split('.');
    if (splt.length === 1)
        return val + '.00';
    if (splt[1].length === 1)
        return val + '0';
    else
        return splt[0] + '.' + splt[1].substring(0, 2);
}