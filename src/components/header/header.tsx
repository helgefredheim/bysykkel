import Meny from "../meny/meny";
import Container from "../container/Container";
import React, { FunctionComponent } from "react";
import "./header.css";

const Header: FunctionComponent = () => {
  return (
    <Container className="header" padded>
      <h1 className="header__tittel">Bysykler i Oslo</h1>
      <Meny />
    </Container>
  );
};

export default Header;
