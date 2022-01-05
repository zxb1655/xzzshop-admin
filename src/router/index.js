import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/welcome',
      component: () => import('@/components/DashboardPage'),
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: () => import('@/components/WelcomePage')
        },
        {
          path: 'goods',
          name: 'goods',
          component: () => import('@/components/Goods/GoodsPage')
        },
        {
          path: 'goods/add',
          name: 'goods_add',
          component: () => import('@/components/Goods/GoodsAddPage')
        },
        {
          path: 'nature',
          name: 'nature',
          component: () => import('@/components/Nature/NaturePage')
        },
        {
          path: 'specification/detail',
          name: 'specification_detail',
          component: () => import('@/components/Specification/SpecificationAddPage')
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('@/components/Category/CategoryPage')
        },
        {
          path: 'category/add',
          name: 'category_add',
          component: () => import('@/components/Category/CategoryAddPage')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/components/Order/OrderPage')
        },
        {
          path: 'order/detail',
          name: 'order_detail',
          component: () => import('@/components/Order/OrderDetailPage')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('@/components/User/UserPage')
        },
        {
          path: 'user/add',
          name: 'user_add',
          component: () => import('@/components/User/UserAddPage')
        },
        {
          path: 'shipper',
          name: 'shipper',
          component: () => import('@/components/Shipper/ShipperPage')
        },
        {
          path: 'shipper/list',
          name: 'shipper_list',
          component: () => import('@/components/Shipper/ShipperListPage')
        },
        {
          path: 'shipper/add',
          name: 'shipper_add',
          component: () => import('@/components/Shipper/ShipperAddPage')
        },
        {
          path: 'freight',
          name: 'freight',
          component: () => import('@/components/Freight/FreightPage')
        },
        {
          path: 'except_area',
          name: 'except_area',
          component: () => import('@/components/Freight/ExceptAreaPage')
        },
        {
          path: 'except_area/add',
          name: 'except_area_add',
          component: () => import('@/components/Freight/ExceptAreaAddPage')
        },
        {
          path: 'freight/add',
          name: 'freight_add',
          component: () => import('@/components/Freight/FreightAddPage')
        },
        {
          path: 'notice',
          name: 'notice',
          component: () => import('@/components/Settings/NoticePage')
        },
        {
          path: 'ad',
          name: 'ad',
          component: () => import('@/components/Ad/AdPage')
        },
        {
          path: 'ad/add',
          name: 'ad_add',
          component: () => import('@/components/Ad/AdAddPage')
        },
        {
          path: 'comment',
          name: 'comment',
          component: () => import('@/components/Comment/ComPage')
        },
        {
          path: 'comment/add',
          name: 'comment_add',
          component: () => import('@/components/Comment/ComAddPage')
        },
        {
          path: 'shopcart',
          name: 'shopcart',
          component: () => import('@/components/ShopCart/ShopCartPage')
        },
        {
          path: 'keywords',
          name: 'keywords',
          component: () => import('@/components/Keywords/KeywordsPage')
        },
        {
          path: 'keywords/add',
          name: 'keywords_add',
          component: () => import('@/components/Keywords/KeywordsAddPage')
        },
        {
          path: 'goodsgalleryedit',
          name: 'goodsgalleryedit',
          component: () => import('@/components/GoodsGallery/GoodsGalleryEditPage')
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('@/components/Admin/AdminPage')
        },
        {
          path: 'admin/add',
          name: 'admin_add',
          component: () => import('@/components/Admin/AdminAddPage')
        },
        {
          path: 'settings/showset',
          name: 'showset',
          component: () => import('@/components/Showset/ShowSetPage')
        }
      ]
    },
    {
      path: '/wap',
      name: 'wap',
      component: () => import('@/components/WapPage'),
      children: [
        {
          path: '/',
          name: 'goods',
          component: () => import('@/components/Wap/GoodsPage')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/components/Wap/OrderPage')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/LoginPage')
    },
    {
      path: '*',
      redirect: '/dashboard'
    }
  ]
})
