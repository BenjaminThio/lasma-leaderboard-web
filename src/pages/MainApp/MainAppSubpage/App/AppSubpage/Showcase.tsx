import React, { useEffect } from "react"
import "./App.css";
import Button from 'react-bootstrap/Button';
import { axios } from "../../../../../global-imports";

function Showcase() {
    const [showcaseRows, setShowcaseRows] = React.useState<any>([]);
    function updateShowcase(category:string) {
        axios.get(
            "/api/app/all", 
            {
                headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then (
            (data:any) => {
                let Filter = [];
                for (var a in data.data)
                {
                    if (category === "All Categories")
                    {
                        Filter = data.data
                    }
                    else if (data.data[a].info.category === category)
                    {
                        Filter.push(data.data[a]);
                    }
                    console.log(Filter);
                }
                let newShowcaseRows = [];
                if (Object.keys(Filter).length !== 0) {
                    for (var i in Filter)
                    {
                        newShowcaseRows.push(
                            <a className="Apps-Grid-Item" href="/app/dashboard">
                                <img src={Filter[i].info.imageB64} alt="Galaxy" className="Apps-IMG"></img>
                                <div>
                                    {Filter[i].info.name}
                                </div>
                            </a>
                        );  
                    }
                } else {
                    newShowcaseRows.push(
                        <div style={{color: "white", fontSize: "35px", fontWeight: "500", textAlign: "center", paddingTop: "10%"}}>
                            There is no app for the showcase
                        </div>
                    );
                }
                setShowcaseRows(newShowcaseRows);
            }                    
        )
    }
    useEffect(
        () => {
            updateShowcase("All Categories");
        }, []
    )
    return (
        <div className="Height">
            <div className="Apps-Background">
                <div className="Apps-Container">
                    <div className="Apps-Grid-Container">
                        <select className="Apps-Input" onChange={e => updateShowcase(e.target.value)}/*multiple*/>
                            <option>All Categories</option>
                            <option>Educational</option>
                            <option>Lifestyle</option>
                            <option>Social media</option>
                            <option>Productivity</option>
                            <option>Entertainment</option>
                            <option>Game</option>
                            <option>Other</option>
                        </select>
                        <Button variant="primary" href="create" style={{margin: "10px"}}>
                            Create App
                        </Button>
                    </div>
                    <div className="Apps-Grid-Container">
                        {showcaseRows}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Showcase

/*
<select className="Apps-Input">
                            <option>Sort by most player</option>
                            <option>Sort by fewest player</option>
                            <option>Sort by latest added</option>
                            <option>Sort by earliest added</option>
                        </select>
*/