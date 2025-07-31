import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import AppRoutes from './router/AppRoutes';
import { Box, Typography, CircularProgress } from '@mui/material';

function App() {
  const { keycloak, initialized } = useKeycloak();
  const [isInitializing, setIsInitializing] = useState(true);
  const userRole = useSelector((state: RootState) => state.userReducer.role);

  useEffect(() => {
    // Keycloak 초기화 완료 후 상태 업데이트
    if (initialized) {
      setIsInitializing(false);
      console.log('🔧 Keycloak initialized');
    }
  }, [initialized]);

  useEffect(() => {
    console.log('🔍 Auth state changed:', {
      authenticated: keycloak.authenticated,
      initialized,
      userRole
    });
  }, [keycloak.authenticated, initialized, userRole]);

  useEffect(() => {
    if (!keycloak.authenticated) {
      return;
    }

    const interval = setInterval(() => {
      keycloak.updateToken(70) // 70초 남았으면 갱신 (더 여유있게)
        .then((refreshed) => {
          if (refreshed) {
            console.log('🔄 Token refreshed');
          } else {
            console.log('✅ Token still valid');
          }
        })
        .catch((error) => {
          console.warn('❌ Failed to refresh token:', error);
          // 토큰 갱신 실패 시 로그아웃
          keycloak.logout({
            redirectUri: window.location.origin
          });
        });
    }, 60000); // 60초마다 확인

    return () => clearInterval(interval);
  }, [keycloak]);

  // Keycloak 초기화 중이거나 인증 상태 확인 중
  if (!initialized || isInitializing || keycloak.authenticated === undefined) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          🔒 인증 상태 확인 중...
        </Typography>
      </Box>
    );
  }

  return <AppRoutes />;
}

export default App;