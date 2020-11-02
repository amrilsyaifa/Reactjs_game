import './Modal.css'

export default function Modal({children, show, onClose}) {
    return (
        <div className="modal" style={{display: show ? "block" : "none"}}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    )
}
