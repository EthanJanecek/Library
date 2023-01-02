import { useState } from 'react';
import { addMovie, addMusic, updateMovie, updateMusic } from '../../hooks/controller';
import { Stages, useSession } from '../../hooks/useSession';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { moviesTvOptions, musicOptions } from '../../hooks/constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function AddMovie(props: any) {
    const [state, dispatch] = useSession();
    const {user, stage} = state;
    const {setStage} = dispatch;

    const [err, setErr] = useState("");
    const [data, setData] = useState(
        {
            movieID: stage === Stages.UPDATING ? props.movie.MOVIE_TV_ID : 0,
            name: stage === Stages.UPDATING ? props.movie.NAME : "",
            category: stage === Stages.UPDATING ? props.movie.CATEGORY : moviesTvOptions.category[0],
            type: stage === Stages.UPDATING ? props.movie.TYPE : moviesTvOptions.type[0],
            season: stage === Stages.UPDATING ? props.movie.SEASON : 0,
            barcode: stage === Stages.UPDATING ? props.movie.BARCODE : 0
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = user ? user.EMAIL : "";

        if(stage === Stages.ADDING) {
            addMovie(email, data, (success: Boolean, response: any) => {
                if(success) {
                    props.refresh();
                    setStage(Stages.VIEWING);
                } else {
                    setErr(response);
                }
            });
        } else if(stage === Stages.UPDATING) {
            updateMovie(email, data, (success: Boolean, response: any) => {
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
                    <Form.Label>Type</Form.Label>
                    <Dropdown options={moviesTvOptions.type} value={data.type} onChange={(event) => {setData({...data, type: event.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Dropdown options={moviesTvOptions.category} value={data.category} onChange={(event) => {setData({...data, category: event.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Season #</Form.Label>
                    <Form.Control type="number" disabled={data.category === "Movie"} required value={data.season} onChange={(event) => {setData({...data, season: checkNum(event.target.value)})}} />
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