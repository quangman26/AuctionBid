
import React, { createContext, useState } from 'react';

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState('Bạn chưa đăng nhập');
  const [balance, setBalance] = useState('********'); // Thêm state cho số dư

  return (
    <AddressContext.Provider value={{ address, setAddress, balance, setBalance }}>
      {children}
    </AddressContext.Provider>
  );
};
