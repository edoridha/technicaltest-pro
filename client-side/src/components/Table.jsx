import React, { useState } from 'react';
import { Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel, TextField } from '@mui/material';
import PageSelect from './PageSelect';
import { useLocation, useNavigate } from 'react-router-dom';
import useHookUser from '../hooks/useHookUser';


export default function TableMember(props) {
     const location = useLocation()
      const navigate = useNavigate()
      const {deleteMember} = useHookUser()
      const queryParams = new URLSearchParams(location.search);

    const { memberList, currentPage, totalItem, startItem, endItem } = props;
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    
    const name = queryParams.get("name") || ""
    const page = queryParams.get("page") || "0"
    const limit = queryParams.get("limit") || "10"

    const [searchName, setSearchName] = useState(name || '');

    const handleSearchNameChange = (event) => {
        const newSearchName = event.target.value;
        setSearchName(newSearchName);
        console.log(newSearchName);
        navigate(`/adminpanel/dashboard/?page=${page}&limit=${limit}&name=${newSearchName}`);
    };
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        
        queryParams.set('sortBy', property);
        queryParams.set('sortOrder', isAsc ? 'desc' : 'asc');
        window.history.pushState(null, '', '?' + queryParams.toString());
        

        navigate(`/adminpanel/dashboard/?page=${page}&limit=${limit}&sortBy=${property}&sortOrder=${isAsc ? 'desc' : 'asc'}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleEdit = (id) => {
        navigate(`/adminpanel/edit/${id}`);
    }

    const handleDelete = async (id) => {
       await deleteMember(id)
        navigate(`/adminpanel/dashboard/?page=0&limit=10`)
    }

    return (
        <TableContainer className='m-2 p-2'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'fullName'}
                                direction={orderBy === 'fullName' ? order : 'asc'}
                                onClick={() => handleRequestSort('fullName')}
                            >
                                Full Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'email'}
                                direction={orderBy === 'email' ? order : 'asc'}
                                onClick={() => handleRequestSort('email')}
                            >
                                Email
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'birthday'}
                                direction={orderBy === 'birthday' ? order : 'asc'}
                                onClick={() => handleRequestSort('birthday')}
                            >
                                Birthday
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'gender'}
                                direction={orderBy === 'gender' ? order : 'asc'}
                                onClick={() => handleRequestSort('gender')}
                            >
                                Gender
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'createdAt'}
                                direction={orderBy === 'createdAt' ? order : 'asc'}
                                onClick={() => handleRequestSort('createdAt')}
                            >
                                Join Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField
                            id="outlined-basic"
                            label="Search name"
                            variant="outlined"
                            value={searchName}
                            onChange={handleSearchNameChange}
                            />
                        </TableCell>
                    </TableRow>
                    {
                        memberList.map((d, k) => {
                            return (
                                <TableRow key={k}>
                                    <TableCell>{d.fullName}</TableCell>
                                    <TableCell>{d.email}</TableCell>
                                    <TableCell>{formatDate(d.birthday)}</TableCell>
                                    <TableCell>{d.gender}</TableCell>
                                    <TableCell>{formatDate(d.createdAt)}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(d.id)}>Edit</Button>
                                        <Button onClick={() => handleDelete(d.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    <TableRow>
                        <TableCell colSpan={5} align="right">
                            <PageSelect totalItem={totalItem} currentPage={currentPage} startItem={startItem} endItem={endItem} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}