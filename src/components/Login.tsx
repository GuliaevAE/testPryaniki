import { Box, Button, TextField } from '@mui/material';
import React, { useState, FormEvent, useRef, useEffect, ChangeEvent } from 'react';
import { useAppDispatch } from '../store/hooks'
import { changeJWTToken } from '../store/slices/auth';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie'
import { HOST } from '../dataForTable/functions';
import { changeErrorMessage, changeLoading } from '../store/slices/tableData';


const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const loginPanel = useRef<any>(null)
    const [username, setusername] = useState<string>('user13')
    const [password, setPassword] = useState<string>('password')
    const [succsess, setSuccsess] = useState<null | boolean>(null)




    function login(e: FormEvent) {
        e.preventDefault()
        try {
            dispatch(changeLoading(true))
            axios.post(HOST + '/ru/data/v3/testmethods/docs/login', { username, password }).then(res => {
                if (!res.data.error_code && loginPanel.current) {
                    Cookies.set('token', res.data.data.token)
                    dispatch(changeJWTToken(res.data.data.token))
                    axios.defaults.headers['x-auth'] = res.data.data.token
                    loginPanel.current.animate({
                        opacity: 0
                    }, {
                        duration: 500, fill: 'forwards', easing: 'ease-out'
                    })
                    setSuccsess(true)
                    dispatch(changeLoading(false))
                } else {
                    res.data.error_code && dispatch(changeErrorMessage(res.data.error_message || res.data.error_text))
                    dispatch(changeLoading(false))
                }
            })
        } catch (error) {
            if (typeof error === "string") {
                dispatch(changeErrorMessage(error.toUpperCase()))
            } else if (error instanceof Error) {
                dispatch(changeErrorMessage(error.message))
            }
        }
    }

    useEffect(() => {
        succsess && setTimeout(() => navigate('/table'), 2000)
    }, [succsess])

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: '80%',
                    height: 'min-content',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'black',
                    boxShadow: '0 0 0 0 white, 0 0 0  2px  black, 0 0 0 0 white, 0 0 0  0  black',
                    transition: 'opacity 1s 1s, top 1s 1s,  box-shadow .3s ease-out',
                    position: 'absolute',
                    top: !succsess ? '50%' : '0%',
                    opacity: !succsess ? '1' : '0',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    '&:hover': {
                        boxShadow: '0 0 0 9px white, 0 0 0  11px  black, 0 0 0 18px white, 0 0 0  20px  black',
                    },
                }}
            >
                <div ref={loginPanel}>
                    <form className='z-[1]  bg-[white] py-[30px] px-[20px]  relative' onSubmit={(e) => login(e)}>
                        <TextField onInput={(e: ChangeEvent<HTMLInputElement>) => setusername(e.target.value)} color='primary' type='login' margin='dense' fullWidth label="Login" variant="standard" />
                        <TextField onInput={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} color='primary' type='password' margin='dense' fullWidth label="Password" variant="standard" />
                        <Button type='submit' sx={
                            { marginTop: '20px' }
                        } variant="outlined">Submit</Button>
                    </form>
                </div>

                <div className='absolute text-lg top-[50%] text-[white]  left-[50%] translate-x-[-50%] translate-y-[-50%] z-[0]'>
                    Добро пожаловать, user12!
                </div>
            </Box>
        </ThemeProvider >
    );
};

export default Login;


const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',

        },
        secondary: {
            main: '#f44336',
        },
    },
});