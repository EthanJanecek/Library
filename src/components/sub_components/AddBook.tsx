import { useEffect, useState } from 'react';
import { addBook, barcodeLookup } from '../../hooks/controller';
import { Stages, useSession } from '../../hooks/useSession';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { bookOptions } from '../../hooks/constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function AddBook(props: any) {
    const [state, dispatch] = useSession();
    const {user} = state;
    const {setStage} = dispatch;

    const [err, setErr] = useState("");
    const [data, setData] = useState(
        {
            title: "",
            author: "",
            type: bookOptions.type[0],
            barcode: 0,
            year: 0,
            signed: false
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const email = user ? user.EMAIL : "";
        addBook(email, data, (success: Boolean, response: any) => {
            if(success) {
                setStage(Stages.VIEWING);
            } else {
                setErr(response);
            }
        })
    }

    const checkNum = (num: string) => {
        if(parseInt(num) === NaN) {
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
                    <Form.Label>Title*</Form.Label>
                    <Form.Control type="text" required value={data.title} onChange={(event) => {setData({...data, title: event.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author(s)*</Form.Label>
                    <Form.Control type="text" required value={data.author} onChange={(event) => {setData({...data, author: event.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Barcode</Form.Label>
                    <Form.Control type="number" required value={data.barcode} onChange={(event) => {setData({...data, barcode: checkNum(event.target.value)})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" required value={data.year} onChange={(event) => {setData({...data, year: checkNum(event.target.value)})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Dropdown options={bookOptions.type} value={data.type} onChange={(event) => {setData({...data, type: event.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Signed?" checked={data.signed} onChange={() => {setData({...data, signed: !data.signed})}}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}