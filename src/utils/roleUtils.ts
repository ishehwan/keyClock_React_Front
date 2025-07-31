// 역할별 기본 경로 매핑
export const ROLE_ROUTES: { [key: string]: string } = {
  'admin': '/admin-page',
  'union': '/union-page',
  'union_storage': '/union-page',
  'coop': '/coop-page',
  'coop_storage': '/coop-page',
  'default': '/dashboard'
};

// 역할별 페이지 이름 매핑
export const ROLE_PAGE_NAMES: { [key: string]: string } = {
  'admin': '관리자 페이지',
  'union': 'coop 페이지',
  'union_storage': 'coop 페이지',
  'coop': 'coop 페이지',
  'coop_storage': 'coop 페이지',
  'default': '대시보드'
};

/**
 * 사용자 역할에 따른 기본 경로를 반환합니다.
 * @param role 사용자 역할
 * @returns 해당 역할의 기본 경로
 */
export const getDefaultRoute = (role: string): string => {
  return ROLE_ROUTES[role] || ROLE_ROUTES['default'];
};

/**
 * 사용자 역할에 따른 페이지 이름을 반환합니다.
 * @param role 사용자 역할
 * @returns 해당 역할의 페이지 이름
 */
export const getRolePageName = (role: string): string => {
  return ROLE_PAGE_NAMES[role] || ROLE_PAGE_NAMES['default'];
};

/**
 * 사용자가 특정 역할에 접근 권한이 있는지 확인합니다.
 * @param userRole 사용자 역할
 * @param allowedRoles 허용된 역할 배열
 * @returns 접근 권한 여부
 */
export const hasRoleAccess = (userRole: string, allowedRoles: string[]): boolean => {
  return allowedRoles.includes(userRole);
};

/**
 * 사용자 역할이 유효한지 확인합니다.
 * @param role 확인할 역할
 * @returns 유효한 역할인지 여부
 */
export const isValidRole = (role: string): boolean => {
  return Object.keys(ROLE_ROUTES).includes(role);
}; 