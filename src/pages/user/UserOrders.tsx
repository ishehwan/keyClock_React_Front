import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';

const UserOrders: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          주문 목록
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          회원사 주문 관리 페이지입니다.
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          주문 목록이 여기에 표시됩니다.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          실제 구현 시에는 주문 데이터를 가져와서 테이블 형태로 표시합니다.
        </Typography>
      </Paper>
    </Container>
  );
};

export default UserOrders; 