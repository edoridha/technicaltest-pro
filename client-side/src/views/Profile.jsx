import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../store/actions'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.memberList.profile)
    const loading = useSelector(state => state.memberList.loading)
    const error = useSelector(state => state.memberList.error)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Something Went Wrong...</h1>
    }

    return (
        <div>
            <h1>Profile</h1>
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Birthday:</strong> {new Date(profile.birthday).toLocaleDateString()}</p>
            <p><strong>Join Date:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
