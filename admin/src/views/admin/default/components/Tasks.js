// Chakra imports
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
  Center,
  grid,
  color,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import Menu from "components/menu/MainMenu";
import IconBox from "components/icons/IconBox";

// Assets
import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import React from "react";
import { transparentize } from "@chakra-ui/theme-tools";

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  return (
    <div>
    {/* <div style={{display:"inline-flex",alignItems:Center,color:"#fff",padding:"10px",borderRadius:"4px",border:"1px solid #fff"}}> */}
    {/* <style>
        {`
          input::placeholder {
            color: #e3e3e3;
            font:inherit;
          }
        `}
      </style>
      <input
        type="text"
        placeholder="Search..."
        style={{background:transparentize,color:"inherit", border:"none",outline:"none"}}
        // value={query}
        // onChange={(e) => setQuery(e.target.value)}
      />
      <button type="button" style={{background:transparentize,color:"inherit", border:"none",outline:"none" , display:grid,placeItems:Center,width:"25px",height:"25px",cursor:"pointer",transition: 'color 0.25s'}}>
        Search
      </button>
    </div> */}
    </div>
  );
}
