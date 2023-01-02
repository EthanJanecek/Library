import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Stages, useSession } from '../../hooks/useSession';

export function MovieModal(props: any) {
    const [, dispatch] = useSession();
    const {setStage} = dispatch;

    const editGame = () => {
        setStage(Stages.UPDATING);
        props.closeModal();
    }

    return (
        <div className='d-flex justify-content-center'>
            <Modal show={true} onHide={props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.movie.NAME}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Category: {props.movie.CATEGORY}</label>
                    <br />
                    <label>Type: {props.movie.TYPE}</label>
                    <br />
                    {
                        props.movie.CATEGORY === "TV Show" &&
                        <div>
                            <label>Season #: {props.movie.SEASON}</label>
                            <br />
                        </div>
                    }
                    <label>Barcode: {props.movie.BARCODE}</label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={editGame}>
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