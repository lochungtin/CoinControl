import moment from 'moment';

import { mix } from './colors';
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

export const parseGoal = (records, goal) => {
    var total = 0;
    var thisMonth = moment().format('MM');

    for (const record of records) {
        if (record.type === 'Expense' && moment(record.date).format('MM') === thisMonth)
            total += record.value
    }

    var exact = goal - total;
    var cut = exact > 0 ? Math.floor(exact) : Math.ceil(exact);
    var decimal = Math.floor((Math.abs(exact) - Math.abs(cut)) * 100);

    return cut + '.' + decimal
}

export const parseGoalPercentage = (total, goal) => {
    if (goal === 0)
        return 1;
    return (goal - total) / goal;
}

export const parseLabel = (records, type, color, bgColor, selection) => {
    var data = [];
    var tally = {};
    var size = 0;

    for (const record of records) {
        if (record.type === type) {
            if (selection.includes(record.category)) {
                if (!Object.keys(tally).includes(record.category))
                    tally[record.category] = 0;
                tally[record.category]++;
                size++;
            }
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

export const parseSector = (records, type, color, bgColor, selection) => {
    var data = [];
    var size = 0;
    var tally = {};

    for (const record of records) {
        if (record.type === type) {
            if (selection.includes(record.category)) {
                if (!Object.keys(tally).includes(record.category))
                    tally[record.category] = 0;
                tally[record.category]++;
                size++;
            }
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

export const parseWeek = (records, type) => {
    var begin = moment().subtract(7, 'days');
    var entries = {};

    for (const record of records) {
        var date = record.date;
        if (!Object.keys(entries).includes(date))
            entries[date] = [];
        if (record.type === type)
            entries[date].push(record);
    }

    var sorted = mergeSort(Object.keys(entries));
    var data = new Array(7);

    for (const entry of sorted) {
        var day = moment(entry);
        if (day.isAfter(begin)) {
            var total = 0;
            for (const record of entries[entry]) {
                total += record.value;
            }
            if (data[day.weekday()] === undefined)
                data[day.weekday()] = total;
        }
        else
            break;
    }

    for (var i = 0; i < 7; i++) {
        if (data[i] === undefined)
            data[i] = 0;
    }

    return data;
}
