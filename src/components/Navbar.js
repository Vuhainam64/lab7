import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          List Of Film
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/top">
          Top
        </Button>
        <Button color="inherit" component={Link} to="/top">
          News
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact
        </Button>
        {!user ? (
          <Button color="inherit" component={Link} to="/signin">
            Signin
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/signin">
            {user.displayName}
          </Button>
        )}
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
