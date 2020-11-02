import "./Parachute.css";
import logo from '../../assets/images/parachute.png';

export default function Parachute(props) {
    const style = {
        left: `${props.data[0]}%`,
        top: `${props.data[1]}%`
    }
    return <img className="image-parachute" src={logo} alt="parachute" style={style}/>
}
