import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import EditNote from './components/EditNote.jsx'
import Home from './components/Home.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
          path: "/",
          element: <Home />,
      },
      {
          path: "/login",
          element: (
            <Login />
          ),
      },
      {
          path: "/signup",
          element: (
            <Signup />
          ),
      },
      {
          path: "/edit-note/:slug",
          element: (
            <EditNote />
          ),
      },
  ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
