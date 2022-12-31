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


const handleSubmit = async (e, id) => {
    let type = "Resolved"
    e.preventDefault()
    const user = { "ProblemID": id, "NewStatus": type }

    const response = await fetch('/api/problems/updateProblemStatus', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    console.log(json);
    location.reload()
}

const handleSubmit2 = async (e, id) => {
    let type = "Pending"
    console.log(id + " HIII  " + type)
    e.preventDefault()
    const user = { "ProblemID": id, "NewStatus": type }

    const response = await fetch('/api/problems/updateProblemStatus', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()
    location.reload()
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

function Buttons(isAdmin) {
    if (isAdmin) {
        return (
            <Modal.Footer>
                <ModalDismissButton>
                    <Button variant="success" onClick={(e) => { handleSubmit(e, problemID) }} >
                        Mark Resolved
                    </Button>
                </ModalDismissButton>
                <ModalDismissButton>
                    <Button variant="danger" onClick={(e) => { handleSubmit2(e, problemID) }}>
                        Mark Pending
                    </Button>
                </ModalDismissButton>
            </Modal.Footer>

        )
    }
    else {
        return (
            <>
            </>
        )
    }
}

function ModalContents({ isAdmin, title, problemID, children, ...props }) {
    return (
        <ModalContentsBase {...props}>
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                {Buttons(isAdmin)}
            </div>
        </ModalContentsBase>
    );
}

export { ProblemModal, ModalDismissButton, ModalOpenButton, ModalContents };
