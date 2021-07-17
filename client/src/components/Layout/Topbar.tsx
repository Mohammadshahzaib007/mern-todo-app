import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Avatar, Container } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontWeight: "normal",
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

type PropsType = {
  state: {
    isAuth: boolean;
    token: null | string;
    userId: null | string;
    authLoading: boolean;
    error: null | string;
    name: null | string;
  };
  logoutHandler: () => void;
};

export default function Topbar(props: PropsType) {
  const { state, logoutHandler } = props;

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6" className={classes.title}>
              Welcome, {name} 🥳
            </Typography>
            {state.isAuth ||
              (token && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {/* <AccountCircle /> */}
                    <Avatar color="secondary" className={classes.orange}>
                      {name?.charAt(0)}
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        logoutHandler();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ))}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
