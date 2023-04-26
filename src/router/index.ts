import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import RetailPriceSetting from '@/views/RetailPriceSetting/RetailPriceSetting.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/retail-price'
  },
  {
    // desc:"零售价",
    path: '/retail-price',
    component: RetailPriceSetting,
    children: [
      {
        path: '',
        meta: { navTitle: "零售价配置" },
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'base',
        meta: { navTitle: "基础信息" },
        component: () => import('@/views/RetailPriceSetting/BaseInfoSetting.vue'),
      },
      {
        path: 'machine-choice',
        meta: { navTitle: "选择机器" },
        component: () => import('@/views/RetailPriceSetting/MachineChoice.vue'),
      },
      {
        path: 'price-adjust',
        meta: { navTitle: "商品调价" },
        component: () => import('@/views/RetailPriceSetting/PriceAdjust.vue'),
      },
      {
        path: 'setting-preview',
        meta: { navTitle: "调价预览" },
        component: () => import('@/views/RetailPriceSetting/SettingPreview.vue'),
      },
      {

        path: 'search-goods',
        meta: { navTitle: "搜索商品" },
        component: () => import('@/views/RetailPriceSetting/SearchGoods.vue'),
      },
    ]
  },
  {
    // desc: "建议零售价",
    path: '/advice-retail-price',

    component: () => import('@/views/AdviceRetailPriceSetting/AdviceRetailPriceSetting.vue'),
    children: [
      {
        path: '',
        meta: { navTitle: "建议零售价申请" },
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'base',
        meta: { navTitle: "基础信息" },
        component: () => import('@/views/AdviceRetailPriceSetting/BaseInfoSetting.vue'),
      },
      {
        path: 'price-setting',
        meta: { navTitle: "配置建议零售价" },
        component: () => import('@/views/AdviceRetailPriceSetting/PriceSetting.vue'),
      },
      {

        path: 'setting-preview',
        meta: { navTitle: "调价预览" },
        component: () => import('@/views/AdviceRetailPriceSetting/SettingPreview.vue'),
      },
      {

        path: 'search-goods',
        meta: { navTitle: "搜索商品" },
        component: () => import('@/views/AdviceRetailPriceSetting/SearchGoods.vue'),
      },
    ]
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, form, next) => {
  window.document.title = `${to.meta?.navTitle ?? '价格设置'}`
  next()
})
export default router
