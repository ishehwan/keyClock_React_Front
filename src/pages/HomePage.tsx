import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const HomePage: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.userReducer.role);
  const userName = useSelector((state: RootState) => state.userReducer.name);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            홈페이지
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            환영합니다, {userName}님!
          </Typography>
          <Typography variant="body1" paragraph>
            현재 역할: <strong>{userRole}</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            이 페이지는 모든 로그인 사용자가 접근할 수 있습니다.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              접근 가능한 페이지:
            </Typography>
            <Typography variant="body2" component="ul">
              <li> 홈페이지 (현재 페이지)</li>
              <li> 대시보드</li>
              <li> About</li>
              <li> BoardTest</li>
              {userRole === 'admin' && <li> 관리자 페이지</li>}
              {(userRole === 'union' || userRole === 'union_storage') && <li> union 페이지</li>}
              {(userRole === 'coop' || userRole === 'coop_storage') && <li> coop 페이지</li>}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage; 