import { useEffect, useState, useRef } from "react";
import YearFilter from "./components/YearFilter";
import RecallList from "./components/RecallList";
import { SearchBar } from "./components/SearchBar";
import { ItemsToDisplay } from "./components/ItemsToDisplay";

function App() {
  // State
  const [apiData, setApiData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [currentYear, setCurrentYear] = useState(0);
  const [numberOfItemsDisplayed, setNumberOfItemsDisplay] = useState(0);

  // Ref
  const searchInputRef = useRef(null);

  function filterDataByYear(e) {
    setCurrentYear(e.target.value);
    const results = apiData.filter(entry => new Date(entry.RecallDate).getFullYear() == e.target.value);
    setSelectedData(results);
    searchInputRef.current.value ="";
  }

  function extractYears(data) {
    let years = [];
    data.forEach((entry) => {
      let year = new Date(entry.RecallDate).getFullYear();
      if (years.includes(year) === false) {
        years.push(year);
      }
    });

    return years;
  }

  function searchData(e) {
    if (e.target.value.length > 0) {
      setSelectedData(apiData.filter(entry => new Date(entry.RecallDate).getFullYear() === Number(currentYear) && entry.Description.toLowerCase().includes(e.target.value.toLowerCase())))
    } else {
      setSelectedData(apiData.filter(entry => new Date(entry.RecallDate).getFullYear() === Number(currentYear)))
    }
  }

  function showAmountOfSelectedItems(e) {
    let numberOfItems = e.target.value;
    if (numberOfItems > -1) {
      setSelectedData((data) => data.slice(0, numberOfItems));
    } else {
      setSelectedData(apiData.filter(entry => new Date(entry.RecallDate).getFullYear() == currentYear))
    }
}

  function fetchData() {
    fetch("http://www.saferproducts.gov/RestWebServices/Recall?format=json")
      .then((res) => res.json())
      .then((data) => {
        let year = new Date(data[0].RecallDate).getFullYear();
        setApiData(data);
        setCurrentYear(year);
        setYears(extractYears(data));
        setSelectedData(data.filter(entry => new Date(entry.RecallDate).getFullYear() == year))
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      { apiData.length > 0 ? (
        <div>
          <YearFilter years={years} onChange={filterDataByYear} value={currentYear !== 0 ? currentYear : 0}/>
          <SearchBar onChange={searchData} elementRef={searchInputRef}/>
          <ItemsToDisplay selectedData={selectedData} onChange={showAmountOfSelectedItems}/>
          <h1>Total Number of Recalls: {apiData.length}</h1>
          <h1>Number of Recalls for the selected year and search: {selectedData.length}</h1>
          <RecallList selectedData={selectedData} />
        </div>
      ) : (
        <h4>Loading data...</h4>
      )}
    </div>
  );
}

export default App;
