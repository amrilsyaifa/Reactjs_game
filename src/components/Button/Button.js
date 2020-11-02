import "./Button.css";

export default function Button({title, onClick, color}) {
    if(color) {
        return (
            <div>
                <button className="button outline green" onClick={onClick}>{title}</button>
            </div>
        )
    } else {
        return (
            <div>
                <button className="button outline" onClick={onClick}>{title}</button>
            </div>
        )
    }
    
}
