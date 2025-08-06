import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
// Material UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/noto-sans-kr/index.css';
//keycloak
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak/keycloak.ts';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store.ts';
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from './redux/features/userSlice.ts';
import { refreshApiClient } from './apis/apiClient.ts';
//redux
import SnackBarMain from './common/snackBar/SnackBarMain.tsx';
import DialogMain from './common/dialog/DialogMain.tsx';
import ProgressMain from './common/loading/ProgressMain.tsx';

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR, Arial, sans-serif',
  },
});

interface DecodedToken {
  preferred_username: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  realm_access?: {
    roles: string[];
  };
  role?: string;
  exp?: number; // 토큰 만료 시간
}

const keycloakProviderInitConfig = {
  onLoad: 'check-sso', // 'login-required' 대신 'check-sso' 사용하여 더 유연한 처리
  checkLoginIframe: false,  // iframe으로 세션 확인 비활성화 (단순화 목적)
  pkceMethod: 'S256',       // 보안 강화를 위한 PKCE 사용
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html', // SSO 체크용
  enableLogging: true,      // 디버깅을 위한 로깅 활성화
  timeSkew: 0,             // 시간 동기화
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakProviderInitConfig} 
    onEvent={(event, error) => {
      console.log('🔐 Keycloak event:', event, error);
      
      if (event === 'onTokenExpired') {
        console.log('⚠️ Token expired, attempting refresh...');
      } else if (event === 'onAuthRefreshError') {
        console.error('❌ Auth refresh error:', error);
      } else if (event === 'onAuthError') {
        console.error('❌ Auth error:', error);
      }
    }}
    onTokens={(tokens) => {
      console.log('🎫 Tokens received:', tokens);
      
      if (tokens.token) {
        sessionStorage.setItem('token', tokens.token);
        const decoded = jwtDecode<DecodedToken>(tokens.token);

        console.log('🔍 Decoded token:', decoded);
        console.log('👤 User role:', decoded.role);
        if (decoded.exp) {
          console.log('⏰ Token expires at:', new Date(decoded.exp * 1000));
        }

        // Redux 저장
        const userData = {
          name: decoded.name || "",
          username: decoded.preferred_username || "",
          givenName: decoded.given_name || "",
          familyName: decoded.family_name || "",
          email: decoded.email || "",
          role: decoded.role || "",
        };

        store.dispatch(setUserInfo(userData));
        
        // API 클라이언트 새로고침 (토큰이 설정된 후)
        refreshApiClient();
      } else {
        console.warn('⚠️ No token received');
      }
  }}>
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}> 
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <DialogMain />
        <SnackBarMain />
        <ProgressMain />
      </ReduxProvider>
    </ThemeProvider>
  </ReactKeycloakProvider>
)
