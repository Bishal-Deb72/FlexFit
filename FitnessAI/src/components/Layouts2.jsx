import SidebarWithToggle from "./SidebarWithToggle"; // Adjust the import path if necessary
import HeaderNav from "./HeaderNav"; // Adjust the import path if necessary
import BackBody from "./BackBodyMap/BackBody";
import ToggleGenderPosition from "./ToggleGenderPosition";

import { SidebarWithBurgerMenu } from "./SidebarWithBurgerMenu";
import LayoutFooter from "./LayoutFooter"; // Import the LayoutFooter component
import FrontBody from "./Front Body Mapping/FrontBody"; // Import the FrontBody component

function Layouts2() {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarWithBurgerMenu />
      <div className="ml-10 flex-1">
        <div className="p-6">
          <HeaderNav />
          <div className="p-6 grid grid-cols-8 gap-2">
            {/* Left Section: Two BackBody components side by side */}
            <div className="col-span-3 text-black">
              <div className="bg-white p-4 mt-6 rounded  flex gap-6">
                {/* Render two BackBody components side by side */}
                <div className="flex-1 bg-slate-200 p-4 rounded shadow">
                  <BackBody />
                </div>
                <div className="flex-1 bg-slate-200 p-4 rounded shadow">
                  <FrontBody />
                </div>
              </div>
            </div>

            {/* Center and Right Sections */}
            <div className="col-span-3">
              {/* Add any content for the center section */}
            </div>
            <div className="col-span-2 mt-10">
              <ToggleGenderPosition />
            </div>
          </div>
        </div>
      </div>
      <LayoutFooter /> {/* Add the LayoutFooter component */}
    </div>
  );
}

export default Layouts2;
