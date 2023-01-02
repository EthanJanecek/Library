import { useState, useEffect } from 'react';
import { Stages, useSession } from '../hooks/useSession';
import { Movie } from '../hooks/constants';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MovieModal } from './sub_components/MovieModal';
import { AddMovie } from './sub_components/AddMovie';
import { getMovies } from '../hooks/controller';

export function Movies(props: any) {
    const [state, dispatch] = useSession();
    const {stage, user} = state;
    const {setStage} = dispatch;

    const [allMovies, setAllMovies] = useState([] as Movie[]);
    const [movies, setMovies] = useState([] as Movie[]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({} as Movie);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const email = user ? user.EMAIL : "";

    const refreshList = () => {
        if(page > 1) {
            changePage(-(page - 1));
        }

        getMovies(email, (data: Movie[]) => {
            setAllMovies(data);
            setMovies(data.sort((a: Movie, b: Movie) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        }, (err: any) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getMovies(email, (data: Movie[]) => {
            setAllMovies(data);
            setMovies(data.sort((a: Movie, b: Movie) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        }, (err: any) => {
            console.log(err);
        })
    }, [email]);

    const selectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const changePage = (delta: number) => {
        const newPage = page + delta;
        setPage(newPage);

        if(searchText.length >= 3) {
            const strippedSearch = searchText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

            setMovies(allMovies.filter((movie) => {
                return movie.NAME.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(strippedSearch);
            }).sort((a: Movie, b: Movie) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice((newPage * 10) - 10, (newPage * 10)));
        } else {
            setMovies(allMovies.sort((a: Movie, b: Movie) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice((newPage * 10) - 10, (newPage * 10)));
        }
    }

    const newSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
        setPage(1);

        if(newSearchText.length >= 3) {
            const strippedSearch = newSearchText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

            setMovies(allMovies.filter((movie) => {
                return movie.NAME.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(strippedSearch);
            }).sort((a: Movie, b: Movie) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        } else {
            setMovies(allMovies.sort((a: Movie, b: Movie) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        }
    }

    return (
        <div className="container-fluid d-grid">
            {
                stage === Stages.VIEWING &&
                <div>
                    <div className='d-flex justify-content-center mb-2'>
                        <Button className="btn btn-primary" onClick={() => setStage(Stages.ADDING)}>
                            Add Movie/TV Show
                        </Button>
                    </div>
                    <div className='d-flex justify-content-center mb-2'>
                        <Form className="d-flex" onSubmit={(e) => {e.preventDefault()}}>
                            <Form.Group className="mb-3 d-flex">
                                <Form.Label className="me-2">Search:</Form.Label>
                                <Form.Control type="text" value={searchText} onChange={newSearch} />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='d-flex justify-content-center mb-2'>
                        <Button onClick={() => changePage(-1)} disabled={page === 1} className="me-4">Previous</Button>
                        <Button onClick={() => changePage(1)} disabled={(page * 10) >= movies.length}>Next</Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <ListGroup className='d-flex text-center'>
                            {movies.map((movie: Movie) => {
                                    return <ListGroup.Item onClick={() => selectMovie(movie)}>
                                        <div>
                                            <div className="fw-bold">
                                                {movie.NAME}
                                            </div>
                                            <div>
                                                {movie.CATEGORY + (movie.CATEGORY === "TV Show" ? ` - Season ${movie.SEASON}` : ``)}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                    {
                        showModal && selectedMovie &&
                        <MovieModal movie={selectedMovie} closeModal={closeModal} />
                    }
                </div>
            }
            {
                (stage === Stages.ADDING || stage === Stages.UPDATING) &&
                <AddMovie refresh={refreshList} movie={selectedMovie}/>
            }
        </div>
    );
}
