import { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { Box, Typography, CircularProgress, Button, Alert } from '@mui/material';
import { getDefaultRoute } from '../utils/roleUtils';

const Login = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useSelector((state: RootState) => state.userReducer.role);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 이미 인증된 경우 적절한 페이지로 리다이렉트
    if (keycloak.authenticated) {
      const from = location.state?.from?.pathname;
      
      if (from && from !== '/login') {
        // 이전에 접근하려던 페이지가 있으면 그 페이지로
        console.log(`Redirecting to previous page: ${from}`);
        navigate(from, { replace: true });
      } else if (userRole) {
        // 첫 로그인 시 역할별 기본 페이지로 리다이렉트
        const defaultRoute = getDefaultRoute(userRole);
        console.log(`First login redirect: ${userRole} -> ${defaultRoute}`);
        navigate(defaultRoute, { replace: true });
      } else {
        // 역할 정보가 아직 없는 경우 홈으로 이동
        console.log('Redirecting to home page');
        navigate('/', { replace: true });
      }
      return;
    }

    // 인증 상태가 아직 로딩 중인 경우
    if (keycloak.authenticated === undefined) {
      return;
    }

    // 인증되지 않은 경우에만 로그인 시도
    if (!keycloak.authenticated && !isLoggingIn) {
      setIsLoggingIn(true);
      setError(null);
      
      console.log('Initiating login...');
      // 로그인 시도 - 성공 후 홈으로 리다이렉트 (역할별 리다이렉트는 로그인 성공 후 처리)
      keycloak.login({
        redirectUri: window.location.origin + '/',
        prompt: 'login'
      }).catch((err) => {
        console.error('Login failed:', err);
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
        setIsLoggingIn(false);
      });
    }
  }, [keycloak.authenticated, keycloak, navigate, location, userRole, isLoggingIn]);

  const handleRetry = () => {
    setIsLoggingIn(false);
    setError(null);
    console.log('Retrying login...');
    keycloak.login({
      redirectUri: window.location.origin + '/',
      prompt: 'login'
    });
  };

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    keycloak.logout({
      redirectUri: window.location.origin
    });
  };

  // 인증 상태 확인 중
  if (keycloak.authenticated === undefined) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          인증 상태 확인 중...
        </Typography>
      </Box>
    );
  }

  // 인증되었지만 역할 정보가 아직 로딩 중인 경우
  if (keycloak.authenticated && !userRole) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          사용자 정보를 확인하는 중...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          잠시만 기다려주세요.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" p={3}>
      {error ? (
        <Box textAlign="center" maxWidth={400}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Box display="flex" gap={2} justifyContent="center">
            <Button variant="contained" onClick={handleRetry}>
              다시 시도
            </Button>
            <Button variant="outlined" onClick={handleLogout}>
              로그아웃
            </Button>
          </Box>
        </Box>
      ) : (
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            로그인 중입니다...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            잠시만 기다려주세요.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Login;
