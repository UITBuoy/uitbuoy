import moment from 'moment';

export function timeDiffString(date: Date) {
    if (moment().diff(date, 'minutes') < 60) {
        return `${moment().diff(date, 'minutes')} phút trước`;
    }

    if (moment().diff(date, 'hours') < 24) {
        return `${moment().diff(date, 'hours')} giờ trước`;
    }

    if (moment().diff(date, 'days') < 30) {
        return `${moment().diff(date, 'days')} ngày trước`;
    }

    return `${moment().diff(date, 'months')} tháng trước`;
}

export function timeDiff(date: Date) {
    if (Math.abs(moment().diff(date, 'minutes')) < 60) {
        return {
            time: Math.abs(moment().diff(date, 'minutes')),
            type: 'phút',
            abbr: 'm',
        };
    }

    if (Math.abs(moment().diff(date, 'hours')) < 24) {
        return {
            time: Math.abs(moment().diff(date, 'hours')),
            type: 'tiếng',
            abbr: 'h',
        };
    }

    if (Math.abs(moment().diff(date, 'days')) < 60) {
        return {
            time: Math.abs(moment().diff(date, 'days')),
            type: 'ngày',
            abbr: 'd',
        };
    }

    return {
        time: Math.abs(moment().diff(date, 'month')),
        type: 'tháng',
        abbr: 'M',
    };
}
