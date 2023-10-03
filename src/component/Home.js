import React,{useState} from "react";

import Navbar from "./Navbar";


import {store_history} from "../redux/actions/store_historyAction";
import {useSelector,useDispatch} from "react-redux";


const Home=()=>{



    const dispatch=useDispatch();
    const x=useSelector((state)=>state);


    const[flag,setFlag]=useState(false)
    const [resultData,setResultData]=useState([]);
    const[searchterm,setSearchterm]=useState("");

    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${searchterm}`;

    function searchData(e){
        setSearchterm(e.target.value);
        setResultData([])
    }

    function displayOutput(){
        dispatch(store_history(searchterm));
        setSearchterm("");

        fetch(url)
         .then((response)=>response.json())
         .then((res)=>{
            setResultData([...resultData,res]);

        })
        .catch((error)=>console.log(error));
    }



   return(
    <>
    <div className="home">
        <input value={searchterm}
        onChange={(e)=>searchData(e)}
        placeholder="Search word"/>


        <button onClick={displayOutput} id="searchBtn">
            Search
        </button>
    </div>

    <div className="displayResult">
        {
            resultData.map((data1)=>
            data1.map((data2)=>(
                <div>
                    <h1>{data2.word}</h1>
                    <h3>{data2.phonetic}</h3>
                    {data2.phonetics.map((data3=>(
                        <audio controls autoplay>
                            <source src={data3.audio} type="audio/ogg"/>
                            <source src={data3.audio} type="audio/mpeg"/>
                             Not supporting audio
                             </audio>
                    )))}

                    {data2.meanings.map(data4=>(
                        <div>
                            <h3>partOfSpeech:{
                            data4.partOfSpeech}
                            </h3>
                            {data4.definitions.map((data5=>(
                                <p>{data5.definition}</p>
                            )))}
                            </div>
                    ))}
                    </div>
            )))
        }

    </div>
    <div>

    </div>
    </>
   );

};

export default Home;