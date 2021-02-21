section = () => Math.floor((1 + Math.random() * 0x10000)).toString(16);

export const RNKey = () => section() + section() + '-' + section() + section();