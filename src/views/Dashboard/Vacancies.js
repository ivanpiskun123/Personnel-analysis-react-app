// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,SimpleGrid,
  Stat, StatLabel,StatNumber,Grid,GridItem,useDisclosure,
  ModalOverlay,Button,Td,Badge
} from "@chakra-ui/react";
import { ViewIcon, CheckIcon,AddIcon} from '@chakra-ui/icons'
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import React, {useEffect, useState} from "react";
import VacancyService from "../../API/VacancyService";
import {useVacancies} from "../../hooks/useVacancies";
import IconBox from "../../components/Icons/IconBox";
import {FaSearchPlus,FaDoorClosed,} from 'react-icons/fa';
import {SearchBarVacancies} from "../../components/Navbars/SearchBar/SearchBarVacancies";
import {SortBarVacancies} from "../../components/Navbars/SortBar/SortBarVacancies";
import {FilterBarVacancies} from "../../components/Navbars/FilterBar/FilterBarVacancies";
import LoadingBar from "../../components/Layout/LoadingBar";
import VacancyNewModal from "../../components/Card/VacancyNewModal";

function Vacancies() {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [vacancies, setVacancies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState('')
  const searchedVacancies = useVacancies(vacancies, sort, query,filter)


  useEffect(()=>{

    const fetchVacancies = async  ()=>{
      try{
        const response = await VacancyService.getAll()
        console.log(response.data.data.data)
        setVacancies(response.data.data.data)
        setIsLoading(false)
      }
      catch(e){
        console.log(e)
        setIsLoading(false)
      }
    }

    fetchVacancies()

  },[])

  const currentVacanciesOpened = (vacancies)=>{
    return  vacancies.filter((obj) =>
        ! obj.attributes.status )
  }

  const currentVacanciesClosed = (vacancies)=>{
    return  vacancies.filter((obj) =>
        obj.attributes.status )
  }

  const OverlayOne = () => (
      <ModalOverlay
          backdropFilter='blur(10px)'
      />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  const statusNamed = (status)=>
  {
      if(status)
      {
        return {statusName: "Закрыта", statusBg: "green.200"}
      }
      else
      {
        return {statusName: "Открыта", statusBg: "red.400"}
      }
  }

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>

      <Card
        my="22px"
        overflowX={{ sm: "scroll", xl: "hidden" }}
        pb="0px"
      >
        <CardHeader p="6px 0px 22px 0px">
          <Grid templateColumns="repeat(5, 1fr)" gap={3}>
            <GridItem colSpan={4} >
              <Text fontSize="xl" color={textColor} fontWeight="bold">
                Вакансии
              </Text>
            </GridItem>
            <GridItem >
              <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                <GridItem mr={14}>
                  <Button size="sm" variant="outline"
                          colorScheme="green" bgcolor="green.400"
                          leftIcon={<AddIcon />}
                          onClick={() => {
                            setOverlay(<OverlayOne />)
                            onOpen()}}
                  >
                    Новая
                  </Button>
                  <VacancyNewModal isOpen={isOpen} onClose={onClose} overlay={overlay} vacancies={vacancies}
                                   setVacancies={setVacancies} />
                </GridItem>

              </Grid>
            </GridItem>
          </Grid>
        </CardHeader>


        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th pl="0px" color="gray.400" borderColor={borderColor}>
                  Должность
                </Th>
                <Th color="gray.400" borderColor={borderColor}>Дата создания</Th>
                <Th color="gray.400" borderColor={borderColor}>Статус</Th>
                <Th color="gray.400" borderColor={borderColor}>Дата закрытия</Th>
                <Th></Th>
              </Tr>
            </Thead>
            {

              isLoading ?
                  <LoadingBar/>
                  :
                  searchedVacancies.length==0 ?
                      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                        <GridItem colSpan={3} >
                          <Text fontSize="md" color={textColor}>
                            Вакансий не найдено
                          </Text>
                        </GridItem>
                      </Grid>
                      :

                      <Tbody>
                        {searchedVacancies.map((row, index, arr) => {
                          return (
                              <Tr>

                                <Td borderColor={borderColor} borderBottom={index === arr.length - 1 ? true : null}>
                                  <Flex direction="column">
                                    <Text fontSize="md" color={textColor} fontWeight="bold">
                                      {row.relationships.position.meta.name} №{row.id}
                                    </Text>
                                  </Flex>
                                </Td>

                                <Td>
                                  <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                                    {row.attributes.opening_date}
                                  </Text>
                                </Td>

                                <Td>
                                  <Badge
                                      bg={statusNamed(row.attributes.status).statusBg}
                                      color="white"
                                      fontSize="14px"
                                      p="3px 10px"
                                      borderRadius="8px"
                                  >
                                    {statusNamed(row.attributes.status).statusName}
                                  </Badge>
                                </Td>

                                <Td>
                                  <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                                    {row.attributes.closing_date ?
                                        row.attributes.closing_date
                                        :
                                        "-"
                                    }
                                  </Text>
                                </Td>

                              </Tr>
                          );
                        })}
                      </Tbody>
            }
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Vacancies;
