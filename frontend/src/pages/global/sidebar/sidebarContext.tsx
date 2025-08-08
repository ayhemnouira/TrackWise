import React, {
  useState,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import MyProSidebar from "./mySidebar";

// Define context shape
interface SidebarContextType {
  sidebarBackgroundColor?: string;
  setSidebarBackgroundColor: (color: string | undefined) => void;
  sidebarImage?: string;
  setSidebarImage: (image: string | undefined) => void;
  sidebarRTL: boolean;
  setSidebarRTL: (rtl: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  sidebarBackgroundColor: undefined,
  setSidebarBackgroundColor: () => {},
  sidebarImage: undefined,
  setSidebarImage: () => {},
  sidebarRTL: false,
  setSidebarRTL: () => {},
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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: sidebarRTL ? "row-reverse" : "row",
          }}
        >
          <MyProSidebar />
          {children}
        </div>
      </SidebarContext.Provider>
    </ProSidebarProvider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
