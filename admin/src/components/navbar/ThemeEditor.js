import React from 'react'
import {
  ThemeEditor as ThemeEditorContainer,
  ThemeEditorDrawer,
  ThemeEditorColors,
  ThemeEditorFontSizes
} from '@hypertheme-editor/chakra-ui'
import { Button, Icon } from '@chakra-ui/react'
import { CgColorPicker } from 'react-icons/cg'
import { ImFontSize } from 'react-icons/im'
import { MdPalette } from 'react-icons/md'

export function ThemeEditor(props) {
    return (
        <ThemeEditorContainer>
          <ThemeEditorButton {...props} />
          <ThemeEditorDrawer hideUpgradeToPro>
            <ThemeEditorColors icon={CgColorPicker} title="Colors" />
            <ThemeEditorFontSizes icon={ImFontSize} title="Font Sizes" />
          </ThemeEditorDrawer>
        </ThemeEditorContainer>
      )
}

function ThemeEditorButton({ onOpen, navbarIcon, ...rest }) {
  return (
   <div>

   </div> 
  )
}

