import {cuccRequest, localCuccRequest, testCuccRequest} from '@/utils/cuccRequest'
// import localCuccRequest from '@/utils/cuccRequest'


export function getHtDataBl (data) {
  return cuccRequest({
    url: 'production/totalVol',
    method: 'get',
    params: data
  })
}

export function getHtData (data) {
  return cuccRequest({
    url: 'newContractByType',
    method: 'get',
    params: data
  })
}

export function getProReal (data) {
  return cuccRequest({
    url: 'ProReal',
    method: 'get',
    params: data
  })
}

export function getProPlan (data) {
  return cuccRequest({
    url: 'ProPlan',
    method: 'get',
    params: data
  })
}

export function getWeather (data) {
  return testCuccRequest({
    url: '/main/getWeather',
    method: 'get',
    params: data
  })
}

export function getPostEquipment (data) {
  return localCuccRequest({
    url: '/main/postEquipmentRepair',
    method: 'get',
    params: data
  })
}

export function getYearBackMoney (data) {
  return localCuccRequest({
    url: '/main/getAnnualReceipt',
    method: 'get',
    params: data
  })
}

export function getTodayInfo (data) {
  return localCuccRequest({
    url: '/main/getTodayInfo',
    method: 'get',
    params: data
  })
}

export function queryDailyData(query) {
  return cuccRequest({
    url: '/production/summaryRealTime',
    method: 'get',
    params: query
  })
}

export function summaryInYear(query) {
  return cuccRequest({
    url: '/production/summaryInYear',
    method: 'get',
    params: query
  })
}

export function summaryMixingStationInYear(query) {
  return cuccRequest({
    url: '/production/summaryMixingStationInYear',
    method: 'get',
    params: query
  })
}

export function summaryMixingStationInMonth(query) {
  return cuccRequest({
    url: '/production/summaryMixingStationInMonth',
    method: 'get',
    params: query
  })
}

export function deliverGoods(query) {
  return cuccRequest({
    url: '/production/deliverGoodsInYear',
    method: 'get',
    params: query
  })
}

export function deliverGoodsByGood(query) {
  return cuccRequest({
    url: '/production/deliverGoodsByGood',
    method: 'get',
    params: query
  })
}

export function blockTest(query) {
  return cuccRequest({
    url: '/quality/blockTest',
    method: 'get',
    params: query
  })
}

export function currentMonthDeliver(query) {
  return cuccRequest({
    url: '/production/currentMonthDeliver',
    method: 'get',
    params: query
  })
}


export function threeWarning(query) {
  return cuccRequest({
    url: '/early_warning/statistics',
    method: 'get',
    params: query
  })
}

export function earlyWarningTotal(query) {
  return cuccRequest({
    url: '/early_warning/list_total',
    method: 'get',
    params: query
  })
}

export function earlyWarningList(query) {
  return cuccRequest({
    url: '/early_warning/list',
    method: 'get',
    params: query
  })
}

export function getCarList(query) {
  return cuccRequest({
    url: '/carWarning',
    method: 'get',
    params: query
  })
}


export function customerTop10(query) {
  return cuccRequest({
    url: '/sale/customerTop10',
    method: 'get',
    params: query
  })
}

export function salesVolumeByMonth(query) {
  return cuccRequest({
    url: '/sale/salesVolumeByMonth',
    method: 'get',
    params: query
  })
}

export function saleOrderByMonth(query) {
  return localCuccRequest({
    url: '/sale/orderByMonth',
    method: 'get',
    params: query
  })
}

export function paymentCollection(query) {
  return cuccRequest({
    url: '/sale/paymentCollection',
    method: 'get',
    params: query
  })
}

export function countNewOrder(query) {
  return cuccRequest({
    url: '/sale/countNewOrder',
    method: 'get',
    params: query
  })
}

export function contractNotClosed(query) {
  return cuccRequest({
    url: '/sale/contractNotClosed',
    method: 'get',
    params: query
  })
}

export function orderByMonth(query) {
  return cuccRequest({
    url: '/sale/orderByMonth',
    method: 'get',
    params: query
  })
}

export function paymentCollectionThisMonth(query) {
  return cuccRequest({
    url: '/sale/paymentCollectionThisMonth',
    method: 'get',
    params: query
  })
}

export function paymentCollectionByMonth(query) {
  return cuccRequest({
    url: '/sale/paymentCollectionByMonth',
    method: 'get',
    params: query
  })
}

export function orderByArea(query) {
  return cuccRequest({
    url: '/sale/orderByArea',
    method: 'get',
    params: query
  })
}

export function salesVolumeByContract(query) {
  return cuccRequest({
    url: '/sale/salesVolumeByContract',
    method: 'get',
    params: query
  })
}

export function salesVolumeByArea(query) {
  return cuccRequest({
    url: '/sale/salesVolumeByArea',
    method: 'get',
    params: query
  })
}

export function averagePriceByMonth(query) {
  return cuccRequest({
    url: '/sale/averagePriceByMonth',
    method: 'get',
    params: query
  })
}

export function averagePriceByArea(query) {
  return cuccRequest({
    url: '/sale/averagePriceByArea',
    method: 'get',
    params: query
  })
}

export function averageGradeByMonth(query) {
  return cuccRequest({
    url: '/sale/averageGradeByMonth',
    method: 'get',
    params: query
  })
}
