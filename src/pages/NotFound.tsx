import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper 
} from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
            404
          </Typography>
          
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            페이지를 찾을 수 없습니다
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </Typography>
          
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              size="large"
            >
              홈으로 이동
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              size="large"
            >
              이전 페이지
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound; 