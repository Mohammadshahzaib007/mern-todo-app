import React from "react";

import { Container, Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";

function Footer() {
  return (
    <section style={{ height: "60px", backgroundColor: "#eee" }}>
      <Container style={{ height: "100%" }}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "inherit" }}
        >
          <Typography>&copy; {new Date().getFullYear()} Shahzaib</Typography>
        </Grid>
      </Container>
    </section>
  );
}

export default Footer;
