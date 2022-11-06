import React from "react";
import {
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    Select
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";


export function FilterBar(props) {
    // Pass the computed styles into the `__css` prop
    const { filter, setFilter, ...rest } = props;
    // Chakra Color Mode
    const searchIconColor = useColorModeValue("gray.700", "gray.200");
    const inputBg = useColorModeValue("white", "navy.800");

    return (
        <InputGroup borderRadius='8px' w='200px' mt='1'  {...rest} >
            <Select borderRadius='8px' size='xs' variant='filled' value={filter}
                    onChange={e => setFilter(e.target.value)}>
                <option disabled value="" selected>Выберите фильтр</option>
                <option value='all'>Все</option>
                <option value='progress'>Только рассматриваемые</option>
                <option value='rejected'>Только отклоненные</option>
                <option value='applied'>Только принятые</option>
            </Select>
        </InputGroup>
    );
}
