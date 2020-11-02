import "./AppBar.css";
import Battery from "../Battery/Battery";
import Button from '../Button/Button'
import Slider from "../Slider/Slider";
import StarCount from "../StartCount/StarCount";

export default function AppBar({onChangeSlider, volume, bar, onPause, onRestart, star, isPause}) {
    let tempBar = []
    for(var i = 0; i < bar; i++){
        tempBar.push(i)
    }
    return (
        <div className="app-bar">
            <div className="vertical-center">
                <Slider onChange={onChangeSlider} value={volume}/>
                <Button title={isPause ? "Resume" : "Pause"} onClick={onPause}/>
                <Button title="Restart" onClick={onRestart}/>
                <StarCount star={star}/>
                <Battery bar={tempBar} />  
            </div>
        </div>
    )
}
