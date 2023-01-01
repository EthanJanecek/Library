import { useState } from 'react';
import { addBook, updateBook } from '../../hooks/controller';
import { Stages, useSession } from '../../hooks/useSession';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { bookOptions } from '../../hooks/constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function AddBook(props: any) {
    const [state, dispatch] = useSession();
    const {user, stage} = state;
    const {setStage} = dispatch;

    const [err, setErr] = useState("");
    const [data, setData] = useState(
        {
            bookID: stage === Stages.UPDATING ? props.book.BOOK_ID : 0,
            title: stage === Stages.UPDATING ? props.book.TITLE : "",
            author: stage === Stages.UPDATING ? props.book.AUTHOR : "",
            type: stage === Stages.UPDATING ? props.book.TYPE : bookOptions.type[0],
            barcode: stage === Stages.UPDATING ? props.book.BARCODE : 0,
            year: stage === Stages.UPDATING ? props.book.YEAR : 0,
            signed: stage === Stages.UPDATING ? props.book.SIGNED : false,
            read: stage === Stages.UPDATING ? props.book.READ : false,
            series: stage === Stages.UPDATING ? props.book.SERIES : "",
            seriesNumber: stage === Stages.UPDATING ? props.book.SERIES_NUMBER : 0
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = user ? user.EMAIL : "";

        if(stage === Stages.ADDING) {
            addBook(email, data, (success: Boolean, response: any) => {
                if(success) {
                    props.refresh();
                    setStage(Stages.VIEWING);
                } else {
                    setErr(response);
                }
            });
        } else if(stage === Stages.UPDATING) {
            updateBook(email, data, (success: Boolean, response: any) => {
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
                    <Form.Label>Title*</Form.Label>
                    <Form.Control type="text" required value={data.title} onChange={(event) => {setData({...data, title: event.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author(s)*</Form.Label>
                    <Form.Control type="text" required value={data.author} onChange={(event) => {setData({...data, author: event.target.value})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Series</Form.Label>
                    <Form.Label>Series #</Form.Label>
                    <Form.Control type="text" value={data.series} onChange={(event) => {setData({...data, series: event.target.value})}} />
                    <Form.Control type="number" disabled={data.series === ""} required value={data.seriesNumber} onChange={(event) => {setData({...data, seriesNumber: checkNum(event.target.value)})}} />
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
                    <Form.Check type="checkbox" label="Read?" checked={data.read} onChange={() => {setData({...data, read: !data.read})}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Signed?" checked={data.signed} onChange={() => {setData({...data, signed: !data.signed})}}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}