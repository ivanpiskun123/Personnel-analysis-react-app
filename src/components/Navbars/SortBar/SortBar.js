import React from "react";
import {
    Input,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    Select
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";


export function SortBar(props) {
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
                <option value='created_at'>По дате создания</option>
                <option value='score_sum'>По кол-ву баллов убыв.</option>
                <option value='score_sum_rev'>По кол-ву баллов возр.</option>
                <option value='second_name'>По фамилии убыв.</option>
                <option value='second_name_rev'>По фамилии возр.</option>
            </Select>
        </InputGroup>
    );
}
