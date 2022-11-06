import {useMemo} from "react";

export const useSortedCandidates = (units, sort) => {
    const sortedUnits = useMemo(() => {
        if(sort) {
            if(!sort.localeCompare("score_sum"))
            {
                return [...units].sort((a, b) =>
                    a.meta.score_sum/a.meta.score_max_sum- b.meta.score_sum/b.meta.score_max_sum ).reverse()
            }
            else if(!sort.localeCompare("score_sum_rev"))
            {
                return [...units].sort((a, b) =>
                    a.meta.score_sum/a.meta.score_max_sum- b.meta.score_sum/b.meta.score_max_sum )
            }
            else if(!sort.localeCompare("created_at"))
            {
                let unitsTemp = [...units]
                unitsTemp.forEach(function(item,i){
                    if(!item.attributes.created_at){
                        let e = unitsTemp.splice(i, 1);
                        unitsTemp.unshift(e[0]);
                    }
                });
                return unitsTemp;
            }
            else if(!sort.localeCompare("second_name"))
            {
                return [...units].sort((a, b) => a.attributes.second_name.localeCompare(b.attributes.second_name)).reverse()
            }
            else return [...units].sort((a, b) => a.attributes.second_name.localeCompare(b.attributes.second_name))
        }
        return units;
    }, [sort, units])

    return sortedUnits;
}

export const useFilteredCandidates = (units, sort, filter)=>{
    const sortedUnits = useSortedCandidates(units, sort);

    const sortedAndFilteredUnits = useMemo(() => {
        if(filter) {
            if(!filter.localeCompare("all")){
                return sortedUnits
            }
            else if(!filter.localeCompare("progress")){
                return sortedUnits.filter((obj) => obj.attributes.status === 1 )
            }
            else if(!filter.localeCompare("rejected")){
                return sortedUnits.filter((obj) => obj.attributes.status === 0 )
            }
            else if(!filter.localeCompare("applied")){
                return sortedUnits.filter((obj) => obj.attributes.status === 2 )
            }
        }
        return sortedUnits;

    }, [filter, sortedUnits])

    return sortedAndFilteredUnits;
}


export const useCandidates = (units, sort, query,filter) => {
    const sortedAndFilteredUnits = useFilteredCandidates(units, sort,filter);

    const resultUnits = useMemo(() => {
        let q = query.toLowerCase()
        return sortedAndFilteredUnits.filter(unit =>
            unit.attributes.first_name.toLowerCase().includes(q)
        ||
            unit.attributes.second_name.toLowerCase().includes(q)
        ||
            unit.attributes.email.toLowerCase().includes(q)
        ||
            unit.relationships.vacancy.meta.position_name.toLowerCase().includes(q)
        )
    }, [query, sortedAndFilteredUnits])

    return resultUnits;
}
