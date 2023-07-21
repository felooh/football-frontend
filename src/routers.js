import HomePage from "./views/HomePage.vue";
import SignUp from "./components/SignUp.vue";
import LogIn from "./components/LogIn.vue";
import AddPost from "./components/AddPost.vue";
import UpdatePost from "./components/UpdatePost.vue";
import LogOut from "./components/LogOut.vue";
import UserProfile from "./components/UserProfile.vue";
import ViewPost from "./components/ViewPost.vue";
import ProfileUpdate from "./components/ProfileUpdate.vue";
import EcHeader from './components/EcHeader.vue'

import store from './store'

import EcHome from './views/EcHome.vue'

import EcProduct from './views/Product.vue'
import EcCategory from './views/Category.vue'
import EcSearch from './views/Search.vue'
import EcCart from './views/Cart.vue'
import MyAccount from './views/MyAccount.vue'
import EcCheckout from './views/Checkout.vue'
import EcSuccess from './views/Success.vue'


import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "HomePage",
        component: HomePage,
        path:"/"
    },
    {
        name: "SignUp",
        component: SignUp,
        path:"/sign_up"
    },
    {
        name: "LogIn",
        component: LogIn,
        path:"/login"
    },
    {
        name: "AddPost",
        component: AddPost,
        path:"/add_post"
    },
    {
        name: "Update",
        component: UpdatePost,
        path:"/update_post"
    },
    {
        name: "LogOut",
        component: LogOut,
        path:"/logout"
    },
    {
        name: "UserProfile",
        component: UserProfile,
        path:"/user_profile"
    },
    {
        name: "ViewPost",
        component: ViewPost,
        path:"/view_post/:id"
    },
    {
        name: "ProfileUpdate",
        component: ProfileUpdate,
        path:"/profile_update"
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
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
      next({ name: 'LogIn', query: { to: to.path } });
    } else {
      next()
    }
  })

export default router;