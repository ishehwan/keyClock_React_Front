*KDOOBU Frontend
React (Vite + MUI) 기반의 프론트엔드 애플리케이션입니다.

*주요 기능
Role 기반 접근 제어 (RBAC)
Keycloak과 연동하여 사용자의 역할(Role)에 따라 페이지 접근을 제어합니다.

*지원하는 역할
admin: 관리자

union

union_storage

coop

coop_storage

user

*구현된 기능
ProtectedRoute 컴포넌트: 역할 기반 접근 제어를 처리하는 고차 컴포넌트(HOC)

자동 리다이렉트: 권한이 없는 페이지 접근 시 /dashboard로 이동

사용자 알림: 권한이 없을 경우 SnackBar로 알림 표시

동적 메뉴 구성: 로그인한 사용자의 역할에 따라 메뉴 항목 자동 필터링

로그인 체크: 로그인하지 않은 경우 로그인 페이지로 리다이렉트

기술 스택
React 18 + TypeScript

Vite

Material-UI (MUI)

React Router DOM

Redux Toolkit

Keycloak (React Keycloak Web 연동)

*프로젝트구조
src/
├── router/
│   ├── ProtectedRoute.tsx
│   └── AppRoutes.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── AdminPage.tsx
│   ├── UnionPage.tsx
│   ├── CoopPage.tsx
│   └── ...
├── redux/
│   └── features/
│       └── userSlice.ts
└── components/
    └── Layout.tsx

*실행방법

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로젝트 빌드
npm run build


*인증 설정
Keycloak을 통해 사용자 인증을 수행합니다.

역할 정보는 Keycloak 토큰의 role >> 커스텀 클레임에서 가져옵니다.