import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Stages, useSession } from '../../hooks/useSession';

export function BookModal(props: any) {
    const [, dispatch] = useSession();
    const {setStage} = dispatch;

    const editBook = () => {
        setStage(Stages.UPDATING);
        props.closeModal();
    }

    return (
        <div className='d-flex justify-content-center'>
            <Modal show={true} onHide={props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.book.TITLE}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Author: {props.book.AUTHOR}</label>
                    <br />
                    <label>Series: {props.book.SERIES}</label>
                    <br />
                    <label>Type: {props.book.TYPE}</label>
                    <br />
                    <label>Barcode: {props.book.BARCODE}</label>
                    <br />
                    <label>Year: {props.book.YEAR}</label>
                    <br />
                    <label>Read: {'' + props.book.READ}</label>
                    <br />
                    <label>Signed: {'' + props.book.SIGNED}</label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={editBook}>
                        Edit
                    </Button>
                    <Button variant="secondary" onClick={props.closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}