import { useState, useEffect } from 'react';
import { Stages, useSession } from '../hooks/useSession';
import { AddBook } from './sub_components/AddBook';
import { BarcodeReader } from './sub_components/BarcodeReader';
import { Book } from '../hooks/constants';
import { getBooks } from '../hooks/controller';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

export function Books(props: any) {
    const [state, dispatch] = useSession();
    const {stage, user} = state;
    const {setStage} = dispatch;

    const [books, setBooks] = useState([] as Book[]);

    useEffect(() => {
        const email = user ? user.EMAIL : "";
        getBooks(email, (data: Book[]) => {
            setBooks(data);
        }, (err: any) => {
            console.log(err);
        })
    }, []);
    
    return (
        <div className="container-fluid d-grid">
            {
                stage === Stages.VIEWING &&
                <div>
                    <div className='d-flex justify-content-center mb-4'>
                        <Button className="btn btn-primary me-4" onClick={() => setStage(Stages.SCANNING)}>
                            Add Book from Barcode
                        </Button>
                        <Button className="btn btn-primary" onClick={() => setStage(Stages.ADDING)}>
                            Add Book Manually
                        </Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <ListGroup className='d-flex'>
                            {books.map((book: Book) => {
                                    return <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <div className="fw-bold">
                                                {book.TITLE}
                                            </div>
                                            {book.AUTHOR}
                                        </div>
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                </div>
            }
            {
                stage === Stages.SCANNING &&
                <BarcodeReader />
            }
            {
                stage === Stages.ADDING &&
                <AddBook />
            }
        </div>
    );
}
