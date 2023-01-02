import { useState } from 'react';
import { addMusic, updateMusic } from '../../hooks/controller';
import { Stages, useSession } from '../../hooks/useSession';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { musicOptions } from '../../hooks/constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function AddMusic(props: any) {
    const [state, dispatch] = useSession();
    const {user, stage} = state;
    const {setStage} = dispatch;

    const [err, setErr] = useState("");
    const [data, setData] = useState(
        {
            musicID: stage === Stages.UPDATING ? props.music.MUSIC_ID : 0,
            name: stage === Stages.UPDATING ? props.music.NAME : "",
            artist: stage === Stages.UPDATING ? props.music.ARTIST : "",
            type: stage === Stages.UPDATING ? props.music.TYPE : musicOptions.type[0],
            barcode: stage === Stages.UPDATING ? props.music.BARCODE : 0,
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = user ? user.EMAIL : "";

        if(stage === Stages.ADDING) {
            addMusic(email, data, (success: Boolean, response: any) => {
                if(success) {
                    props.refresh();
                    setStage(Stages.VIEWING);
                } else {
                    setErr(response);
                }
            });
        } else if(stage === Stages.UPDATING) {
            updateMusic(email, data, (success: Boolean, response: any) => {
                if(success) {
                    props.refresh();
                    setStage(Stages.VIEWING);
                } else {
                    setErr(response);
                }
            });
        }
    }

    const checkNum = (num: string) => {
        if(isNaN(parseInt(num))) {
            return 0;
        } else {
            return parseInt(num);
        }
    }

    return (
        <div className='d-flex justify-content-center'>
            {err &&
                <label>{err}</label>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control type="text" required value={data.name} onChange={(event) => {setData({...data, name: event.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Artist*</Form.Label>
                    <Form.Control type="text" required value={data.artist} onChange={(event) => {setData({...data, artist: event.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Dropdown options={musicOptions.type} value={data.type} onChange={(event) => {setData({...data, type: event.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Barcode</Form.Label>
                    <Form.Control type="number" required value={data.barcode} onChange={(event) => {setData({...data, barcode: checkNum(event.target.value)})}} />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}