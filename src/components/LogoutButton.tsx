import React from 'react';
import { Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import { token, changeJWTToken } from '../store/slices/auth';

import Cookies from 'js-cookie'
import {  useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const tokenSelector = useAppSelector(token)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();


    const Logout = () => {
        tokenSelector && dispatch(changeJWTToken(''))
        Cookies.remove('token')
        navigate('/')
    }

    return (
        <Button
            sx={{
                background: 'red',
                color: 'white',
                margin: '5px 0',
                borderColor: 'white',
                transition: 'all .5s ease-out',
                '&:hover': {
                    color: 'black',
                    background: 'white',
                    borderColor: 'black',
                }
            }}
            onClick={() => Logout()}
            variant="outlined">Logout</Button>
    );
};

export default LogoutButton;