import { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "teacher" | "staff" | "viewer";

type RoleContextValue = {
  role: Role;
  setRole: (r: Role) => void;
  canEdit: boolean;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("admin");
  const canEdit = role === "admin" || role === "staff";
  return (
    <RoleContext.Provider value={{ role, setRole, canEdit }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
};
