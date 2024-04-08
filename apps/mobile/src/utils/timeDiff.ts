import moment from 'moment';

export function timeDiff(date: Date) {
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
