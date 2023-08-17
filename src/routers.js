import EcHeader from './components/EcHeader.vue';
import store from './store';
import EcHome from './views/EcHome.vue';
import EcProduct from './views/Product.vue'
import EcCategory from './views/Category.vue'
import EcSearch from './views/Search.vue'
import EcCart from './views/Cart.vue'
import MyAccount from './views/MyAccount.vue'
import EcCheckout from './views/Checkout.vue'
import EcSuccess from './views/Success.vue'
import IndexPage from './views/IndexPage.vue'

import { createRouter, createWebHistory } from "vue-router";

const routes = [
      {
        name: "IndexPage",
        component: IndexPage,
        path: "/"
      },
      {
        name: "HomePage",
        component: () => import(/* webpackChunkName: "HomePage" */ "@/views/HomePage.vue"),
        path: "/home"
      },
      {
        name: "SignUp",
        component: () => import(/* webpackChunkName: "SignUp" */ "@/components/SignUp.vue"),
        path: "/sign_up"
      },
      {
        name: "LogIn",
        component: () => import(/* webpackChunkName: "LogIn" */ "@/components/LogIn.vue"),
        path: "/login"
      },
      {
        name: "AddPost",
        component: () => import(/* webpackChunkName: "AddPost" */ "@/components/AddPost.vue"),
        path: "/add_post"
      },
      {
        name: "UpdatePost",
        component: () => import(/* webpackChunkName: "UpdatePost" */ "@/components/UpdatePost.vue"),
        path: "/update_post"
      },
      {
        name: "LogOut",
        component: () => import(/* webpackChunkName: "LogOut" */ "@/components/LogOut.vue"),
        path: "/logout"
      },
      {
        name: "UserProfile",
        component: () => import(/* webpackChunkName: "UserProfile" */ "@/components/UserProfile.vue"),
        path: "/user_profile"
      },
      {
        name: "ViewPost",
        component: () => import(/* webpackChunkName: "ViewPost" */ "./components/ViewPost.vue"),
        path: "/view_post/:id"
      },
      {
        name: "ProfileUpdate",
        component: () => import(/* webpackChunkName: "ProfileUpdate" */ "./components/ProfileUpdate.vue"),
        path: "/profile_update"
      },
      {
        path: '/my-account',
        name: 'MyAccount',
        component: MyAccount,
      },
      {
        path: '/search',
        name: 'Search',
        component: EcSearch
      },
      {
        path: '/cart',
        name: 'Cart',
        component: EcCart
      },
      {
        path: '/cart/success',
        name: 'Success',
        component: EcSuccess
      },
      {
        path: '/cart/checkout',
        name: 'Checkout',
        component: EcCheckout,
      },
      {
        path: '/:category_slug/:product_slug',
        name: 'Product',
        component: EcProduct
      },
      {
        path: '/:category_slug',
        name: 'Category',
        component: EcCategory
      },
      {
        path: '/Echome',
        name: 'EcHome',
        component: EcHome
      },
      {
        path: '/echeader',
        name: 'EchHeader',
        component: EcHeader
      },
   
];

const router =  createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active-link"
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
      next({ name: 'LogIn', query: { to: to.path } });
    } else {
      next()
    }
  })

export default router;