"use client";
import { clientSessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { useContext, useLayoutEffect, useState, createContext } from "react";

type User = AccountResType["data"];

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context
};
export default function Appprovider({
  children,
  initialSessionToken = "",
  user: userProp,
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
  user: User | null;
}) {
  const [user, setUser] = useState<User | null>(userProp);
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken ?? "";
    }
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
