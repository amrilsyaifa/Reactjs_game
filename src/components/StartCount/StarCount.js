import logo from '../../assets/images/star.png';
import "./StarCount.css";

export default function StarCount({star}) {
    return (
        <div className="container-star-count">
            <img className="image-star-count" src={logo} alt="star" />
            <h4 className="title-count">
             : {star}
            </h4>
        </div>
    )
}
