import Vue from 'vue'
import Router from 'vue-router'

import AppComponent from './App';
import UserTypePage from '@/views/UserType'
import CarrierPage from '@/views/Carrier'
import InvoiceFactoringCompanyPage from '@/views/InvoiceFactoringCompany/Index'
import InvoicesPage from '@/views/InvoiceFactoringCompany/Invoices'
import InvoiceDetailPage from '@/views/InvoiceFactoringCompany/Details'
import ShipperIndexPage from '@/views/Carrier/Index'
import ShipperInvoiceDetailPage from '@/views/Carrier/Invoice'
import Home from '@/views/Home'
import AuthPage from '@/views/Auth'
import SigninPage from '@/views/auth/Signin'
import SignupPage from '@/views/auth/Signup'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: AppComponent
    },
    {
      path: '/user-type',
      name: 'UserTypePage',
      component: UserTypePage
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthPage,
      children: [
        {
          path: 'signin',
          name: 'SigninPage',
          component: SigninPage
        },
        {
          path: 'signup',
          name: 'SignupPage',
          component: SignupPage
        }
      ]
    },
    {
      path: '/carrier',
      name: 'CarrierPage',
      component: CarrierPage,
      children: [
        {
          path: 'invoices',
          name: 'ShipperIndexPage',
          component: ShipperIndexPage
        },
        {
          path: 'invoice/:invoiceId',
          name: 'ShipperInvoiceDetailPage',
          component: ShipperInvoiceDetailPage
        }
      ]
    },
    {
      path: '/invoice',
      name: 'CarrierPage',
      component: CarrierPage,
      children: [
        {
          path: 'invoices',
          name: 'InvoicesPage',
          component: InvoicesPage
        },
        {
          path: ':invoiceId',
          name: 'InvoiceDetailPage',
          component: InvoiceDetailPage
        }
      ]
    }
  ],
  mode: 'history'
})

export default router;