import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.random() * rgb;
    const int = Math.floor(random);
    const hexCode = int.toString(16);
    const colorHex = hexCode.padEnd(6, "0");
    return `#${colorHex}`;
  };

  const generateGradient = () => {
    const colors = [];

    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;
      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background: 'linear-gradient(${degreeString}, ${color1}, ${color2})'`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: 'radial-gradient(circle ${color1}, ${color2})'`,
        });
      }
    }

    setGradients(colors);
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied !", { position: "top-center" });
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="w-11/12 sm:w-10/12 mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-purple-400 rounded-xl p-4">
          <h1 className="text-2xl font-bold sm:text-4xl lg:text-4xl text-black">
            🎨 Gradient Generator - {type}
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              value={num}
              className="border w-full sm:w-[100px] border-slate-30 rounded-lg  p-2"
              placeholder="12"
              onChange={(e) => setNum(Number(e.target.value))}
            />
            <select
              value={type}
              className="border bg-white  w-full sm:w-[120px] rounded-lg  border-slate-300 p-2"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 transition"
              onClick={generateGradient}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grd-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-[150px] rounded-xl  relative shadow-md"
              style={{
                background: item.gradient,
              }}
            >
              <button
                onClick={() => onCopy(item.css)}
                className="bg-black/50 hover:bg-black text-white rounded absolute bottom-3 right-3 text-[10px] py-1 px-2"
              >
                COPY
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
