// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex, Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { HSeparator } from "components/Separator/Separator";
import React, { useState, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";


export default function Configurator(props) {

  const {
    sidebarVariant,
    setSidebarVariant,
    secondary,
    isOpen,
    onClose,
    fixed,
    ...rest
  } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  let bgButtonStat = useColorModeValue(
      "linear-gradient(81.62deg, #0084DB 2.25%, #0056F0 79.87%)",
      "white"
  );
  let colorButton = useColorModeValue("white", "gray.700");
  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");
  const bgDrawer = useColorModeValue("white", "navy.800");
  const settingsRef = React.useRef();
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent bg={bgDrawer}>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="17px" fontWeight="bold" mt="16px">
              Дополнительные настройки
            </Text>
            <HSeparator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Flex justifyContent="space-between " mb="16px">
                <Text fontSize="14px" fontWeight="600" mb="4px">
                  Зафиксировать топ-меню
                </Text>
                <Switch
                  colorScheme="blue"
                  isChecked={switched}
                  onChange={() => {
                    if (switched === true) {
                      props.onSwitch(false);
                      setSwitched(false);
                    } else {
                      props.onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
              </Flex>

              <HSeparator />
              {

                    <>
                      <Box mt="24px">
                        <Box mb="10px">
                          <Link
                              href={"http://0.0.0.0:3003/admin?token="+localStorage.getItem('token')} target="_blank"
                              w="100%"
                              mb="16px"
                          >
                            <Button
                                w="100%"
                                mb="16px"
                                bg={bgButton}
                                color={colorButton}
                                fontSize="xs"
                                variant="no-effects"
                                px="30px"
                            >
                              Администрирование
                            </Button>

                          </Link>

                          <Link
                              href={"http://0.0.0.0:3003/admin?token="+localStorage.getItem('token')} target="_blank"
                              w="100%"
                              mb="16px"
                          >
                            {/*<Button*/}
                            {/*    w="100%"*/}
                            {/*    mb="16px"*/}
                            {/*    bg={bgButtonStat}*/}
                            {/*    color={colorButton}*/}
                            {/*    fontSize="xs"*/}
                            {/*    variant="no-effects"*/}
                            {/*    px="30px"*/}
                            {/*>*/}
                            {/*  Анализ продуктивности*/}
                            {/*</Button>*/}

                          </Link>

                        </Box>
                      </Box>
                      <HSeparator    />
                    </>
              }
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
