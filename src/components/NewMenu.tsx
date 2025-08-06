import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { getMenuItemsByRole, isExpandable, type MenuItem } from '../utils/menuConfig';

interface NewMenuProps {
  open: boolean;
  userRole: string;
  openFn : () => void;
}

const NewMenu: React.FC<NewMenuProps> = ({ open, userRole, openFn}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const menuItems = getMenuItemsByRole(userRole);

  const handleItemClick = (item: MenuItem) => {
    if (isExpandable(item)) {
      if(!item.path) {
        openFn()
      }
      // 확장 가능한 항목인 경우 확장/축소 토글
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(item.id)) {
        newExpanded.delete(item.id);
      } else {
        newExpanded.add(item.id);
      }
      setExpandedItems(newExpanded);
    } else if (item.path) {
      // 일반 항목인 경우 해당 경로로 이동
      navigate(item.path);
    }
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
  };

  const isItemSelected = (item: MenuItem): boolean => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.children) {
      return item.children.some(child => child.path === location.pathname);
    }
    return false;
  };

  const isSubItemSelected = (path: string): boolean => {
    return location.pathname === path;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const selected = isItemSelected(item);
    const expanded = expandedItems.has(item.id);
    const hasChildren = isExpandable(item);

    return (
      <Box key={item.id}>
        <ListItem disablePadding sx={{ display: 'block'}}>
          <ListItemButton
            onClick={() => handleItemClick(item)}
            selected={selected}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5 + level * 2, // 레벨에 따른 들여쓰기
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: selected ? 'primary.main' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && (
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: 1,
                  '& .MuiListItemText-primary': {
                    fontSize: level > 0 ? '0.875rem' : '1rem',
                    fontWeight: level > 0 ? 400 : 500,
                  }
                }} 
              />
            )}
            {open && hasChildren && (
              expanded ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>
        </ListItem>

        {/* 하위 메뉴 렌더링 */}
        {hasChildren && item.children && (
          <Collapse in={expanded && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <ListItem key={child.id} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    onClick={() => handleSubItemClick(child.path!)}
                    selected={isSubItemSelected(child.path!)}
                    sx={{
                      minHeight: 40,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5 + (level + 1) * 2,
                      pl: open ? 4.5 + (level + 1) * 2 : 2.5,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: isSubItemSelected(child.path!) ? 'primary.main' : 'inherit',
                      }}
                    >
                      {child.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText 
                        primary={child.text} 
                        sx={{ 
                          opacity: 1,
                          '& .MuiListItemText-primary': {
                            fontSize: '0.875rem',
                            fontWeight: 400,
                          }
                        }} 
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <List>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
    </Box>
  );
};

export default NewMenu; 