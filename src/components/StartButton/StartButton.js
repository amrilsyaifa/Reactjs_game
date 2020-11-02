import "./StartButton.css";

export default function StartButton({onClick}) {
    return (
        <div className="centerize">
            <button onClick={onClick} className="learn-more">Start</button>
        </div>
    )
}
