import React from "react";

import { AuthProvider } from "./auth";

const AppProvider: React.FC = ({ children }) => {
  // children: é oq envolveremos, as pág por exemplo
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
