import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState ,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function ListItem({ item,index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({})
  useEffect(() => {
    const getMovie=async ()=>{
      try {
        const res=await axios.get("/movies/find/"+item)  
        setMovie(res.data) 
      } catch (err) {
        console.log(err)
      }
      getMovie()
    }
  }, [item])
  return (
    <Link to={{pathname:"/watch", movie:movie}}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.src}
        alt=""
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>movie.duration</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
             {movie.description}
            </div>
            <div className="genre">movie.genre</div>
          </div>
        </>
      )}
    </div>
      </Link>
  );
}