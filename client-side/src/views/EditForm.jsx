import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import useHookUser from '../hooks/useHookUser';
import { getMemberById } from '../store/actions';

export default function EditForm() {
    const navigate = useNavigate();
    const { editMember } = useHookUser();
    const { id } = useParams()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        birthDate: {
            day: '',
            month: '',
            year: '',
        },
        gender: '',
    });

    const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => i + 1));

    const member = useSelector((state) => state.memberList.member)
    const loading = useSelector((state) => state.memberList.loading)
    const error = useSelector((state) => state.memberList.error)

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    useEffect(() => {
        dispatch(getMemberById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (member) {
            const birthDate = new Date(member.birthday);
            setForm({
                fullName: member.fullName,
                email: member.email,
                birthDate: {
                    day: birthDate.getDate(),
                    month: birthDate.getMonth() + 1,
                    year: birthDate.getFullYear()
                },
                gender: member.gender
            });
        }
    }, [member]);

    useEffect(() => {
        const { month, year } = form.birthDate;
        if (month && year) {
            const daysInMonth = new Date(year, month, 0).getDate();
            setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
        }
    }, [form.birthDate.month, form.birthDate.year]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'day' || name === 'month' || name === 'year') {
            setForm({
                ...form,
                birthDate: {
                    ...form.birthDate,
                    [name]: value,
                },
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    };

    const notify = (string) => toast(string)

    const handleEdit = async (e) => {
        try {
            e.preventDefault();
            const { day, month, year } = form.birthDate;
            const birthday = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const today = new Date();

            if (new Date(birthday) > today) {
                alert('Birth date cannot be in the future.');
                return;
            }

            const formData = {
                fullName: form.fullName,
                email: form.email,
                birthday,
                gender: form.gender
            };
            await editMember(id, formData);

            notify('Member updated');
            setTimeout(() => {
                navigate(`/adminpanel/dashboard/?page=0&limit=10`);
            }, 2000);
        } catch (error) {
            console.log(error);
            notify('Failed');
        }
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Something Went Wrong...</h1>
    }
    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleEdit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Birth Date</label>
                    <div className="birth-date">
                        <select name="day" value={form.birthDate.day} onChange={handleFormChange} required>
                            <option value="">Day</option>
                            {days.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                        <select name="month" value={form.birthDate.month} onChange={handleFormChange} required>
                            <option value="">Month</option>
                            {months.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select name="year" value={form.birthDate.year} onChange={handleFormChange} required>
                            <option value="">Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <div className="gender-group">
                        <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Male"
                                checked={form.gender === 'Male'}
                                onChange={handleFormChange}
                                required
                            />
                            <label htmlFor="male">Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Female"
                                checked={form.gender === 'Female'}
                                onChange={handleFormChange}
                                required
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>
                <button type="submit">Save</button>
            </form>
            <ToastContainer />
        </div>
    )
}
