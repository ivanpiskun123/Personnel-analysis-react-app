import {useMemo} from "react";

export const useSortedVacancies = (units, sort) => {
    const sortedUnits = useMemo(() => {
        if(sort) {
            if(!sort.localeCompare("status"))
            {
                return [...units].sort(function(x, y) {
                    return (x.attributes.status === y.attributes.status)? 0 : x.attributes.status? -1 : 1;
                });
            }
            else if(!sort.localeCompare("status_rev"))
            {
                return [...units].sort(function(x, y) {
                    return (x.attributes.status === y.attributes.status)? 0 : x.attributes.status? 1 : -1;
                });
            }
            else if(!sort.localeCompare("opening_date"))
            {
                let unitsTemp = [...units]
                unitsTemp.forEach(function(item,i){
                    if(!item.attributes.opening_date){
                        let e = unitsTemp.splice(i, 1);
                        unitsTemp.unshift(e[0]);
                    }
                });
                return unitsTemp;
            }
            else if(!sort.localeCompare("position_name"))
            {
                return [...units].sort((a, b) => a.relationships.position.meta.name.localeCompare(b.relationships.position.meta.name.localeCompare)).reverse()
            }
            else return [...units].sort((a, b) => a.relationships.position.meta.name.localeCompare(b.relationships.position.meta.name.localeCompare))
        }
        return units;
    }, [sort, units])

    return sortedUnits;
}

export const useFilteredVacancies = (units, sort, filter)=>{
    const sortedUnits = useSortedVacancies(units, sort);

    const sortedAndFilteredUnits = useMemo(() => {
        if(filter) {
            if(!filter.localeCompare("all")){
                return sortedUnits
            }
            else if(!filter.localeCompare("closed")){
                return sortedUnits.filter((obj) => obj.attributes.status)
            }
            else if(!filter.localeCompare("opened")){
                return sortedUnits.filter((obj) => ! obj.attributes.status )
            }
        }
        return sortedUnits;

    }, [filter, sortedUnits])

    return sortedAndFilteredUnits;
}


export const useVacancies = (units, sort, query,filter) => {
    const sortedAndFilteredUnits = useFilteredVacancies(units, sort,filter);

    const resultUnits = useMemo(() => {
        let q = query.toLowerCase()
        return sortedAndFilteredUnits.filter(unit =>
            unit.relationships.position.meta.name.toLowerCase().includes(q)
        )
    }, [query, sortedAndFilteredUnits])

    return resultUnits;
}
