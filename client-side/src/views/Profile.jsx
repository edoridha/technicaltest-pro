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
    }, [])

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
            <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Welcome {profile.fullName}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    </div>
                </div>
            </nav>
            <h1>Profile</h1>
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Birthday:</strong> {new Date(profile.birthday).toLocaleDateString()}</p>
            <p><strong>Join Date:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
    )
}
