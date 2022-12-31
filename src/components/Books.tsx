import { useState, useEffect } from 'react';
import { Stages, useSession } from '../hooks/useSession';
import { AddBook } from './sub_components/AddBook';
import { BarcodeReader } from './sub_components/BarcodeReader';
import { Book } from '../hooks/constants';
import { getBooks } from '../hooks/controller';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { BookModal } from './sub_components/BookModal';

export function Books(props: any) {
    const [state, dispatch] = useSession();
    const {stage, user} = state;
    const {setStage} = dispatch;

    const [allBooks, setAllBooks] = useState([] as Book[]);
    const [books, setBooks] = useState([] as Book[]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState({} as Book);
    const [page, setPage] = useState(1);

    useEffect(() => {
        refreshList();
    }, [user]);

    const selectBook = (book: Book) => {
        setSelectedBook(book);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const changePage = (delta: number) => {
        const newPage = page + delta;
        setPage(newPage);

        setBooks(allBooks.sort((a: Book, b: Book) => {
            return a.TITLE.localeCompare(b.TITLE);
        }).slice((newPage * 10) - 10, (newPage * 10)));
    }
    
    const refreshList = () => {
        const email = user ? user.EMAIL : "";

        getBooks(email, (data: Book[]) => {
            setAllBooks(data);
            setBooks(data.sort((a: Book, b: Book) => {
                return a.TITLE.localeCompare(b.TITLE);
            }).slice(0, 10));
        }, (err: any) => {
            console.log(err);
        })
    }

    return (
        <div className="container-fluid d-grid">
            {
                stage === Stages.VIEWING &&
                <div>
                    <div className='d-flex justify-content-center mb-2'>
                        <Button className="btn btn-primary me-4" onClick={() => setStage(Stages.SCANNING)} disabled>
                            Add Book from Barcode
                        </Button>
                        <Button className="btn btn-primary" onClick={() => setStage(Stages.ADDING)}>
                            Add Book Manually
                        </Button>
                    </div>
                    <div className='d-flex justify-content-center mb-2'>
                        <Button onClick={() => changePage(-1)} disabled={page === 1} className="me-4">Previous</Button>
                        <Button onClick={() => changePage(1)} disabled={(page * 10) > allBooks.length}>Next</Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <ListGroup className='d-flex text-center'>
                            {books.map((book: Book) => {
                                    return <ListGroup.Item onClick={() => selectBook(book)}>
                                        <div>
                                            <div className="fw-bold">
                                                {book.TITLE}
                                            </div>
                                            <div>
                                                {book.AUTHOR}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                    {
                        showModal && selectedBook &&
                        <BookModal book={selectedBook} closeModal={closeModal} />
                    }
                </div>
            }
            {
                stage === Stages.SCANNING && false &&
                <BarcodeReader />
            }
            {
                stage === Stages.ADDING &&
                <AddBook refresh={refreshList}/>
            }
        </div>
    );
}
