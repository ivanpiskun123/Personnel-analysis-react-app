import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
    useDisclosure,
    ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import CandidateModal from '../../components/Card/CandidateModal'
import no_avatar from "../../assets/img/avatars/no_avatar.png";

function TablesTableRow(props) {
  const { currentCandidate,
      isLast, candidates, setCandidates } = props;

  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const statusNamed = (status)=>
  {
      switch(status) {
      case 0:
          return {statusName: "Отклонен", statusBg: bgStatus}
          break;
      case 1:
          return  {statusName: "Рассматривается", statusBg: "navy.400"}
          break;
      default:
          return {statusName: "Принят", statusBg: "green.400"}
  }
  }

    const OverlayOne = () => (
        <ModalOverlay
            backdropFilter='blur(10px)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

  return (
    <Tr>

      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : null}
      >
          <Button
              onClick={() => {
                  setOverlay(<OverlayOne />)
                  onOpen()
              }}
              bg='transparent'
              border='1px solid lightgray'
              borderRadius='15px'
              height="100%"
              width="100%"
          >
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">

          <Avatar src={
              currentCandidate.attributes.avatar === "" ||  currentCandidate.attributes.avatar === null ?
                  no_avatar
                  :
                  `http://localhost:3003${currentCandidate.attributes.avatar}`
            }
                  w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
            >
                {`${currentCandidate.attributes.first_name} ${currentCandidate.attributes.second_name}`}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {currentCandidate.attributes.email}
            </Text>
          </Flex>
          </Flex>
          </Button>
      </Td>

    <CandidateModal isOpen={isOpen} onClose={onClose} overlay={overlay}
                    candidate={currentCandidate} candidates={candidates}
                    setCandidates={setCandidates} />

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
              {currentCandidate.relationships.vacancy.meta.position_name} - {currentCandidate.relationships.vacancy.data.id}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {currentCandidate.relationships.vacancy.meta.opening_date}
          </Text>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          bg={statusNamed(currentCandidate.attributes.status).statusBg}
          color="white"
          fontSize="14px"
          p="3px 10px"
          borderRadius="8px"
        >
          {statusNamed(currentCandidate.attributes.status).statusName}
        </Badge>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {currentCandidate.meta.score_sum} / {currentCandidate.meta.score_max_sum}
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Button p="0px" bg="transparent" variant="no-effects">
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
              {currentCandidate.attributes.created_at}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
