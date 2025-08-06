// ProtectedRoute.tsx
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { keycloak } = useKeycloak();

  if (keycloak.authenticated === undefined) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          인증 상태 확인 중...
        </Typography>
      </Box>
    );
  }

  if (!keycloak.authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
