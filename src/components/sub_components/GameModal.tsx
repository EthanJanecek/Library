import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Stages, useSession } from '../../hooks/useSession';

export function GameModal(props: any) {
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
                    <Modal.Title>{props.game.NAME}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Console Brand: {props.game.CONSOLE_BRAND}</label>
                    <br />
                    <label>Console: {props.game.CONSOLE}</label>
                    <br />
                    <label>Type: {props.game.TYPE}</label>
                    <br />
                    <label>Barcode: {props.game.BARCODE}</label>
                    <br />
                    <label>Played: {'' + props.game.PLAYED}</label>
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