import { mix } from '../functions/colorMixer';
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

export const parseSector = (records, type, color, bgColor) => {
    var data = [];
    var tally = {};
    var size = 0;

    for (const record of records) {
        if (record.type === type) {
            if (!Object.keys(tally).includes(record.category))
                tally[record.category] = 0;
            tally[record.category]++;
            size++;
        }
    }

    var categories = Object.keys(tally);
    for (var i = 0; i < categories.length; i++) {
        var color = mix(color, bgColor, (categories.length - i) / categories.length);
        data.push({
            color: color,
            percentage: tally[categories[i]] / size * 100,
        });
    }

    return data;
}

export const parseLabel = (records, type, color, bgColor) => {
    var data = [];
    var tally = {};
    var size = 0;

    for (const record of records) {
        if (record.type === type) {
            if (!Object.keys(tally).includes(record.category))
                tally[record.category] = 0;
            tally[record.category]++;
            size++;
        }
    }

    var categories = Object.keys(tally);
    for (var i = 0; i < categories.length; i++) {
        var color = mix(color, bgColor, (categories.length - i) / categories.length);
        data.push({
            category: categories[i],
            color: color,
            percentage: tally[categories[i]] / size * 100,
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