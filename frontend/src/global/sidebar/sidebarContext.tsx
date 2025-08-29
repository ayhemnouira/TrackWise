import React, {
  useState,
  createContext,
  useContext,
  type ReactNode,
  useEffect,
} from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import MyProSidebar from "./mySidebar";
import type { UserProfile } from "../../types";
import { getLoggedInUser } from "../../lib/actions/user.actions";

// Define context shape
interface SidebarContextType {
  sidebarBackgroundColor?: string;
  setSidebarBackgroundColor: (color: string | undefined) => void;
  sidebarImage?: string;
  setSidebarImage: (image: string | undefined) => void;
  sidebarRTL: boolean;
  setSidebarRTL: (rtl: boolean) => void;
  collapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  broken: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  sidebarBackgroundColor: undefined,
  setSidebarBackgroundColor: () => {},
  sidebarImage: undefined,
  setSidebarImage: () => {},
  sidebarRTL: false,
  setSidebarRTL: () => {},
  collapsed: false,
  toggleSidebar: () => {},
  collapseSidebar: () => {},
  broken: false,
});

export const MyProSidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sidebarRTL, setSidebarRTL] = useState<boolean>(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState<
    string | undefined
  >(undefined);
  const [sidebarImage, setSidebarImage] = useState<string | undefined>(
    undefined
  );

  // These are now handled by useProSidebar internally within MyProSidebar, but context needs them
  const [collapsed, setCollapsed] = useState(false);
  const [broken, setBroken] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const collapseSidebar = () => setCollapsed(true);

  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getLoggedInUser();
      if (loggedInUser) {
        // Assuming that if firstName/lastName are not directly in JWT, they might be fetched separately
        // For now, using sub as a fallback for display
        setUser({
          firstName: loggedInUser.firstName || "",
          lastName: loggedInUser.lastName || "",
          email: loggedInUser.email,
          id: loggedInUser.id,
        });
      }
    };
    fetchUser();
  }, []);
  return (
    <ProSidebarProvider>
      <SidebarContext.Provider
        value={{
          sidebarBackgroundColor,
          setSidebarBackgroundColor,
          sidebarImage,
          setSidebarImage,
          sidebarRTL,
          setSidebarRTL,
          collapsed,
          toggleSidebar,
          collapseSidebar,
          broken,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: sidebarRTL ? "row-reverse" : "row",
          }}
        >
          <MyProSidebar
            userName={user ? `${user.firstName} ${user.lastName}` : "Guest"}
          />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
