'use client';

import * as React from 'react';

type AdminData = {
  name: string;
  email: string;
  avatar: string;
};

const initialAdminData: AdminData = {
  name: 'Admin',
  email: 'admin@example.com',
  avatar: '',
};

type AdminContextType = {
  adminData: AdminData;
  setAdminData: (data: Partial<AdminData>) => void;
};

const AdminContext = React.createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [adminData, setAdminDataState] = React.useState<AdminData>(initialAdminData);

  const setAdminData = (newData: Partial<AdminData>) => {
    setAdminDataState(prev => ({ ...prev, ...newData }));
  };

  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = React.useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
