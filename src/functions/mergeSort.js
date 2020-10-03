import moment from 'moment';
moment().format();

export const mergeSort = unsorted => {
    const list = [...unsorted];
    const half = list.length / 2;
    if (list.length < 2) 
        return list;

    const left = list.splice(0, half);

    return merge(mergeSort(left), mergeSort(list));
}

const merge = (left, right) => {
    let list = [];

    while (left.length && right.length) {
        const leftMoment = moment(left[0]);
        const rightMoment = moment(right[0]);
        if (leftMoment.isAfter(rightMoment)) 
            list.push(left.shift());
        else 
            list.push(right.shift());
    }

    return [...list, ...left, ...right];
}