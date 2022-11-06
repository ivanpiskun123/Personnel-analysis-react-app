import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,FormControl,FormLabel,useToast,Flex,Avatar,Grid,GridItem,
    List,ListItem,ListIcon,Tooltip,Table,Thead,Td,Tr,Tbody,Th,TableContainer,Textarea,Input
    ,InputLeftElement,InputGroup,Radio, RadioGroup,Stack,NumberInput,NumberInputField,NumberInputStepper,
    NumberIncrementStepper,NumberDecrementStepper,Select,
} from '@chakra-ui/react'
import { FaPeopleArrows, FaCalendarPlus, FaCalendar,} from 'react-icons/fa';
import { ViewIcon, CheckIcon, CloseIcon, InfoIcon, DragHandleIcon,CheckCircleIcon,SettingsIcon,
    StarIcon,AddIcon, PhoneIcon, EmailIcon} from '@chakra-ui/icons'
import React, {useState, useContext, useEffect} from 'react'
import VacancyService from "../../API/VacancyService";
import CriteriumService from "../../API/CriteriumService";
import CandidatesService from "../../API/CandidatesService";
import no_avatar from '../../assets/img/avatars/no_avatar.png'
import {AuthContext} from "../../contexts/AuthContext";

const CandidateModal = ({isOpen, onClose, overlay, candidates,setCandidates }) => {

    const toast = useToast()

    const {currentUserId} = useContext(AuthContext);

    const [firstName,setFirstName] = useState('')
    const [secondName,setSecondName] = useState('')
    const [email,setEmail] = useState('')
    const [number,setNumber] = useState('')
    const [expYears,setExpYears] = useState(0.0)
    const [bio,setBio] = useState('')
    const [gender,setGender] = useState('1')
    const [vacancyId,setVacancyId] = useState(1)

    const [criterium,setCriterium] = useState([])
    const [vacancies,setVacancies] = useState([])

    const [scores, setScores] = useState({})

    const showToast = (status)=>{
        !status
            ?
            toast({
                description: "Ошибка, проверьте введенные данные или попробуйте позже",
                status: 'error',
                duration: 3500,
                isClosable: true,
                position: 'top',
            })
            :
            toast({
                description: "Кандидат создан",
                status: 'success',
                duration: 3500,
                isClosable: true,
                position: 'top',
            })

    }

    const resetAllInputs = () => {
        setFirstName('')
        setSecondName('')
        setEmail('')
        setNumber('')
        setExpYears(0.0)
        setBio('')
        setGender('1')
    }

    useEffect(()=>{
        const fetchCriterium = async  ()=>{
            try{
                const response = await CriteriumService.getAll()
                setCriterium(response.data.data.data)
                let obj = {};
                for (let c of response.data.data.data) {
                    obj[c.id] = 1;
                }
                setScores(obj)
            }
            catch(e){
                console.log(e)
            }
        }

        const fetchVacancies = async  ()=>{
            try{
                const response = await VacancyService.getAll()
                setVacancies(response.data.data.data)
                setVacancyId(response.data.data.data[0].id)
                console.log(response.data.data.data)
            }
            catch(e){
                console.log(e)
            }
        }

        fetchCriterium()
        fetchVacancies()
    },[])

    const newCandidate = () => {
        const candidate = {firstName, secondName,email,number,expYears,bio,gender,vacancyId,scores, currentUserId}

        const createCandidate = async  (candidate)=>{
            try{
                const response = await CandidatesService.createCandidate(candidate)
                console.log(response.data)
                if(response.data.status === 'error')
                {showToast(false)}
                else {
                    showToast(true)
                    resetAllInputs()
                    setCandidates(candidates.concat(response.data.data.data))
                    onClose()
                }
                }
            catch(e){
                console.log(e)
            }
        }
        createCandidate(candidate)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="xl"
            >
                {overlay}
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex
                            height="100%"
                            width="100%"
                            maxH='400px'
                            justifyContent={{ sm: "center", md: "space-between" }}
                            align='center'
                            backdropFilter='blur(21px)'
                            boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
                            border='1.5px solid'
                            borderColor="white"
                            bg="gray.500"
                            p='20px'
                            borderRadius='20px'>
                            <Flex
                                align='center'
                                mb={{ sm: "10px", md: "0px" }}
                                direction={{ sm: "column", md: "row" }}
                                w={{ sm: "100%" }}
                                textAlign={{ sm: "center", md: "start" }}>

                                <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                                    <GridItem >
                                        <Avatar
                                            me={{ md: "20px" }}
                                            src={no_avatar}
                                            w='120px'
                                            h='120px'
                                            borderRadius='15px'
                                        />
                                    </GridItem>
                                    <GridItem  >
                                        <Flex direction='column' maxWidth='100%' my={{ sm: "10px" }}>
                                            <Flex direction='row'>
                                                <Input fontSize={{ sm: "sm", lg: "sm" }}
                                                       fontWeight='bold'
                                                       width={190}
                                                       ms={{ sm: "8px", md: "0px" }}
                                                       placeholder='Имя' size='sm'
                                                       variant='flushed'
                                                       mr={4}
                                                       value={firstName}
                                                       onChange={e =>setFirstName(e.target.value)}
                                                        />
                                                <Input fontSize={{ sm: "sm", lg: "sm" }}
                                                       fontWeight='bold'
                                                       width="100%"
                                                       ms={{ sm: "8px", md: "0px" }}
                                                       placeholder='Фамилия' size='sm'
                                                       variant='flushed'
                                                       value={secondName}
                                                       onChange={e =>setSecondName(e.target.value)}
                                                />
                                            </Flex>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    children={<EmailIcon color='gray.300' boxSize={4} />}
                                                />
                                                <Input type='email' size="sm"
                                                       type='tel' placeholder='Почта' variant='flushed'
                                                       value={email}
                                                       onChange={e =>setEmail(e.target.value)}
                                                />
                                            </InputGroup>
                                            <InputGroup>
                                                <InputLeftElement
                                                    pointerEvents='none'
                                                    children={<PhoneIcon color='gray.300' boxSize={4} />}
                                                />
                                                <Input size="sm" type='tel' placeholder='Моб. номер' variant='flushed'
                                                       value={number}
                                                       onChange={e =>setNumber(e.target.value)}
                                                />
                                            </InputGroup>
                                        </Flex>
                                    </GridItem>

                                    <GridItem ml="2" mt={16}>
                                        <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
                                            <Text
                                                fontSize={{ sm: "xs", md: "xs" }}
                                                fontWeight='semibold'
                                                color="gray.600"
                                                ms={{ sm: "8px", md: "0px" }}>
                                                Пол:
                                            </Text>
                                            <Text mt={3}
                                                fontSize={{ sm: "xs", md: "xs" }}
                                                color="gray.600"
                                                fontWeight='semibold'>
                                                Опыт:
                                            </Text>
                                        </Flex>
                                    </GridItem>

                                    <GridItem >
                                        <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }} >
                                                <AddIcon boxSize={8} color='green.300' mb={4} />

                                            <RadioGroup onChange={e=>setGender(e.value)} value={gender} size='sm' mt={4}>
                                                <Stack direction='row'>
                                                    <Radio value='1'>М</Radio>
                                                    <Radio value='2'>Ж</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            <NumberInput size="sm" defaultValue={0} precision={1} step={0.1}
                                                         min={0.0} max={80.0}
                                                         variant='flushed'
                                                        value={expYears}
                                                        onChange={e=>setExpYears(e)}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </Flex>
                                    </GridItem>

                                </Grid>
                            </Flex>


                        </Flex>
                    </ModalHeader>
                    <ModalBody pb={1}>
                        <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                            <GridItem ml={6} mt={2}>
                                <Text>
                                    Вакансия:
                                </Text>
                            </GridItem>
                            <GridItem ml={6} colSpan={3}>
                                <Select variant='flushed' value={vacancyId}
                                        onChange={e =>setVacancyId(e.target.value)}>
                                    <option disabled value="" >Вакансия</option>
                                    {vacancies.reduce(function (f, v) {
                                        if (!v.attributes.status) {
                                            f.push(<option value={v.id} >{v.relationships.position.meta.name} -
                                                №:{v.id}</option>)
                                        }
                                        return f;
                                    }, [])
                                    }
                                </Select>
                            </GridItem>
                        </Grid>
                        <Text mb='8px' mt={5} ml={4}>О кандидате:</Text>
                        <Textarea
                            borderRadius="8px"
                            ml={4}
                            mr={4}
                            width="95%"
                            placeholder='Дополнительная информация о кандидате'
                            size='sm'
                            value={bio}
                            onChange={e=>setBio(e.target.value)}
                        />

                        <TableContainer mt={5} >
                            <Table variant='simple' size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th >Критерии</Th>
                                        <Th>Баллы</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                        {
                                            criterium.map((c)=>
                                                <Tr>
                                                    <Td minWidth="300">
                                                        {c.attributes.name}
                                                    </Td>
                                                    <Td>
                                                        <NumberInput defaultValue={1} min={1} max={5} variant="filled"
                                                            value={scores[c.id]}
                                                             onChange={e=>setScores({...scores, [c.id]: parseInt(e)})}
                                                        >
                                                            <NumberInputField />
                                                            <NumberInputStepper>
                                                                <NumberIncrementStepper />
                                                                <NumberDecrementStepper />
                                                            </NumberInputStepper>
                                                        </NumberInput>
                                                    </Td>
                                                </Tr>
                                            )
                                        }

                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>

                    <ModalFooter>

                        <Button  colorScheme='green' mr={3} ml={5}
                                 onClick={()=>{newCandidate()}}
                                 >
                            Создать
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CandidateModal;
