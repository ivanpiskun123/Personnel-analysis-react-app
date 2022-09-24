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
import React, {useEffect} from "react";
import AuthService from "../../API/AuthService";
import {AuthContext} from "../../contexts/AuthContext";
import {useState,useContext} from "react";
import "../../styles/login.css"

const Signin = () => {

  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");

  const {setIsAuth,isAdmin,setIsAdmin} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false)

  const [formStyleClasses, setFormStyleClasses] = useState("")

  useEffect(
      ()=>{
        if(isLoginFailed )
        {
          setFormStyleClasses("shaking-class" );
          setTimeout(() => {setFormStyleClasses("" );}, 800);
          setIsLoginFailed(false)
        }
      },
      [isLoginFailed]
  )

  function handleSubmit(event) {
    event.preventDefault();

    const authFetchUser = async () => {
      try {
        const response = await AuthService.athenticate(email, password);
        console.log(response.data.data)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('user_id',response.data.user_id)
        localStorage.setItem('is_admin',response.data.is_admin)
        localStorage.setItem('auth', 'true')
        setIsAuth(true)
      } catch (e) {
        setIsLoginFailed(true)
      }
    }
    authFetchUser()
  }

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
        <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px' className={formStyleClasses}>
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
            <form noValidate onSubmit={handleSubmit} >
              <FormControl >
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                 Email
              </FormLabel>
              <Input
                  variant='auth'
                  fontSize='sm'
                  ms='4px'
                  type='text'
                  placeholder='Ваш email'
                  mb='24px'
                  size='lg'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  mb='24px'
                  type='submit'>
                Войти
              </Button>
            </FormControl>
            </form>
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
