import React, { useState } from "react";
import variable from "./variable";
import "./Header.css"

let global = variable();
var projectName = prompt("Enter Project Name") || "untitled";
global.projectName = projectName;

const Header = () => {
  return (
    <>
      <div id="projectName" className="border rounded-md">{global.projectName}</div>
    </>
  );
};

export default Header;
