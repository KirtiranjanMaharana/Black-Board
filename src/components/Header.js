import React, { useState } from "react";
import variable from "./variable";
import "./Header.css";

let global = variable();
var projectName = prompt("Enter Project Name") || "untitled";
global.projectName = projectName;

const Header = () => {
  return (
    <>
      <div className="fixed border rounded-md top-3 right-7 p-2 z-99 text-white">
        {global.projectName}
      </div>
    </>
  );
};

export default Header;
