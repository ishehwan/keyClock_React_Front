import React from 'react';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const AdminPage: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.userReducer.role);
  const userName = useSelector((state: RootState) => state.userReducer.name);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            관리자 페이지
          </Typography>
          <Typography variant="h6" gutterBottom>
            관리자: {userName}님 (역할: {userRole})
          </Typography>
          <Typography variant="body1" paragraph>
            이 페이지는 <strong>admin</strong> 역할을 가진 사용자만 접근할 수 있습니다.
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'primary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                시스템 관리
              </Typography>
              <Typography variant="body2" paragraph>
                사용자 관리, 권한 설정, 시스템 설정 등을 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                시스템 설정
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'secondary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                사용자 관리
              </Typography>
              <Typography variant="body2" paragraph>
                모든 사용자의 정보를 조회하고 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                사용자 목록
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'success.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                통계 및 분석
              </Typography>
              <Typography variant="body2" paragraph>
                시스템 사용 통계와 분석 데이터를 확인할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                통계 보기
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'warning.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                보안 관리
              </Typography>
              <Typography variant="body2" paragraph>
                보안 설정, 로그 확인, 접근 제어를 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                보안 설정
              </Button>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminPage; 