import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import { InputAdornment,Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import logoImage from '../../src/Assets/Images/image.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { styled } from '@mui/system';


// Define the styled component
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px', // Adjust the width as needed
  '& .MuiOutlinedInput-root': {
    height: '45px', // Adjust the height as needed
    backgroundColor: '#f9f9f9',
    borderRadius: '25px', // Round corners
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25)', // Light blue shadow on focus
      borderColor: '#007bff', // Blue border on focus
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent', // Remove border
  },
  '& .MuiInputAdornment-root': {
    color: '#888',
  },
}));



// export default Header;
function Header({ toggleLoginVisibility }) {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <IconButton edge="start" color="inherit" aria-label="logo">
          <img src={logoImage} alt="Logo" style={{ width: 50, height: 50 }} />
        </IconButton>

        {/* Product search */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 2 }}>
          <StyledTextField
            variant="outlined"
            placeholder="Enter Product Name ..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Login */}
        <Button color="inherit" onClick={toggleLoginVisibility}>Login</Button>

        {/* Cart Button */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Badge badgeContent={0} color="error"><ShoppingCartIcon /></Badge>}
          sx={{
            backgroundColor: '#ff4081', // Custom background color
            color: '#fff', // Text color
            borderRadius: '20px', // Rounded corners
            padding: '6px 16px', // Padding
            '&:hover': {
              backgroundColor: '#f50057', // Hover color
            },
          }}
        >
          Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;


 


   




