import React, { useState } from 'react'
import PageContainer from '../components/containers/PageContainer'


const Landing = () =>{
    const [language, setLanguage] = useState('English');

    const handleLanguageChange = () => {
        setLanguage(language === 'English' ? 'Thai' : 'English');
      };
    return (
        <div >
            <PageContainer>
                <div>
                    <h1>
                    Glaucoma Checker
                    </h1>
                </div>
                
            </PageContainer>
        </div>
      )
}

export default Landing