import React, {useState} from 'react'
import PageContainer from '../components/containers/PageContainer'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box, Container, Button } from '@mui/material';

const Detection = () => {

    const [step,setStep] = useState(0)

    const steps = [
        'Upload',
        'Review',
        'Result',
      ];
      
    return (
        <Container>
            {/* <PageContainer> */}
            <h2>
                Detection page
            </h2>
               <Box sx={{display: 'grid',placeItems: 'center'}}>
               <Stepper activeStep={step} alternativeLabel sx={{width: ['200px', '400px', '600px']}}>
                    {steps.map((label) => (
                        <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
               </Box>
            <h6 >
                Upload step: Please drag and drop pictures in the box below or click select pictures button to add pictures.<br />
                Accepted File Types: .jpg, .png, .tif. Maximum picture at 20.
            </h6>
            <Button>
                Select Pictures
            </Button>


        </Container>
    )
    // return (
    //     <div>
    //         <PageContainer>
    //             <Stepper activeStep={1} alternativeLabel sx={{width: ['200px', '400px', '600px']}}>
    //                 {steps.map((label) => (
    //                     <Step key={label}>
    //                     <StepLabel>{label}</StepLabel>
    //                     </Step>
    //                 ))}
    //             </Stepper>

    //         </PageContainer>
    //         <h2>
    //             Detection page
    //         </h2>
    //     </div>
    // )
}

export default Detection