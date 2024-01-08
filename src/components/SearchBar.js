const SearchBar = (props) => {
    return (
        <input type="text" name="searchBar" id="searchBar" onChange={props.onChange} ref={props.elementRef} />
    )
}

export { SearchBar };