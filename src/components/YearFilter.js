function YearFilter(props) {

    return (
        <select name="yearSelect" id="yearSelect" onChange={props.onChange} value={props.value}>
            {props.years.map(year => {
                return <option key={year} value={year}>{year}</option>
            })}
        </select>
    )
}

export default YearFilter;