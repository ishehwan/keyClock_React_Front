import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { useKeycloak } from '@react-keycloak/web';
import { onOpenSnackBar } from '../redux/features/snackBarSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/dashboard' 
}) => {
  const { keycloak } = useKeycloak();
  const location = useLocation();
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.userReducer.role);

  // 로그인하지 않은 경우
  if (!keycloak.authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 역할 제한이 있는 경우
  if (allowedRoles.length > 0) {
    const hasAccess = allowedRoles.includes(userRole);
    
    if (!hasAccess) {
      // 접근 권한이 없는 경우 즉시 알림 표시
      dispatch(onOpenSnackBar({
        title: "접근 권한 없음",
        type: "error",
        content: `이 페이지에 접근할 권한이 없습니다. (현재 역할: ${userRole})`
      }));

      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute; 