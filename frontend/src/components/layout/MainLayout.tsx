import React from "react";
import Header from "@src/components/Header";

function MainLayout(props: any) {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      {props.children}
    </div>
  );
}

export default MainLayout;
