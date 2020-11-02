import "./Battery.css";

export default function Battery({bar}) {
    
    return (
        <div className={`battery-outline ${(bar.length < 6 && bar.length > 3) ? "battery-level-warning" : (bar.length < 4 && bar.length > 0) ? "battery-level-low" : "battery-level-high"}`}>
            {bar.map((i) =>  <div key ={i} className="battery-bar" />)}
        </div>
    )
}
