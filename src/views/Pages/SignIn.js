// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  LightMode,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

const Signin = () => {

  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");
  return (
      <Flex
          direction='column'
          alignSelf='center'
          justifySelf='center'
          overflow='hidden'>
        <Box
            position='absolute'
            minH={{ base: "70vh", md: "50vh" }}
            maxH={{ base: "70vh", md: "50vh" }}
            w={{ md: "calc(100vw - 50px)" }}
            maxW={{ md: "calc(100vw - 50px)" }}
            left='0'
            right='0'
            bgRepeat='no-repeat'
            overflow='hidden'
            zIndex='-1'
            top='0'
            bgImage={BgSignUp}
            bgSize='cover'
            mx={{ md: "auto" }}
            mt={{ md: "14px" }}
            borderRadius={{ base: "0px", md: "20px" }}>
          <Box w='100vw' h='100vh' bg='blue.500' opacity='0.8'></Box>
        </Box>
        <Flex
            direction='column'
            textAlign='center'
            justifyContent='center'
            align='center'
            mt='125px'
            mb='30px'>
          <Text fontSize='4xl' color='white' fontWeight='bold'>
            Приветствуем!
          </Text>
          <Text
              fontSize='md'
              color='white'
              fontWeight='normal'
              mt='10px'
              mb='5px'
              w={{ base: "90%", sm: "80%", lg: "60%", xl: "380px" }}>
            Мы рады снова видеть Вас с нами! Пожалуйста, авторизуйтесь для дальнейших действий
          </Text>
        </Flex>
        <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
          <Flex
              direction='column'
              w='445px'
              background='transparent'
              borderRadius='15px'
              p='40px'
              mx={{ base: "100px" }}
              bg={bgForm}
              boxShadow={useColorModeValue(
                  "0px 5px 14px rgba(0, 0, 0, 0.05)",
                  "unset"
              )}>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                 Имя
              </FormLabel>
              <Input
                  variant='auth'
                  fontSize='sm'
                  ms='4px'
                  type='text'
                  placeholder='Ваш email'
                  mb='24px'
                  size='lg'
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Пароль
              </FormLabel>
              <Input
                  variant='auth'
                  fontSize='sm'
                  ms='4px'
                  type='password'
                  placeholder='Ваш пароль'
                  mb='24px'
                  size='lg'
              />
              <FormControl display='flex' alignItems='center' mb='24px'>
                <Switch id='remember-login' colorScheme='blue' me='10px' />
                <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
                  Запомнить меня
                </FormLabel>
              </FormControl>
              <Button
                  fontSize='13px'
                  variant='dark'
                  fontWeight='bold'
                  w='100%'
                  h='45'
                  mb='24px'>
                Войти
              </Button>
            </FormControl>
            <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                maxW='100%'
                mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                У Вас нет аккаунта? Вам к
                <Link
                    color={titleColor}
                    as='span'
                    ms='5px'
                    href='#'
                    fontWeight='bold'>
                  admin@gmail.com
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
  );
};

export default Signin;
