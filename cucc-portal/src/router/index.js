import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import DetailPage from '@/components/DetailPage'
import SiteInformation from '@/components/SiteInformation'
import SiteInformationRight from '@/components/SiteInformationRight'
import BlankPage from '@/components/BlankPage'
import Weather from '@/components/Weather'
import Test from '@/components/TestPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage
    },
    {
      path: '/siteInformation',
      name: 'SiteInformation',
      component: SiteInformation
    },
    {
      path: '/siteInformationRight',
      name: 'SiteInformationRight',
      component: SiteInformationRight
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/blankPage',
      name: 'blankPage',
      component: BlankPage
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    }
  ]
})
