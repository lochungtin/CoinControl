import { mergeSort } from './mergeSort';

export const parseAll = records => {
    var data = [];
    var entries = {};

    for (const record of records) {
        var date = record.date;
        if (!Object.keys(entries).includes(date)) 
            entries[date] = [];
        entries[date].push(record);
    }

    var sorted = mergeSort(Object.keys(entries));

    for (const entry of sorted) {
        data.push({
            title: entry,
            data: entries[entry]
        });
    }

    return data;
}

export const parseTotal = records => {
    var total = 0;
    for (const record of records) {
        if (record.type === 'Expense')
            total -= record.value;
        else
            total += record.value;
    }
    return total;
}