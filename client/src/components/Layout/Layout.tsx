import React from "react";

import Topbar from "./Topbar";

type PropsType = {
  children: React.ReactNode;
  state: {
    isAuth: boolean;
    token: null | string;
    userId: null | string;
    authLoading: boolean;
    error: null | string;
    name: null | string;
  };
  logoutHandler: () => void
};
function Layout(props: PropsType) {
  const { children, state, logoutHandler } = props;

  return (
    <>
      <nav>
        <Topbar state={state} logoutHandler={logoutHandler} />
      </nav>

      <main>{children}</main>
    </>
  );
}

export default Layout;
