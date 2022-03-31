import React, { useState } from 'react';
import useDropdownMenu, { DropdownMenuOptions } from '../use-dropdowm-menu';
import { MoreIcon } from "../../Assets/Icon/MoreIcon";

import {
  Container,
  Button,
  ContainerOption,
  ContainerLeft,
  ContainerOptionLeft,
  ContainerOptionRight,
  ContainerRight,
  ButtonOption
} from "./styles"

interface Props {
	options?: DropdownMenuOptions;
  left?: boolean;
  right?: boolean;
  center?: boolean;
}

const MenuScreen: React.FC<Props> = ({ options, center, left, right }) => {
	const [itemCount, setItemCount] = useState(4);
	const { buttonProps, itemProps, isOpen, setIsOpen, moveFocus } = useDropdownMenu(itemCount, options);

	return (
    <>
      {
        center && (
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
        )
      }
      {left && (
        <ContainerLeft>
          <Button {...buttonProps} id='menu-button'>
            <MoreIcon
            color='#fff'
            />
          </Button>

        {
          isOpen && (
            <ContainerOptionLeft>
              <ButtonOption id='rename-item'>
                Rename
              </ButtonOption>

              <ButtonOption id='remove-item'>
                Delete
              </ButtonOption>

              <ButtonOption id='share-item'>
                Share
              </ButtonOption>

            </ContainerOptionLeft>
          )
        }
      </ContainerLeft>
      )}
      {
        right && (
          <ContainerRight>
              <Button {...buttonProps} id='menu-button'>
                <MoreIcon
                color='#fff'
                />
              </Button>

            {
              isOpen && (
                <ContainerOptionRight>
                  <ButtonOption id='rename-item'>
                    Rename
                  </ButtonOption>

                  <ButtonOption id='remove-item'>
                    Delete
                  </ButtonOption>

                  <ButtonOption id='share-item'>
                    Share
                  </ButtonOption>

                </ContainerOptionRight>
              )
            }
          </ContainerRight>
        )
      }
    </>
	);
};

export default MenuScreen;

  

