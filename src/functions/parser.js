export const parseAll = records => {

    var total = 0;

    for (const record of records) {
        if (record.type === 'Expense')
            total -= record.value;
        else
            total += record.value;
    }

    return total;
}