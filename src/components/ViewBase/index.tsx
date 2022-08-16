import React, { useState } from "react";
import "./view-base.scss";
import Header from "../Header";
import { Hidden, makeStyles, useMediaQuery } from "@material-ui/core";
import { TRANSITION_DURATION } from "../../constants/style";
import MobileDrawer from "../Drawer/mobile-drawer";
import Drawer from "../Drawer";
import Footer from "../Footer";
import Messages from "../Messages";

interface IViewBaseProps {
  children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
        width: "100%",
        flexShrink: 0,
    },
},
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: TRANSITION_DURATION,
    }),
    height: "100%",
    overflow: "auto",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: TRANSITION_DURATION,
    }),
  },
}));

function ViewBase({ children }: IViewBaseProps) {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [useMobile, setUseMobile] = useState(false);

  const isSmallerScreen = useMediaQuery("(max-width: 733px)");
  // const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const showAnyway = () => {
    setUseMobile(true);
  };

  return (
    <div className="view-base-root">
      <Messages />
      <div className={classes.drawer}>
          <Hidden mdUp>
              <MobileDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          </Hidden>
          <Hidden smDown>
              <Drawer />
          </Hidden>
      </div>
      <div className={`${classes.content} ${isSmallerScreen && classes.contentShift}`}>
        <Header open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        {children}
        <Footer />
        
      </div>
    </div>
  );
}

export default ViewBase;
