import "./home.scss"
import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import List from "../../components/list/List"
import { useState,useEffect } from "react"
import axios from "axios"
const Home = ({type}) => {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)
    useEffect(() => {
    const getRandomLists=async ()=>{
        try {
            const response=await axios.get(`lists${type ?'?type='+type:""} & ${genre ? 'genre='+genre:""}`);
            console.log(response);
            //setLists(response.data)
        } catch (err) {
            console.log(err);
        }
        getRandomLists()
    }
       
    }, [type,genre])
    return (
        <div className="home"> 
           <Navbar/>
          <Featured type={type} setGenre={setGenre}/>
          {lists.map(list=>(
              <List key={list.id} list={list}/>
          ))}
          <List/>
         
        </div>
    )
}

export default Home
