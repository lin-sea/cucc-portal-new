import { cuccRequest, localCuccRequest,cucc1Request } from '@/utils/cuccRequest'

export function getMonthBack(data) {
    return localCuccRequest({
        url: `/main/getMonthBack?sitename=${data.sitename}`,
        method: 'get',
    })
}

export function getMonthProd(data) {
    return cuccRequest({
        url: '/production/summaryMixingStationInMonth',
        method: 'get',
        params: data
    })
}

export function getYearProd(data) {
    return cuccRequest({
        url: '/production/summaryMixingStationInYear',
        method: 'get',
        params: data
    })
}

export function summaryMixingStationByHour(query) {
    return cuccRequest({
        url: '/production/summaryMixingStationByHour',
        method: 'get',
        params: query
    })
}

export function summaryRealTimeInMixingStation(data) {
    return cucc1Request({
        url: `/production/summaryRealTimeInMixingStation?mixingStation=${data.mixingStation}`,
        method: 'get',
    })
}

export function summaryInYearByMixingStation(query) {
    return cuccRequest({
        url: '/production/summaryInYearByMixingStation',
        method: 'get',
        params: query
    })
}

export function summaryInMonthByMixingStation(query) {
    return cuccRequest({
        url: '/production/summaryInMonthByMixingStation',
        method: 'get',
        params: query
    })
}

export function blockTestInMixingStation(query) {
    return cucc1Request({
        url: '/quality/blockTestInMixingStation',
        method: 'get',
        params: query
    })
}

export function stockInMixingStationByMaterial(query) {
    return cuccRequest({
        url: '/stock/stockInMixingStationByMaterial',
        method: 'get',
        params: query
    })
}

export function warningQueryList(query) {
    return cuccRequest({
        url: '/early_warning/queryList',
        method: 'get',
        params: query
    })
}