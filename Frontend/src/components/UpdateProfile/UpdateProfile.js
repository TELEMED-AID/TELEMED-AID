import React from 'react'
import './UpdateProfile.css'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
function UpdateProfile() {
  return (
    <>
        <div className='update-profile-container'>
            <header>Update Profile Content</header>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
            <TextField id="outlined-basic" label="First Name" variant="outlined" />
            <TextField id="outlined-basic" label="Last Name" variant="outlined" />
            <TextField disabled id="outlined-basic" label="Email" defaultValue="malyhas2020@gmail.com" variant="outlined" />
            <TextField id="outlined-basic" label="Phone Number" variant="outlined" />
            <TextField id="outlined-basic" label="Email Address" variant="outlined" />
            <TextField disabled id="outlined-basic" label="Role" defaultValue="Doctor" variant="outlined" />
            <Autocomplete
                disablePortal
                options={['Male', 'Female', 'Prefer not to answer']} // Add options here
                
                renderInput={(params) => <TextField {...params} label="Gender" />}
            />
            </Box>
            <Stack className='update-stack' direction="row"  justifyContent={{ xs: 'center', sm: 'flex-end' }} >
                <Button className='update-button' 
                    variant="contained" 
                    sx={{
                        backgroundColor: '#37474f', // Custom background color
                        color: '#FFFFFF', // Custom text color
                        '&:hover': {
                            backgroundColor: '#455a64', // Darker shade on hover
                    
                        },
                        marginRight: '13px',
                        marginTop: '15px'
                    }} 
                    endIcon={<SendIcon />}>
                    Send Updates
                </Button>
            </Stack>
        </div>
        
    </>
    
)
}

export default UpdateProfile