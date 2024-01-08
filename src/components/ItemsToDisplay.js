import { useEffect } from "react"

const ItemsToDisplay = (props) => {

    function BuildOptions() {
        let numberOfItems = props.length;
    }

    function CalculateItems() {
        let numberOfItems = props.length;

    }

    useEffect(() => {
        CalculateItems()
    })


    return (
        <select name="itemsToDisplay" id="itemsToDisplay" onChange={props.onChange}>
            <option value="-1">All</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
    )
}

export { ItemsToDisplay }