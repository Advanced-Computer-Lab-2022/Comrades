import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import React, {
    useState,
    useContext,
    cloneElement,
    createContext
} from "react";


const callAll = (...fns) => (...args) => fns.forEach((fn) => fn && fn(...args));

let id = ""

const handleSubmit = async (e) => {
    let type = "Resolved"
    e.preventDefault()
    const user = { "ProblemID": id, "NewStatus": type}

    const response = await fetch('/api/problems/updateProblemStatus', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    console.log(json);
}

const handleSubmit2 = async (e) => {
    let type = "Pending"
    console.log(id + " HIII  "  + type)
    e.preventDefault()
    const user = { "ProblemID": id, "NewStatus": type}

    const response = await fetch('/api/problems/updateProblemStatus', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
}

const ModalContext = createContext();

function ProblemModal(props) {
    const [isOpen, setIsOpen] = useState(false);
    return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
    const [, setIsOpen] = useContext(ModalContext);

    return cloneElement(child, {
        onClick: callAll(() => setIsOpen(false), child.props.onClick)
    });
}

function ModalOpenButton({ children: child }) {
    const [, setIsOpen] = useContext(ModalContext);

    return cloneElement(child, {
        onClick: callAll(() => setIsOpen(true), child.props.onClick)
    });
}

function ModalContentsBase(props) {
    const [isOpen, setIsOpen] = useContext(ModalContext);
    return (
        <Modal show={isOpen} onHide={() => setIsOpen(false)} {...props}>
            {props.children}
        </Modal >
    );
}

function ModalContents({ title, problemID, children, ...props }) {
    id = problemID;
    return (
        <ModalContentsBase {...props}>
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <ModalDismissButton>
                        <Button variant="success" onClick={handleSubmit} >
                            Mark Resolved
                        </Button>
                    </ModalDismissButton>
                    <ModalDismissButton>
                        <Button variant="danger" onClick={handleSubmit2}>
                            Mark Pending
                        </Button>
                    </ModalDismissButton>
                </Modal.Footer>
            </div>
        </ModalContentsBase>
    );
}

export { ProblemModal, ModalDismissButton, ModalOpenButton, ModalContents };
