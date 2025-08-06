import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import BoardTest from '../pages/BoardTest';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage';
import UnionPage from '../pages/UnionPage';
import CoopPage from '../pages/CoopPage';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import UserOrders from '../pages/user/UserOrders';

// 역할별 접근 권한 정의
const ROLES = {
  ALL: ['union', 'union_storage', 'coop', 'coop_storage', 'admin', 'user'],
  UNION: ['union', 'union_storage', 'admin'],
  COOP: ['coop', 'coop_storage', 'admin'],
  UNION_STORAGE: ['union_storage', 'admin'],
  COOP_STORAGE: ['coop_storage', 'admin'],
  ADMIN: ['admin'],
  USER: ['user']
};

// 보호된 라우트 헬퍼 함수
const Protected = ({ roles, children }: { roles: string[], children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={roles}>{children}</ProtectedRoute>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="boardTest" element={<BoardTest />} />

        {/* Admin routes */}
        <Route path="admin">
          <Route path="users" element={<Protected roles={ROLES.ALL}><div>union 사용자 관리</div></Protected>} />
        </Route>
        
        {/* User routes */}
        <Route path="user">
          <Route path="orders" element={<Protected roles={ROLES.ALL}><UserOrders /></Protected>} />
          <Route path="orders/create" element={<Protected roles={ROLES.ALL}><div>주문 생성 페이지</div></Protected>} />
          <Route path="real-time" element={<Protected roles={ROLES.ALL}><div>실시간 정보확인 페이지</div></Protected>} />
          <Route path="transactions" element={<Protected roles={ROLES.ALL}><div>거래이력관리 페이지</div></Protected>} />
          <Route path="convenience" element={<Protected roles={ROLES.ALL}><div>편의기능 페이지</div></Protected>} />
        </Route>

        {/* Union routes */}
        <Route path="union">
          <Route path="orders" element={<Protected roles={ROLES.UNION}><div>union 주문 목록 페이지</div></Protected>} />
          <Route path="orders/approval" element={<Protected roles={ROLES.UNION}><div>union 주문 승인 페이지</div></Protected>} />
          <Route path="products" element={<Protected roles={ROLES.UNION}><div>상품관리 페이지</div></Protected>} />
          <Route path="regional" element={<Protected roles={ROLES.UNION}><div>지역coop 및 coop원 관리 페이지</div></Protected>} />
          <Route path="warehouse" element={<Protected roles={ROLES.UNION}><div>창고 관리(union창고) 페이지</div></Protected>} />
          <Route path="coop-warehouse" element={<Protected roles={ROLES.UNION}><div>창고 관리(coop창고) 페이지</div></Protected>} />
          <Route path="inventory" element={<Protected roles={ROLES.UNION}><div>재고 관리 페이지</div></Protected>} />
          <Route path="outbound" element={<Protected roles={ROLES.UNION}><div>출고 관리 페이지</div></Protected>} />
          <Route path="system" element={<Protected roles={ROLES.UNION}><div>시스템 관리 페이지</div></Protected>} />
        </Route>

        {/* Coop routes */}
        <Route path="coop">
          <Route path="orders" element={<Protected roles={ROLES.COOP}><div>coop 주문 목록 페이지</div></Protected>} />
          <Route path="orders/processing" element={<Protected roles={ROLES.COOP}><div>coop 주문 처리 페이지</div></Protected>} />
          <Route path="members" element={<Protected roles={ROLES.COOP}><div>coop원 관리 페이지</div></Protected>} />
          <Route path="warehouse" element={<Protected roles={ROLES.COOP}><div>창고 관리(coop창고) 페이지</div></Protected>} />
          <Route path="inventory" element={<Protected roles={ROLES.COOP}><div>재고 관리 페이지</div></Protected>} />
          <Route path="outbound-status" element={<Protected roles={ROLES.COOP}><div>출고 현황 관리 페이지</div></Protected>} />
        </Route>

        {/* Storage routes */}
        <Route path="union-storage">
          <Route path="outbound" element={<Protected roles={ROLES.UNION_STORAGE}><div>출고관리(union) 페이지</div></Protected>} />
          <Route path="delivery" element={<Protected roles={ROLES.UNION_STORAGE}><div>배송정보 관리(union) 페이지</div></Protected>} />
        </Route>

        <Route path="coop-storage">
          <Route path="outbound" element={<Protected roles={ROLES.COOP_STORAGE}><div>출고관리(coop) 페이지</div></Protected>} />
          <Route path="delivery" element={<Protected roles={ROLES.COOP_STORAGE}><div>배송정보 관리(coop) 페이지</div></Protected>} />
        </Route>
        
        {/* Admin pages */}
        <Route path="admin-page" element={<Protected roles={ROLES.ADMIN}><AdminPage /></Protected>} />
        <Route path="union-page" element={<Protected roles={ROLES.UNION}><UnionPage /></Protected>} />
        <Route path="coop-page" element={<Protected roles={ROLES.COOP}><CoopPage /></Protected>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 