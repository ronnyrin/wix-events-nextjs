'use client';
import React from 'react';
import { Sidebar } from '@app/components/Sidebar/Sidebar';
import { CartSidebarView } from '@app/components/CartSidebar/CartSidebarView';
import { useUI } from '@app/components/Provider/context';

export const SidebarUI: React.FC = () => {
  const { displaySidebar, closeSidebar } = useUI();
  return displaySidebar ? (
    <Sidebar onClose={closeSidebar}>
      <CartSidebarView />
    </Sidebar>
  ) : null;
};
