import React from 'react';
import {
  ShoppingCartOutlined,
  Visibility,
  History,
  Settings,
  Inventory,
  LocalShipping,
  Warehouse,
  People,
  Store,
  Assignment,
  Dashboard,
  Home,
  QuizOutlined,
  CrueltyFreeOutlined,
  BugReportOutlined,
  ChecklistOutlined,
  BorderColorOutlined,
  FormatListNumberedOutlined
} from '@mui/icons-material';

export interface MenuItem {
  id: string;
  text: string;
  path?: string;
  icon: React.ReactElement;
  children?: MenuItem[];
  role: string[];
}

// 공통 메뉴 항목
export const commonMenuItems: MenuItem[] = [
  {
    id: 'home',
    text: '홈',
    path: '/',
    icon: React.createElement(Home),
    // coop원 / union / coop / union창고 / coop창고 / 어드민
    role: ['user', 'union', 'coop', 'union_storage', 'coop_storage', 'admin']
  },
  {
    id: 'dashboard',
    text: '테스트',
    icon: React.createElement(Dashboard),
    role: ['user', 'union', 'coop', 'union_storage', 'coop_storage'],
    children: [
      {
        id: 'board-test',
        text: '게시판 테스트',
        path: '/boardTest',
        icon: React.createElement(QuizOutlined),
        role: ['user', 'union', 'coop', 'union_storage', 'coop_storage']
      },
      {
        id: 'dashboardtest',
        text: '테스트',
        path: '/dashboard',
        icon: React.createElement(BugReportOutlined),
        role: ['user', 'union', 'coop', 'union_storage', 'coop_storage'],
      },
      {
        id: 'about',
        text: '설명',
        path: '/about',
        icon: React.createElement(CrueltyFreeOutlined),
        role: ['user', 'union', 'coop', 'union_storage', 'coop_storage'],
      }
    ]
  },

];

