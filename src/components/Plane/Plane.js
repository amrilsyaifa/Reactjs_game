import "./Plane.css";
import logo from '../../assets/images/plane.png';

export default function Plane(props) {
    const style = {
        left: `${props.data[0]}%`,
        top: `${props.data[1]}%`
      }
    return <img className="image-plane" src={logo} alt="plane" style={style}/>
}
