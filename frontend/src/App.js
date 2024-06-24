// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Header from './Header/Header';
// import LoginScreen from './User/Login'; // Make sure this path is correct
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Modal from '@mui/material/Modal';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import ProductCard from './Product/ProductCard';

// const theme = createTheme();

// function App() {
//   const [isLoginVisible, setIsLoginVisible] = useState(false);
//   const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:7777/api/getproduct')
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   const toggleLoginVisibility = () => {
//     setIsLoginVisible((prevVisibility) => !prevVisibility);
//   };

//   const showSuccessMessage = () => {
//     setIsSnackbarOpen(true);
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setIsSnackbarOpen(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div className="App">
//         <Header toggleLoginVisibility={toggleLoginVisibility} />
//         <Container>
//           <Box mt={4}>
//             <Typography variant="h4" align="center">
//               Latest Products
//             </Typography>
//           </Box>
//           <Box mt={2} mb={2} align="center">
//             <Typography variant="body2" color="textSecondary">
//               {/* Content for Latest Products */}
//             </Typography>
//           </Box>
//           <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center">
//             {products.map((product) => (
//               <ProductCard key={product.product_id} product={product} />
//             ))}
//           </Box>
//         </Container>
        
//         <Modal
//           open={isLoginVisible}
//           onClose={toggleLoginVisibility}
//           aria-labelledby="login-modal"
//           aria-describedby="login-modal-description"
//         >
//           <Box 
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: 400,
//               bgcolor: 'background.paper',
//               boxShadow: 24,
//               p: 4,
//               borderRadius: '8px',
//             }}
//           >
//             <LoginScreen onClose={toggleLoginVisibility} showSuccessMessage={showSuccessMessage} />
//           </Box>
//         </Modal>

//         <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//           <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
//             Login successful!
//           </MuiAlert>
//         </Snackbar>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;

// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header/Header';
import LoginScreen from './User/Login'; // Ensure this path is correct
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ProductCard from './Product/ProductCard';
import { getProducts } from './Service/Productservice';

const theme = createTheme();

function App() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleLoginVisibility = () => {
    setIsLoginVisible((prevVisibility) => !prevVisibility);
  };

  const showSuccessMessage = () => {
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header toggleLoginVisibility={toggleLoginVisibility} />
        <Container>
          <Box mt={4}>
            <Typography variant="h4" align="center">
              Latest Products
            </Typography>
          </Box>
          <Box mt={2} mb={2} align="center">
            <Typography variant="body2" color="textSecondary">
              {/* Content for Latest Products */}
            </Typography>
          </Box>
          <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </Box>
        </Container>
        
        <Modal
          open={isLoginVisible}
          onClose={toggleLoginVisibility}
          aria-labelledby="login-modal"
          aria-describedby="login-modal-description"
        >
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px',
            }}
          >
            <LoginScreen onClose={toggleLoginVisibility} showSuccessMessage={showSuccessMessage} />
          </Box>
        </Modal>

        <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Login successful!
          </MuiAlert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App;
