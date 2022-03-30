import React, { useState } from 'react';
import useDropdownMenu, { DropdownMenuOptions } from '../use-dropdowm-menu';
import { MoreIcon } from "../../Assets/Icon/MoreIcon";

import {
  Container,
  Button,
  ContainerOption,
  ButtonOption
} from "./styles"

interface Props {
	options?: DropdownMenuOptions;
}

const MenuScreen: React.FC<Props> = ({ options }) => {
	const [itemCount, setItemCount] = useState(4);
	const { buttonProps, itemProps, isOpen, setIsOpen, moveFocus } = useDropdownMenu(itemCount, options);

	return (
    <Container>
        <Button {...buttonProps} id='menu-button'>
          <MoreIcon
          color='#fff'
          />
        </Button>

      {
        isOpen && (
          <ContainerOption>
            <ButtonOption id='rename-item'>
              Rename
            </ButtonOption>

            <ButtonOption id='remove-item'>
              Delete
            </ButtonOption>

            <ButtonOption id='share-item'>
              Share
            </ButtonOption>

          </ContainerOption>
        )
      }
    </Container>
	);
};

export default MenuScreen;

  

