import React from 'react';
import { Box, Typography, Paper, Container, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const CoopPage: React.FC = () => {
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
            이 페이지는 <strong>coop</strong> 또는 <strong>coop_storage</strong> 역할을 가진 사용자만 접근할 수 있습니다.
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'primary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                coop 관리
              </Typography>
              <Typography variant="body2" paragraph>
                coop원 정보, 협동 활동, 공동 사업을 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                coop 정보
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'secondary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                💼 공동 사업
              </Typography>
              <Typography variant="body2" paragraph>
                공동 사업 계획, 진행 상황, 성과를 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                사업 현황
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'success.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                📈 성과 분석
              </Typography>
              <Typography variant="body2" paragraph>
                coop 활동 성과와 경제적 효과를 분석할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                성과 분석
              </Button>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 3, bgcolor: 'warning.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                지속가능성
              </Typography>
              <Typography variant="body2" paragraph>
                환경 친화적 활동과 지속가능한 발전 계획을 관리할 수 있습니다.
              </Typography>
              <Button variant="contained" color="secondary" size="small">
                지속가능성
              </Button>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CoopPage; 