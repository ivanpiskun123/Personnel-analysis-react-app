// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, {useEffect,useState} from "react";
import {tablesTableData} from "variables/general";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import TablesTableRow from "../../components/Tables/TablesTableRow";
import { ViewIcon, CheckIcon, CloseIcon, DragHandleIcon} from '@chakra-ui/icons'
import CandidatesService from "../../API/CandidatesService";

export default function Candidates() {

  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [candidates, setCandidates] = useState([])

  useEffect(() => {

    const fetchCandidates = async  ()=>{
      try{
        const response = await CandidatesService.getAll()
        console.log(response.data.data)
        setCandidates(response.data.data.data.map((docData)=>docData.attributes ))
      }
      catch(e){
        console.log(e) }
    }
    fetchCandidates()
  },[])

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
                    222
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
                    222
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
                    222
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
                mb='25px'>
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
                    222
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

            <Text color='gray.400' fontSize='sm' >
              <DragHandleIcon color='gray.400' mr="10px" />
              Все кандидаты
            </Text>
          </Flex>
        </Card>

      </SimpleGrid>

        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Кандидаты
            </Text>
          </CardHeader>
          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px" color="gray.400" >
                  <Th pl="0px" borderColor={borderColor} color="gray.400" >
                    Author
                  </Th>
                  <Th borderColor={borderColor} color="gray.400" >Function</Th>
                  <Th borderColor={borderColor} color="gray.400" >Status</Th>
                  <Th borderColor={borderColor} color="gray.400" >Employed</Th>
                  <Th borderColor={borderColor}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {tablesTableData.map((row, index, arr) => {
                  return (
                      <TablesTableRow
                          name={row.name}
                          logo={row.logo}
                          email={row.email}
                          subdomain={row.subdomain}
                          domain={row.domain}
                          status={row.status}
                          date={row.date}
                          isLast={index === arr.length - 1 ? true : false}
                          key={index}
                      />
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>


    </Flex>
  );
}
