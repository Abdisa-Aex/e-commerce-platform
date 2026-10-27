import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from "../../CategoryCollapse";

const CatergoryPanel = (props) => {
  const close = () => props.setIsOpenCatPanel(false);

  return (
    <Drawer open={props.isOpenCatPanel} onClose={close}>
      <Box sx={{ width: 260 }} role="presentation" className="categoryPanel">
        <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
          Shop by Categories
          <IoCloseSharp onClick={close} className="cursor-pointer text-[20px]" />
        </h3>
        <CategoryCollapse onNavigate={close} />
      </Box>
    </Drawer>
  );
};

export default CatergoryPanel;
