import "./ToolBox.css";
import { redrawCanvas } from "../board/Board";
import { useState } from "react";
import variable from "./variable";
import { FiSettings } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { BsEraser, BsArrowsAngleContract, BsSquare } from "react-icons/bs";
import { CiUndo } from "react-icons/ci";
import { LiaRedoAltSolid, LiaHandPointer } from "react-icons/lia";

let global = variable();

export default function ToolBox() {
  const [strokeWidth, setstrokeWidth] = useState(2);
  const [settingDropdown, setSettingDropdown] = useState(false);

  function strokeChange() {
    const strokevalue = document.getElementById("customRange1");
    setstrokeWidth(strokevalue.value);
    global.strokeWidth = strokeWidth;
  }

  function strokeColor(color) {
    global.strokeStyle = color;
  }

  function draw() {
    global.canvas.style.cursor =
      "url('https://img.icons8.com/FFFFFF/external-those-icons-lineal-color-those-icons/24/FF0C0C/external-cursor-selection-cursors-those-icons-lineal-color-those-icons-1.png'), auto";
    global.prevState = global.draw;
    global.draw = "DRAW";
  }

  function erase() {
    global.canvas.style.cursor =
      "url('https://img.icons8.com/color/48/eraser.png'), auto";
    global.prevState = global.draw;
    global.draw = "ERASE";
  }

  function undo() {
    let curr = global.drawing.pop();
    if (curr === undefined) return;
    global.state--;
    global.stack.push(curr);
    redrawCanvas();
  }

  function redo() {
    let curr = global.stack.pop();
    if (curr === null) return;
    global.state++;
    global.drawing.push(curr);
    redrawCanvas();
  }

  function pan() {
    global.canvas.style.cursor = "grabbing";
    global.prevState = global.draw;
    global.draw = "PAN";
    redrawCanvas();
  }

  function setCentre() {
    global.offsetX = 0;
    global.offsetY = 0;
    global.scale = 1;
    redrawCanvas();
  }

  function drawSqaure() {
    global.canvas.style.cursor =
      "url('https://img.icons8.com/ios-glyphs/30/move.png'), auto";
    global.prevState = global.draw;
    global.draw = "SQUARE";
  }

  function loadBoard() {
    if (document.querySelector(".file").files[0] === undefined) {
      alert("No file Selected");
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = function () {
      let parsedJSON = JSON.parse(fileReader.result);
      global.drawing = parsedJSON;
      redrawCanvas();
    };
    fileReader.readAsText(document.querySelector(".file").files[0]);
  }

  function saveBoard() {
    const blob = new Blob([JSON.stringify(global.drawing, null, 3)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${global.projectName}.json`;
    a.click();
  }

  function saveImage() {
    var canvas = global.canvas;
    const dataUrl = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `${global.projectName}.png`;
    anchor.click();
  }

  function openGithub() {
    window.open("https://github.com/ZadeAbhishek/infiboard");
  }

  return (
    <>
      <div className="top-10 left-3 p-5 fixed z-99 text-gray-200 ">
        <label htmlFor="customRange1" className="form-label">
          Stroke
        </label>
        <input
          type="range"
          min="2"
          max="15"
          value={strokeWidth}
          className="form-range ml-2"
          id="customRange1"
          onChange={strokeChange}
        ></input>
      </div>

      <div
        className="btn-group color-btn-grp z-99"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button
          onClick={() => strokeColor("blue")}
          type="button"
          className="btn bg-blue-700 p-[10px] w-10 rounded-l-lg hover:bg-blue-500 "
        ></button>
        <button
          onClick={() => strokeColor("red")}
          type="button"
          className="btn bg-red-700 p-[10px] w-10 hover:bg-red-500 "
        ></button>
        <button
          onClick={() => strokeColor("yellow")}
          type="button"
          className="btn bg-yellow-700 p-[10px] w-10 hover:bg-yellow-500"
        ></button>
        <button
          onClick={() => strokeColor("green")}
          type="button"
          className="btn bg-green-700 p-[10px] w-10 hover:bg-green-500"
        ></button>
        <button
          onClick={() => strokeColor("#fff")}
          type="button"
          className="btn bg-white p-[10px] w-10 rounded-r-lg hover:bg-gray-300 "
        ></button>
      </div>

      <div
        className=" top-[35%] left-5  fixed z-100 bg-white flex flex-col rounded-md"
        role="group"
        aria-label="Vertical button group"
      >
        <button
          onClick={draw}
          id="drawBtn"
          type="button"
          className="btn btn-light hover:bg-gray-400 p-3"
        >
          <GoPencil size={16} />
        </button>

        <button
          onClick={erase}
          id="drawBtn"
          type="button"
          className="btn btn-light hover:bg-gray-400 p-3"
        >
          <BsEraser size={16} />
        </button>

        <button
          onClick={undo}
          id="drawBtn"
          type="button"
          className="btn btn-light hover:bg-gray-400 p-3"
        >
          <CiUndo size={16} />
        </button>

        <button
          onClick={redo}
          id="drawBtn"
          type="button"
          className="btn btn-light hover:bg-gray-400 p-3"
        >
          <LiaRedoAltSolid size={16} />
        </button>

        <button
          onClick={pan}
          id="PanBtn"
          type="button"
          className="btn btn-light hover:bg-gray-400 p-3"
        >
          <LiaHandPointer size={16} />
        </button>

        <button
          onClick={setCentre}
          type="button"
          className="btn btn-light hover:bg-gray-400 p-3"
        >
          <BsArrowsAngleContract size={16} />
        </button>

        <button
          onClick={drawSqaure}
          type="button"
          className="btn btn-light hover:bg-gray-400 p-3"
        >
          <BsSquare size={16} />
        </button>
      </div>

      <div className="bg-white p-2 rounded-md fixed right-7 bottom-3 hover:bg-gray-400 ">
        <button onClick={openGithub} type="button" className="btn btn-light">
          <AiFillGithub size={20} />
        </button>
      </div>

      <div className="bg-white p-2 rounded-md fixed left-3 bottom-3 hover:bg-gray-400 ">
        <button
          type="button"
          onClick={() => setSettingDropdown(!settingDropdown)}
        >
          <FiSettings size={20} />
        </button>
        {settingDropdown && (
          <>
            <ul className="p-[6%] absolute bottom-5 text-white left-10 border-2 rounded-md ">
              <li className="ml-2 mb-4">
                <a onClick={saveImage} className="dropdown-item">
                  Save Image
                </a>
              </li>
              <li className="ml-2 mb-4" onClick={saveBoard}>
                <a className="dropdown-item">Save Board</a>
              </li>
              <li className="ml-2 mb-4">
                <input type="file" className="file"></input>
              </li>
              <li className="ml-2 mb-4">
                <button className="text-blue-800" onClick={loadBoard}>
                  Submit
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}
