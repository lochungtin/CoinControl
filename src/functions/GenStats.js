import moment from 'moment';

import { display } from './number';

export const update = data => {
    let output = {
        categories: {
            expense: {},
            income: {},
        },
        recent: {
            expense: [0, 0, 0, 0, 0, 0, 0],
            income: [0, 0, 0, 0, 0, 0, 0],
        },
        total: {
            expense: 0,
            expenseTotal: 0,
            income: 0,
            incomeTotal: 0,
        },
    };

    Object.keys(data).forEach(day => {
        const tdyMoment = moment();
        const dayMoment = moment(day, "YYYY-MM-DD");

        const recent = moment(dayMoment).add(8, 'day').isAfter(tdyMoment);

        Object.keys(data[day]).forEach(key => {
            const record = data[day][key];

            // totals
            output.total.expense += (record.type === 'Expense') * record.value;
            output.total.income += (record.type === 'Income') * record.value;
            output.total.expenseTotal += (record.type === 'Expense') * 1;
            output.total.incomeTotal += (record.type === 'Income') * 1;

            // 7 day cashflow
            if (recent) {
                output.recent.expense[tdyMoment.diff(dayMoment, 'd')] += (record.type === 'Expense') * record.value;
                output.recent.income[tdyMoment.diff(dayMoment, 'd')] += (record.type === 'Income') * record.value;
            }

            // categories
            const cat = record.type.toLowerCase();
            if (!output.categories[cat][record.catKey])
                output.categories[cat][record.catKey] = {
                    accumulator: 0,
                    counter: 0,
                };

            output.categories[cat][record.catKey].accumulator += record.value;
            output.categories[cat][record.catKey].counter++;

            // round to two decimal places
            output.total.expense = display(output.total.expense)
            output.total.income = display(output.total.income)
        });
    });

    return output;
}