import Keycloak from 'keycloak-js';

declare global {
  interface Window {
    keycloakInstance?: Keycloak.KeycloakInstance;
  }
}

const keycloak = window.keycloakInstance || new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

// 토큰 만료 시 자동 갱신
keycloak.onTokenExpired = () => {
  console.log('Token expired, attempting to refresh...');
  keycloak.updateToken(70).then((refreshed) => {
    if (refreshed) {
      console.log('Token refreshed successfully');
      sessionStorage.setItem('token', keycloak.token || '');
    }
  }).catch(() => {
    console.error('Failed to refresh token');
    keycloak.logout();
  });
};

// 인증 갱신 에러 시 처리
keycloak.onAuthRefreshError = () => {
  console.error('Auth refresh error, logging out...');
  keycloak.logout();
};

// 로그아웃 시 처리
keycloak.onAuthLogout = () => {
  console.log('User logged out');
  // 세션 스토리지 정리
  sessionStorage.removeItem('token');
  // 페이지 새로고침으로 완전한 상태 초기화
  window.location.href = '/';
};

// 인증 에러 시 처리
keycloak.onAuthError = (error) => {
  console.error('Auth error:', error);
  // 백엔드 세션 만료 등의 경우 로그인 페이지로 리다이렉트
  if (error.error === 'invalid_grant' || error.error === 'unauthorized') {
    keycloak.logout();
  }
};

window.keycloakInstance = keycloak;

export default keycloak;
