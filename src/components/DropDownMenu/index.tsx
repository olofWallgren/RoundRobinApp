import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';



interface Props {
    choice?: React.ReactNode;
}
const DropDownMenu: React.FC<Props> = ({
    choice,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    
};

let result: string = "Still Playing";
// let bajs: String = "";

const handleClose = () => {
    closeMenu();
    changeName(result);
    
}
function closeMenu() {
    setAnchorEl(null);
}

function changeName(result: String) {
  //  let korv = document.getElementById("result1");
  result = '<p>hej</p>';
  console.log(result);
   // korv.innerHTML = <p>Bajs</p>;
    //  setResult(prevState => (prevState === 'Still Playing' ? MenuItem.value);
  }







  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
          {result}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem id="firstChoice" value="Still Playing" onClick={handleClose}>Still Playing</MenuItem>
        <MenuItem id="secondChoice" value="2 - 0 - 0" onClick={handleClose}>2 - 0 - 0</MenuItem>
        <MenuItem id="thirdChoice" value="2 - 1 - 0" onClick={handleClose}>2 - 1 - 0</MenuItem>
        <MenuItem onClick={handleClose}>1 - 0 - 1</MenuItem>
        <MenuItem onClick={handleClose}>1 - 1 - 1</MenuItem>
        <MenuItem onClick={handleClose}>0 - 2 - 0</MenuItem>
        <MenuItem onClick={handleClose}>1 - 2 - 0</MenuItem>
        <MenuItem onClick={handleClose}>0 - 1 - 1</MenuItem>
      </Menu>
    </div>
  );
}

export default DropDownMenu;