import { useEffect, useState } from "react";
import YearFilter from "./components/YearFilter";
import RecallList from "./components/RecallList";

function App() {
  const [apiData, setApiData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [currentYear, setCurrentYear] = useState(0);

  function filterDataByYear(e) {
    setCurrentYear(e.target.value);
    const results = apiData.filter(entry => new Date(entry.RecallDate).getFullYear() == e.target.value);
    setSelectedData(results);
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

      <YearFilter years={years} onChange={filterDataByYear} value={currentYear !== 0 ? currentYear : 0}/>
      <h1>Total Number of Recalls: {apiData.length}</h1>
      <h1>Number of Recalls for the selected year: {selectedData.length}</h1>
      <RecallList selectedData={selectedData} />
    </div>
  );
}

export default App;
