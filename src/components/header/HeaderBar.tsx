import React, { useState, useContext, useEffect, useRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';

import {Button} from '@mui/material'

export default function MenuAppBar() {
  // const { t } = useTranslation()
  const [elevation, setElevation] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setElevation(4)
      } else {
        setElevation(0)
      }
    })
  }, [])
  const history = useHistory();
  const handleHomeClick=()=>{
    history.push('/');
    console.log(history)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 10 }}>
        <AppBar className='MuiToolbar-center' elevation={elevation}>
          <Container maxWidth='lg'>
            <Toolbar>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='home'
                sx={{ mr: 2 }}
                onClick={handleHomeClick}
              >
                <HomeIcon />
              </IconButton>
              <Typography variant='h6' component='div' align='center' sx={{ flexGrow: 1 }}>
                Glaucoma Detection Tool
              </Typography>

              <div>

                <Button
                  variant='contained'
                  disableElevation
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  // onClick={isUser ? handleSignOut : handleSignIn}
                  color='secondary'
                  id='authentication-button'
                >
                  language
                </Button>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

    </>
  )
}