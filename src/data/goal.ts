import { GoalMap } from '../types/data';

export enum Goal {
    DAILY,
    WEEKLY,
    MONTHLY,
    NONE,
}

export const goals: GoalMap = {
    0: {
        name: 'Daily',
        text: 'left for the day',
    },
    1: {
        name: 'Weekly',
        text: 'left for the week',
    },
    2: {
        name: 'Monthly',
        text: 'left for the month',
    },
    3: {
        name: 'None',
        text: 'No goal set',
    },
}
