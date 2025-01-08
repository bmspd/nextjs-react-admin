'use client'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const AdminApp = dynamic(() => import('@/app/admin/components/admin-app'), { ssr: false })

const AdminPage: NextPage = () => <AdminApp />

export default AdminPage
