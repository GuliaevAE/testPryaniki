
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Table from './components/Table';
import { Alert, AlertTitle, Container, LinearProgress } from '@mui/material';
import { useAppSelector, useAppDispatch } from './store/hooks'
import {  loading, errorMessage, changeErrorMessage } from './store/slices/tableData';


function App() { 
  const Loading = useAppSelector(loading)
  const Error = useAppSelector(errorMessage)
  const dispatch = useAppDispatch()
  return (

    <div className='bg-[white]  w-full h-[100vh] flex justify-center align-center relative'>
      <LinearProgress sx={{
        position: 'fixed',
        width: '100vw',
        top: '0',
        opacity: !Loading ? '0' : '1',
        left: '0',
        background: 'black'
      }}
        color='warning'
      />
      <Alert sx={{
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        border: '2px solid black',
        opacity: !Error?'0': '1',
        transition: 'all .5s',
        zIndex: '99'
      }}
        onClose={() => {dispatch(changeErrorMessage('')) }}
        severity="error">

        <AlertTitle>Error</AlertTitle>
        {Error}
      </Alert>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
