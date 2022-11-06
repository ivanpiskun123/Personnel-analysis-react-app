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
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='20px'>

        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  Рассматриваются
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    {currentCandidatesInProgress(searchedCandidates).length}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <ViewIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>

            <Text color='gray.400' fontSize='sm' >
              <ViewIcon color='blue.400' mr="10px" />
              В процессе оценки
            </Text>
          </Flex>
        </Card>

        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
                flexDirection='row'
                align='center'
                justify='center'
                w='100%'
                mb='25px'>
              <Stat me='auto'>
                <StatLabel
                    fontSize='xs'
                    color='gray.400'
                    fontWeight='bold'
                    textTransform='uppercase'>
                  Приняты
                </StatLabel>
                <Flex>

                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    {currentCandidatesApplied(searchedCandidates).length}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                  borderRadius='50%'
                  as='box'
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}>
                <CheckIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>

            <Text color='gray.400' fontSize='sm' >
              <CheckIcon color='green.400' mr="10px" />
              Приняты на работу
            </Text>
          </Flex>
        </Card>

        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
                flexDirection='row'
                align='center'
                justify='center'
                w='100%'
                mb='25px'>
              <Stat me='auto'>
                <StatLabel
                    fontSize='xs'
                    color='gray.400'
                    fontWeight='bold'
                    textTransform='uppercase'>
                  Отклонены
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    {currentCandidatesRejected(searchedCandidates).length}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                  borderRadius='50%'
                  as='box'
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}>
                <CloseIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>

            <Text color='gray.400' fontSize='sm' >
              <CloseIcon color='red.400' mr="10px" />
              Кандидаты отклонены
            </Text>
          </Flex>
        </Card>

        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
                flexDirection='row'
                align='center'
                justify='center'
                w='100%'
                mb='5px'>
              <Stat me='auto'>
                <StatLabel
                    fontSize='xs'
                    color='gray.400'
                    fontWeight='bold'
                    textTransform='uppercase'>
                  Все
                </StatLabel>
                <Flex>

                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    {searchedCandidates.length}
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                  borderRadius='50%'
                  as='box'
                  h={"45px"}
                  w={"45px"}
                  bg={iconBlue}>
                <DragHandleIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>

            <Flex align='center'>
              <Progress
                  size='xs'
                  value={searchedCandidates.length/candidates.length*100}
                  minW='120px'
              />
              <Text
                  ml={"8px"}
                  fontWeight='bold'
                  fontSize='sm'
                  me='12px'>
                {searchedCandidates.length}/{candidates.length}
              </Text>
            </Flex>

            <Text color='gray.400' fontSize='sm' >
              <DragHandleIcon color='gray.400' mr="10px" />
              Все кандидаты
            </Text>
          </Flex>
        </Card>
      </SimpleGrid>
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
                    <GridItem >
                      <SortBar sort={sort} setSort={setSort} />
                      </GridItem>
                    <GridItem  >
                      <FilterBar filter={filter} setFilter={setFilter} />
                    </GridItem>
                    <GridItem   >
                      <SearchBar query={query} setQuery={setQuery} />
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
