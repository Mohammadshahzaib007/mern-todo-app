import React from "react";

import { NavLink } from "react-router-dom";
import { Button, makeStyles, Box } from "@material-ui/core";

function TodoHeader() {
  const classes = useStyles();
  return (
    <nav className={classes.navContainer}>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-evenly"
        my="2rem"
        height="40px"
        // alignItems="center"
      >
        <NavLink exact to="/all-todos">
          <Button color="primary">All Todos</Button>
        </NavLink>
        <NavLink to="/completed">
          <Button color="primary">Completed Todos</Button>
        </NavLink>
      </Box>
    </nav>
  );
}

export default TodoHeader;

const useStyles = makeStyles((theme) => ({
  navContainer: {
    width: "100%",

    "& a": {
      textDecoration: "none",
    },

    "& .active > .MuiButtonBase-root": {
      borderBottom: "2px solid" + theme.palette.primary.main,
      borderRadius: 0,
    },
  },
}));
