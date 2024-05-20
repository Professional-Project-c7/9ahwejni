import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import logo from "../../../assets/img/avatars/logo.png"

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' width={200} marginLeft={10} marginTop={-20} direction='column'>
      <img style={{height:"10"}} src={logo} alt='Description of image' />
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
