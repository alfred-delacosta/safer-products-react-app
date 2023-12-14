const RecallList = (props) => {
    return (
        <div>
            {props.selectedData.length > 0 &&
                props.selectedData.map((data) => {
                return (
                    <div key={data.RecallID}>
                        <h2>{data.Title}</h2>
                        {data.Images.length > 0 && (
                            <img src={data.Images[0].URL} alt={data.Images[0].Caption} />
                        )}
                        <h3>Recall Number: {data.RecallNumber}</h3>
                        <h3>Recall Date: {new Date(data.RecallDate).toLocaleDateString()}</h3>
                        {data.hasOwnProperty("Injuries") && data.Injuries.length > 0 && data.Injuries[0].hasOwnProperty("Name") && <h4>Injuries: {data.Injuries[0].Name}</h4>}
                        <p>{data.Description}</p>
                        <a href={data.URL}>{data.URL}</a>
                        <hr />
                    </div>
                );
            })}
        </div>
    )
};

export default RecallList;