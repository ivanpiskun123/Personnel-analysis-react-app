import React from "react";
import {
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    Select
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";


export function SortBarVacancies(props) {
    // Pass the computed styles into the `__css` prop
    const { sort, setSort, ...rest } = props;
    // Chakra Color Mode
    const searchIconColor = useColorModeValue("gray.700", "gray.200");
    const inputBg = useColorModeValue("white", "navy.800");

    return (
        <InputGroup borderRadius='8px' w='200px' mt='1'  {...rest} >
            <Select borderRadius='8px' size='xs' variant='filled' value={sort}
                    onChange={e => setSort(e.target.value)}>
                <option disabled value="" selected>Выберите сортировку</option>
                <option value='opening_date'>По дате создания</option>
                <option value='status'>По статусу</option>
                <option value='status_rev'>По статусу убыв.</option>
                <option value='position_name'>По должности</option>
                <option value='position_name_rev'>По должности убыв.</option>
            </Select>
        </InputGroup>
    );
}
