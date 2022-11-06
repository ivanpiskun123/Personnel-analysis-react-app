// Chakra imports
import {
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,Progress,Button, useDisclosure,ModalOverlay
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import IconBox from "components/Icons/IconBox";
import React, {useEffect,useState} from "react";
import {tablesTableData} from "variables/general";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import TablesTableRow from "../../components/Tables/TablesTableRow";
import { ViewIcon, CheckIcon, CloseIcon, DragHandleIcon, AddIcon} from '@chakra-ui/icons'
import CandidatesService from "../../API/CandidatesService";
import {SearchBar} from "../../components/Navbars/SearchBar/SearchBar";
import {SortBar} from "../../components/Navbars/SortBar/SortBar";
import {FilterBar} from "../../components/Navbars/FilterBar/FilterBar";
import {useCandidates} from '../../hooks/useCandidates';
import LoadingBar from '../../components/Layout/LoadingBar'
import CandidateNewModal from '../../components/Card/CandidateNewModal'
import CandidateModal from "../../components/Card/CandidateModal";


export default function Candidates() {

  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [candidates, setCandidates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState('')
  const searchedCandidates = useCandidates(candidates, sort, query,filter)

  useEffect(() => {

    const fetchCandidates = async  ()=>{
      try{
        const response = await CandidatesService.getAll()
        console.log(response.data.data)
        setCandidates(response.data.data.data)
        setIsLoading(false)
      }
      catch(e){
        console.log(e)
        setIsLoading(false)
      }
    }
    fetchCandidates()
  },[])

  const currentCandidatesInProgress = (candidates)=>{
    return  candidates.filter((obj) =>
        obj.attributes.status == 1
    )
  }

  const currentCandidatesRejected= (candidates)=>{
    return candidates.filter((obj) =>
        obj.attributes.status == 0
    )
  }

  const currentCandidatesApplied = (candidates)=>{
    return  candidates.filter((obj) =>
          obj.attributes.status == 2

    )
  }

  const OverlayOne = () => (
      <ModalOverlay
          backdropFilter='blur(10px)'
      />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayOne />)


  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>

      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
              <Grid templateColumns="repeat(5, 1fr)" gap={3}>
                <GridItem colSpan={4} >
                  <Text fontSize="xl" color={textColor} fontWeight="bold">
                    Кандидаты
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
                        Новый
                      </Button>
                      <CandidateNewModal isOpen={isOpen} onClose={onClose} overlay={overlay} candidates={candidates}
                                      setCandidates={setCandidates} />
                    </GridItem>

                  </Grid>
                </GridItem>
              </Grid>
          </CardHeader>

          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400" >
                  <Th pl="0px" borderColor={borderColor} color="gray.400" >
                    Кандидат
                  </Th>
                  <Th borderColor={borderColor} color="gray.400" >Вакансия</Th>
                  <Th borderColor={borderColor} color="gray.400" >Статус</Th>
                  <Th borderColor={borderColor} color="gray.400" >Баллы</Th>
                  <Th borderColor={borderColor} color="gray.400" >Создан</Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              {

                isLoading ?
                    <LoadingBar/>
                  :
                    searchedCandidates.length==0 ?
                        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                          <GridItem colSpan={3} >
                            <Text fontSize="md" color={textColor}>
                              Кандидатов не найдено
                            </Text>
                          </GridItem>
                        </Grid>
                        :

                  <Tbody>
                    {searchedCandidates.map((row, index, arr) => {
                      return (
                          <TablesTableRow
                              isLast={index === arr.length - 1 ? true : false}
                              key={index}
                              currentCandidate={row}
                              candidates = {candidates}
                              setCandidates = {setCandidates}
                          />
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
