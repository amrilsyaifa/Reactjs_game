import "./Bird.css";
import logo from '../../assets/images/bird.gif';

export default function Plane(props) {
    const style = {
        left: `${props.data[0]}%`,
        top: `${props.data[1]}%`
    }
    return <img className="image-bird" src={logo} alt="bird" style={style}/>
}
