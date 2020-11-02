import "./Star.css";
import logo from '../../assets/images/star.png';

export default function Star(props) {
    const style = {
        left: `${props.data[0]}%`,
        top: `${props.data[1]}%`
    }
    return <img className="image-star" src={logo} alt="star" style={style}/>
}
