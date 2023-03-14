import React, { useState } from 'react'
import PageContainer from '../components/containers/PageContainer'
import { useHistory } from 'react-router-dom';

import {Button, Container} from '@mui/material'


const Landing = () =>{
    const [language, setLanguage] = useState('English');

    const handleLanguageChange = () => {
        setLanguage(language === 'English' ? 'Thai' : 'English');
      };
	const history = useHistory();
    const handleGettingStart = () => {
		history.push('/detection');
    }
    return (
        <div >
            <Container>
                <div className='info-padding'>
                    <h1>
                    Glaucoma Checker
                    </h1>
                </div>
                <Button 
                  variant='contained'
                  disableElevation
                  onClick={handleGettingStart}
                  color='primary'
                  id='getting-start-button'
                >
                    Start
                </Button>
                
            </Container>

        </div>
        
      )
}

export default Landing