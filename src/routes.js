import HomePage from './components/app/HomePage'
import Contact from './components/app/pages/Contact'
import WorkDetail from './components/app/pages/WorkDetail'
import Login from './components/admin/auth/Login'
import Logout from './components/admin/auth/Logout'
import Register from './components/admin/auth/Register'
import Dashboard from './components/admin/Dashboard'
import ListWork from './components/admin/work/ListWork'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  { 
    path: '/work/:id', 
    name: 'work',
    component: WorkDetail,
  },
  {
    path: '/admin/login',
    name: 'login',
    component: Login,
    props: true,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/admin/register',
    name: 'register',
    component: Register,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/admin/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin/work',
    name: 'list-work',
    component: ListWork,
    meta: {
      requiresAuth: true,
    }
  }
]

export default routes
