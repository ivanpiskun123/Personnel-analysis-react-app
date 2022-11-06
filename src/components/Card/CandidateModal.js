import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,FormControl,FormLabel,useToast,Flex,Avatar,Grid,GridItem,
    List,ListItem,ListIcon,Tooltip,Table,Thead,Td,Tr,Tbody,Th,TableContainer,Textarea
} from '@chakra-ui/react'
import { FaPeopleArrows, FaCalendarPlus, FaCalendar, } from 'react-icons/fa';
import { ViewIcon, CheckIcon, CloseIcon, InfoIcon, DragHandleIcon,CheckCircleIcon,SettingsIcon,
    StarIcon} from '@chakra-ui/icons'
import React from 'react'
import VacancyService from "../../API/VacancyService";
import CandidatesService from "../../API/CandidatesService";
import no_avatar from "../../assets/img/avatars/no_avatar.png";


const CandidateModal = ({isOpen, onClose, overlay,candidate,candidates,setCandidates }) => {

    const isCandidateViewing = (candidate)=>{
        return candidate.attributes.status !== 1
    }
    const toast = useToast()

    const showToast = (status)=>{
        status === 0
            ?
            toast({
                description: "Кандидат отклонен",
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
            :
        toast({
            description: "Кандидат принят",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
        })

    }

    const changeStatusOfCandidate = (status) => {
        const updateVacancies = async  ()=>{
            try{
                const response = await VacancyService.updateStatusVacancy(candidate.relationships.vacancy.data.id,status,candidate.id)
            }
            catch(e){
                console.log(e)
            }
        }
        updateVacancies()

        if(status===2){
            setCandidates(
                candidates.map(object => {
                    if (object.relationships.vacancy.data.id === candidate.relationships.vacancy.data.id && object !== candidate)
                    {
                        return {...object, attributes: {...object.attributes, status: 0} };
                    }
                    else if (object === candidate) {
                        return {...object, attributes: {...object.attributes, status: 2} };
                    }
                    return object;
                })
            )
        } else if(status === 0){
            setCandidates(
                candidates.map(object => {
                    if (object === candidate) {
                        return {...object, attributes: {...object.attributes, status: 0} };
                    }
                    return object;
                })
            )
        }
        console.log(candidates)
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
                            bg="gray.100"
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
                                            src={
                                                candidate.attributes.avatar === "" ||  candidate.attributes.avatar === null ?
                                                    no_avatar
                                                    :
                                                    `http://localhost:3003${candidate.attributes.avatar}`
                                            }
                                            w='120px'
                                            h='120px'
                                            borderRadius='15px'
                                        />
                                    </GridItem>
                                    <GridItem  >
                                        <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
                                            <Text
                                                fontSize={{ sm: "lg", lg: "xl" }}
                                                fontWeight='bold' color="black"
                                                ms={{ sm: "8px", md: "0px" }}>
                                                {`${candidate.attributes.first_name} ${candidate.attributes.second_name}`}
                                            </Text>
                                            <Text
                                                fontSize={{ sm: "sm", md: "md" }}
                                                color="gray.600"
                                                fontWeight='semibold'>
                                                {candidate.attributes.email}
                                            </Text>
                                            <Text
                                                fontSize={{ sm: "sm", md: "md" }}
                                                color="gray.400"
                                                fontWeight='semibold'>
                                                {candidate.attributes.number}
                                            </Text>
                                        </Flex>
                                    </GridItem>

                                    <GridItem ml="9" mt={12}>
                                        <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
                                            <Text
                                                fontSize={{ sm: "xs", md: "xs" }}
                                                fontWeight='semibold'
                                                color="gray.600"
                                                ms={{ sm: "8px", md: "0px" }}>
                                                Пол:
                                            </Text>
                                            <Text
                                                fontSize={{ sm: "xs", md: "xs" }}
                                                color="gray.600"
                                                fontWeight='semibold'>
                                                Опыт:
                                            </Text>
                                            <Text
                                                fontSize={{ sm: "xs", md: "xs" }}
                                                color="gray.600"
                                                fontWeight='semibold'>
                                                Баллы:
                                            </Text>
                                        </Flex>
                                    </GridItem>

                                    <GridItem  >

                                        <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }} >
                                            {
                                                candidate.attributes.status===0 ?
                                                <CloseIcon boxSize={8} color='red.600' mb={4} />
                                                :
                                                candidate.attributes.status===1 ?
                                                <ViewIcon boxSize={8} color='blue.600' mb={4} />
                                                :
                                                <CheckIcon boxSize={8} color='green.600' mb={4} />
                                            }

                                            <Text
                                                fontSize={{ sm: "xs", md: "xs" }}
                                                fontWeight='semibold'
                                                color="gray.500"
                                                ms={{ sm: "8px", md: "0px" }}>
                                                {candidate.attributes.gender==='male' ?
                                                'M'
                                                :
                                                'Ж'}
                                            </Text>
                                            <Text
                                                fontSize={{ sm: "xs", md: "xs" }}
                                                color="gray.500"
                                                fontWeight='semibold'>
                                                {candidate.attributes.expirience_years} г.
                                            </Text>
                                            <Text
                                                fontSize={{ sm: "xs", md: "xs" }}
                                                color="gray.500"
                                                fontWeight='semibold'>
                                                {candidate.meta.score_sum}/{candidate.meta.score_max_sum}
                                            </Text>
                                        </Flex>
                                    </GridItem>

                                </Grid>
                            </Flex>


                        </Flex>
                    </ModalHeader>
                    <ModalBody pb={1}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                            <GridItem ml={6}>
                                <List spacing={3} style={{fontSize: "15px"}}>
                                    <ListItem>
                                        <ListIcon as={FaCalendarPlus} color='gray.600' />
                                        Дата создания
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaPeopleArrows} color='gray.600' />
                                        Позиция
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon as={FaCalendar} color='gray.600' />
                                        Дата создания позиции
                                    </ListItem>
                                </List>
                            </GridItem>
                            <GridItem mb={3}>
                                <List spacing={3} style={{fontSize: "15px"}}>
                                    <ListItem>
                                        {candidate.attributes.created_at}
                                    </ListItem>
                                    <ListItem>
                                        {candidate.relationships.vacancy.meta.position_name} - {candidate.relationships.vacancy.data.id}
                                    </ListItem>
                                    <ListItem>
                                        {candidate.relationships.vacancy.meta.opening_date}
                                    </ListItem>
                                </List>
                            </GridItem>
                        </Grid>
                        <hr/>
                            <Text mb='8px' mt={5} ml={4}>О кандидате:</Text>
                            <Textarea mb={3}
                                      value={candidate.attributes.biography === null  ?
                                    'Нет информации' :
                                    candidate.attributes.biography
                                }
                                borderRadius="8px"
                                ml={4}
                                mr={4}
                                size='sm'
                                width="95%"
                                height="150"
                                variant="outline"
                            />
                        <hr />

                        <TableContainer >
                            <Table variant='simple' size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th>Критерии</Th>
                                        <Th>Кандидата</Th>
                                        <Th>Должности</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        candidate.relationships.candidate_criterium_scores.meta.criterium_scores.map((cc)=>
                                                <Tr>
                                                    <Td>{cc.name}</Td>
                                                    <Td>{[...Array(cc.value_candidate)].map((e)=>
                                                        <StarIcon color='yellow.400'  />
                                                    )}
                                                        {[...Array(5-cc.value_candidate)].map((e)=>
                                                            <StarIcon color='gray.300'  />
                                                        )}
                                                    </Td>
                                                    <Td>{[...Array(cc.value_position)].map((e)=>
                                                        <StarIcon color='yellow.500'  />
                                                    )}
                                                        {[...Array(5-cc.value_position)].map((e)=>
                                                            <StarIcon color='gray.300'  />
                                                        )}
                                                    </Td>
                                                </Tr>
                                        )
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>

                    <ModalFooter>
                        {isCandidateViewing(candidate) ?
                            null
                        :
                            <Tooltip label={`В случае принятия другие кандидаты вакансии ${candidate.relationships.vacancy.meta.position_name}-${candidate.relationships.vacancy.data.id} будут отклонены`} fontSize='sm' placement='left'>
                            <InfoIcon color="gray.500" />
                            </Tooltip>
                        }

                        <Button  colorScheme='green' mr={3} ml={5}
                                 onClick={()=>{changeStatusOfCandidate(2);showToast(2)}}
                                 disabled={isCandidateViewing(candidate)}>
                            Принять
                        </Button>
                        <Button colorScheme='red'
                                onClick={()=>{changeStatusOfCandidate(0);showToast(0)}}
                                variant="outline" disabled={isCandidateViewing(candidate)}>
                            Отклонить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CandidateModal;
