import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,useToast,Flex,Avatar,Grid,GridItem,Select,
} from '@chakra-ui/react'
import { FaPeopleArrows, FaCalendarPlus, FaCalendar,} from 'react-icons/fa';
import { AddIcon, PhoneIcon, EmailIcon} from '@chakra-ui/icons'
import React, {useState, useContext, useEffect} from 'react'
import VacancyService from "../../API/VacancyService";
import PositionService from "../../API/PositionService";

const CandidateModal = ({isOpen, onClose, overlay, vacancies, setVacancies}) => {

    const toast = useToast()

    const [positionId,setPositionId] = useState(1)
    const [positions,setPositions] = useState([])


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
                description: "Вакансия создана",
                status: 'success',
                duration: 3500,
                isClosable: true,
                position: 'top',
            })

    }

    useEffect(()=>{

        const fetchPositions = async  ()=>{
            try{
                const response = await PositionService.getAll()
                setPositions(response.data.data.data)
                setPositionId(response.data.data.data[0].id)
                console.log(response.data.data.data)
            }
            catch(e){
                console.log(e)
            }
        }

        fetchPositions()

    },[])

    const newVacancy = () => {
        const vacancy = {positionId}

        const createVacancy = async  (vacancy)=>{
            try{
                const response = await VacancyService.createVacancy(vacancy)
                console.log(response.data)
                if(response.data.status === 'error')
                {showToast(false)}
                else {
                    showToast(true)
                    setVacancies(vacancies.concat(response.data.data.data))
                    onClose()
                }
            }
            catch(e){
                console.log(e)
            }
        }
        createVacancy(vacancy)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="lg"
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
                            borderColor="blue.400"
                            p='20px'
                            ml="5px"
                            borderRadius='20px'>
                            <Text style={{position: "absolute", width: "350px",
                                height: "100px", top: "10%",
                                left: "17%" }} >
                                Новая вакансия на должность
                            </Text>
                            </Flex>
                    </ModalHeader>
                    <ModalBody pb={1}>
                        <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                            <GridItem ml={6} mt={2}>
                                <Text>
                                    Должность:
                                </Text>
                            </GridItem>
                            <GridItem ml={6} colSpan={3}>
                                <Select variant='flushed' value={positionId}
                                        onChange={e =>setPositionId(e.target.value)}>
                                    <option disabled value="">Должность</option>
                                    {
                                        positions.map((p)=>
                                            <option value={p.id} >{p.attributes.name}</option>
                                        )
                                    }
                                </Select>
                            </GridItem>
                        </Grid>

                    </ModalBody>

                    <ModalFooter>

                        <Button  colorScheme='green' mr={3} ml={5}
                                 onClick={()=>{newVacancy()}}
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
