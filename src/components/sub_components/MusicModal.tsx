import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Stages, useSession } from '../../hooks/useSession';

export function MusicModal(props: any) {
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
                    <Modal.Title>{props.music.NAME}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Artist: {props.music.ARTIST}</label>
                    <br />
                    <label>Type: {props.music.TYPE}</label>
                    <br />
                    <label>Barcode: {props.music.BARCODE}</label>
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