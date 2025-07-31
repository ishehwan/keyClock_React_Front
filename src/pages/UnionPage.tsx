import React from 'react';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const UnionPage: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.userReducer.role);
  const userName = useSelector((state: RootState) => state.userReducer.name);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            coop 페이지
          </Typography>
          <Typography variant="h6" gutterBottom>
            coop원: {userName}님 (역할: {userRole})
          </Typography>
          <Typography variant="body1" paragraph>
            이 페이지는 <strong>union</strong> 또는 <strong>union_storage</strong> 역할을 가진 사용자만 접근할 수 있습니다.
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'primary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                coop 관리
              </Typography>
              <Typography variant="body2" paragraph>
                coop원 정보, coop 활동, 회의록 등을 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                coop 정보
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'secondary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                재정 관리
              </Typography>
              <Typography variant="body2" paragraph>
                coop 재정, 예산, 수입/지출 내역을 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                재정 현황
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'success.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                활동 통계
              </Typography>
              <Typography variant="body2" paragraph>
                coop 활동 통계와 성과 지표를 확인할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                통계 보기
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'warning.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                공지사항
              </Typography>
              <Typography variant="body2" paragraph>
                coop 공지사항과 이벤트 정보를 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                공지 관리
              </Button>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default UnionPage; 