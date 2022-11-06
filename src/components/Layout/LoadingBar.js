import {
    Grid,
    GridItem,
    Spinner,
} from "@chakra-ui/react";

const LoadingBar = () => {

    return(

    <Grid templateColumns='repeat(10, 1fr)' gap={6}>
        <GridItem colStart={20} mt={10} mb={10}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </GridItem>
    </Grid>
    )

}

export default LoadingBar