// 역할별 메뉴 항목
export const roleMenuItems: MenuItem[] = [
  // 관리자 (admin)
  {
    id: 'admin-menu',
    text: '관리자',
    icon: React.createElement(Dashboard),
    role: ['admin'],
    children: [
      {
        id: 'admin-users',
        text: '사용자 관리',
        path: '/admin/users',
        icon: React.createElement(People),
        role: ['admin'] 
      },
    ]
  },
    // 회원사 (user)
  {
    id: 'order-management',
    text: '주문관리',
    icon: React.createElement(ShoppingCartOutlined),
    role: ['user'],
    children: [
      {
        id: 'order-list',
        text: '주문 목록',
        path: '/user/orders',
        icon: React.createElement(FormatListNumberedOutlined),
        role: ['user']
      },
      {
        id: 'order-create',
        text: '주문 생성',
        path: '/user/orders/create',
        icon: React.createElement(BorderColorOutlined),
        role: ['user']
      }
    ]
  },
  {
    id: 'real-time-info',
    text: '실시간 정보확인',
    path: '/user/real-time',
    icon: React.createElement(Visibility),
    role: ['user']
  },
  {
    id: 'transaction-history',
    text: '거래이력관리',
    path: '/user/transactions',
    icon: React.createElement(History),
    role: ['user']
  },
  {
    id: 'convenience',
    text: '편의기능',
    path: '/user/convenience',
    icon: React.createElement(Settings),
    role: ['user']
  },

  // union 관리자 (union)
  {
    id: 'union-order-management',
    text: '주문관리',
    icon: React.createElement(ShoppingCartOutlined),
    role: ['union'],
    children: [
      {
        id: 'union-order-list',
        text: '주문 목록',
        path: '/union/orders',
        icon: React.createElement(BorderColorOutlined),
        role: ['union']
      },
      {
        id: 'union-order-approval',
        text: '주문 승인',
        path: '/union/orders/approval',
        icon: React.createElement(ChecklistOutlined),
        role: ['union']
      }
    ]
  },
  {
    id: 'product-management',
    text: '상품관리',
    path: '/union/products',
    icon: React.createElement(Store),
    role: ['union']
  },
  {
    id: 'regional-management',
    text: '지역coop 및 coop원 관리',
    path: '/union/regional',
    icon: React.createElement(People),
    role: ['union']
  },
  {
    id: 'union-warehouse',
    text: '창고 관리(union창고)',
    path: '/union/warehouse',
    icon: React.createElement(Warehouse),
    role: ['union']
  },
  {
    id: 'coop-warehouse',
    text: '창고 관리(coop창고)',
    path: '/union/coop-warehouse',
    icon: React.createElement(Warehouse),
    role: ['union']
  },
  {
    id: 'inventory-management',
    text: '재고 관리',
    path: '/union/inventory',
    icon: React.createElement(Inventory),
    role: ['union']
  },
  {
    id: 'outbound-management',
    text: '출고 관리',
    path: '/union/outbound',
    icon: React.createElement(LocalShipping),
    role: ['union']
  },
  {
    id: 'system-management',
    text: '시스템 관리',
    path: '/union/system',
    icon: React.createElement(Settings),
    role: ['union']
  },

  // 지역coop 관리자 (coop)
  {
    id: 'coop-order-management',
    text: '주문 관리',
    icon: React.createElement(ShoppingCartOutlined),
    role: ['coop'],
    children: [
      {
        id: 'coop-order-list',
        text: '주문 목록',
        path: '/coop/orders',
        icon: React.createElement(BorderColorOutlined),
        role: ['coop']
      },
      {
        id: 'coop-order-processing',
        text: '주문 처리',
        path: '/coop/orders/processing',
        icon: React.createElement(ChecklistOutlined),
        role: ['coop']
      }
    ]
  },
  {
    id: 'member-management',
    text: 'coop원 관리',
    path: '/coop/members',
    icon: React.createElement(People),
    role: ['coop']
  },
  {
    id: 'coop-warehouse-management',
    text: '창고 관리(coop창고)',
    path: '/coop/warehouse',
    icon: React.createElement(Warehouse),
    role: ['coop']
  },
  {
    id: 'coop-inventory',
    text: '재고 관리',
    path: '/coop/inventory',
    icon: React.createElement(Inventory),
    role: ['coop']
  },
  {
    id: 'coop-outbound-status',
    text: '출고 현황 관리',
    path: '/coop/outbound-status',
    icon: React.createElement(LocalShipping),
    role: ['coop']
  },

  // 출고관리자(union) (union_storage)
  {
    id: 'union-outbound',
    text: '출고관리',
    path: '/union-storage/outbound',
    icon: React.createElement(LocalShipping),
    role: ['union_storage']
  },
  {
    id: 'union-delivery',
    text: '배송정보 관리',
    path: '/union-storage/delivery',
    icon: React.createElement(Assignment),
    role: ['union_storage']
  },

  // 출고관리자(coop) (coop_storage)
  {
    id: 'coop-outbound',
    text: '출고관리',
    path: '/coop-storage/outbound',
    icon: React.createElement(LocalShipping),
    role: ['coop_storage']
  },
  {
    id: 'coop-delivery',
    text: '배송정보 관리',
    path: '/coop-storage/delivery',
    icon: React.createElement(Assignment),
    role: ['coop_storage']
  }
];

/**
 * 사용자 역할에 따른 메뉴 항목을 반환합니다.
 * @param userRole 사용자 역할
 * @returns 해당 역할의 메뉴 항목들
 */
export const getMenuItemsByRole = (userRole: string): MenuItem[] => {
  const allItems = [...commonMenuItems, ...roleMenuItems];
  return allItems.filter(item => item.role.includes(userRole));
};

/**
 * 메뉴 항목이 확장 가능한지 확인합니다.
 * @param item 메뉴 항목
 * @returns 확장 가능 여부
 */
export const isExpandable = (item: MenuItem): boolean => {
  return Boolean(item.children && item.children.length > 0);
}; 