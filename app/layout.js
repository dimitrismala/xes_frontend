"use client";
import { Providers } from "@/lib/providers";
import { Box } from "@mui/material";
import SideNav from "./components/SideNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Box display="flex" width="100%" height="100%">
          <SideNav />
          <Box flexGrow={1}>
            <Providers>{children}</Providers>
          </Box>
        </Box>
      </body>
    </html>
  );
}
