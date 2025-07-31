import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { Box, Typography, CircularProgress } from '@mui/material';
import { getDefaultRoute } from '../utils/roleUtils';

interface RoleBasedRedirectProps {
  children?: React.ReactNode;
}

const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useSelector((state: RootState) => state.userReducer.role);

  useEffect(() => {
    // 역할이 설정되지 않은 경우 대기
    if (!userRole) {
      console.log('⏳ Waiting for user role...');
      return;
    }

    const currentPath = location.pathname;
    console.log(`Current path: ${currentPath}`);
    console.log(`User role: ${userRole}`);

    // 루트 경로이거나 로그인 후 리다이렉트된 경로인 경우 역할별 리다이렉트 수행
    if (currentPath === '/' || currentPath === '/login') {
      const targetRoute = getDefaultRoute(userRole);
      console.log(`Target route: ${targetRoute}`);
      
      // 무한 리다이렉트 방지를 위해 현재 경로와 다른 경우에만 리다이렉트
      if (targetRoute !== currentPath) {
        console.log(`Role-based redirect: ${userRole} -> ${targetRoute}`);
        navigate(targetRoute, { replace: true });
      } else {
        console.log('Already on correct route');
      }
    } else {
      console.log(`Not on root/login path, current: ${currentPath}`);
    }
  }, [userRole, navigate, location.pathname]);

  // 역할이 아직 로딩 중인 경우 로딩 표시
  if (!userRole) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress size={40} />
        <Typography variant="body2" sx={{ mt: 2 }}>
          사용자 정보를 확인하는 중...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default RoleBasedRedirect; 