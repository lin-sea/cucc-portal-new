import moment from 'moment';

export function getMoment (){
    return moment;
}

export function getToday (){
    return moment(new Date()).format('YYYY-MM-DD');
}

export function getMonth (){
    return moment(new Date()).format('YYYY-MM');
}

export function getYear (){
    return moment(new Date()).format('YYYY');
}