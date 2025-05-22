"use client";
import {
  Drawer,
  ListItemButton,
  ListItemText,
  Divider,
  Toolbar,
  List,
  ListItem,
  Box,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { forwardRef } from "react";

const NextLinkComposed = forwardRef(function NextLinkComposed(props, ref) {
  const { href, ...other } = props;
  return <Link ref={ref} href={href} {...other} />;
});

function NavLink({ href, label, nested = false }) {
  return (
    <ListItemButton
      component={NextLinkComposed}
      href={href}
      sx={{ pl: nested ? 4 : 2 }}
    >
      <ListItemText primary={label} />
    </ListItemButton>
  );
}

export default function SideNav() {
  const drawerWidth = "200px";

  return (
    <Box component="nav" width={drawerWidth}>
      <Drawer
        variant="persistent"
        anchor="left"
        open
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <NavLink href="/" label="Logs" />
          <NavLink href="/log-traces" label="Traces" nested />
          <NavLink href="/log-attributes" label="Attributes" nested />
          <NavLink href="/log-classifiers" label="Classifiers" nested />

          <ListItem>
            <Typography sx={{ pl: 2, fontWeight: "bold" }}>Traces</Typography>
          </ListItem>
          <NavLink href="/trace-events" label="Events" nested />
          <NavLink href="/trace-attributes" label="Attributes" nested />
          <NavLink href="/trace-timerange" label="Time Range" nested />

          <ListItem>
            <Typography sx={{ pl: 2, fontWeight: "bold" }}>Events</Typography>
          </ListItem>
          <NavLink href="/event-attributes" label="Attributes" nested />
          <NavLink href="/event-timerange" label="Time Range" nested />
        </List>
      </Drawer>
    </Box>
  );
}
