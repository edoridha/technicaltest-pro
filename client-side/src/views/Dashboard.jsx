import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers } from '../store/actions'
import TableMember from '../components/Table'
import { useLocation } from 'react-router-dom';


export default function Dashboard() {
  const dispatch = useDispatch()
  const memberList = useSelector(state => state.memberList.list)
  const loading = useSelector(state => state.memberList.loading)
  const error = useSelector(state => state.memberList.error)
  const currentPage = useSelector((state) => state.memberList.currentPage)
  const totalItem = useSelector((state) => state.memberList.totalItem)
  const startItem = useSelector((state) => state.memberList.startItem)
  const endItem = useSelector((state) => state.memberList.endItem)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const page = queryParams.get("page") || "0"
  const limit = queryParams.get("limit") || "10"
  const sortBy = queryParams.get("sortBy") || null
  const sortOrder = queryParams.get("sortOrder") || null

  useEffect(() => {
    dispatch(fetchMembers({ page, limit, sortBy, sortOrder }))

  }, [dispatch, page, limit, sortBy, sortOrder, location.search])


  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Something Went Wrong...</h1>
  }
  return (
    <div className='container mt-3'>
            <div className='row'>
                <div className='col-12'>
                <h1 style={{ fontFamily: 'Sarala, sans-serif' }}>Admin Dashboard</h1>
                </div>
                <div className='col-12'>
                    <TableMember memberList={memberList} currentPage={currentPage} totalItem={totalItem} startItem={startItem} endItem={endItem} />
                </div>
            </div>
        </div>
  )
}
