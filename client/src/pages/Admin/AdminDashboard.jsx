import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth'

const AdminDashboard = () => {
  const [auth,setAuth] = useAuth()
  return (
    <Layout title={"Admin Dashboard - ecommerce app"}>
        <div className='container m-3 p-3'>
          <div className='grid grid-cols-12'>
            <div className='col-span-12 lg:col-span-3 bg-white p-4 rounded-lg'>
              <AdminMenu/>
            </div>
            <div className='col-span-12 lg:col-span-9'>
              <div className='card w-75 p-3'>
                <h3>Admin Name : {auth?.user?.name}</h3>
                <h3>Admin Email : {auth?.user?.email}</h3>
                <h3>Admin Contact : {auth?.user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard