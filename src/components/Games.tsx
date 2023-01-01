import { useState, useEffect } from 'react';
import { Stages, useSession } from '../hooks/useSession';
import { AddGame } from './sub_components/AddGame';
import { Game } from '../hooks/constants';
import { getGames } from '../hooks/controller';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GameModal } from './sub_components/GameModal';

export function Games(props: any) {
    const [state, dispatch] = useSession();
    const {stage, user} = state;
    const {setStage} = dispatch;

    const [allGames, setAllGames] = useState([] as Game[]);
    const [games, setGames] = useState([] as Game[]);
    const [showModal, setShowModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState({} as Game);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const email = user ? user.EMAIL : "";

    const refreshList = () => {
        if(page > 1) {
            changePage(-(page - 1));
        }

        getGames(email, (data: Game[]) => {
            setAllGames(data);
            setGames(data.sort((a: Game, b: Game) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        }, (err: any) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getGames(email, (data: Game[]) => {
            setAllGames(data);
            setGames(data.sort((a: Game, b: Game) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        }, (err: any) => {
            console.log(err);
        })
    }, [email]);

    const selectGame = (game: Game) => {
        setSelectedGame(game);
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

            setGames(allGames.filter((game) => {
                return game.NAME.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(strippedSearch);
            }).sort((a: Game, b: Game) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        } else {
            setGames(allGames.sort((a: Game, b: Game) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice((newPage * 10) - 10, (newPage * 10)));
        }
    }

    const newSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchText = e.target.value;
        setSearchText(newSearchText);
        setPage(1);

        if(searchText.length >= 3) {
            const strippedSearch = searchText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

            setGames(allGames.filter((game) => {
                return game.NAME.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(strippedSearch);
            }).sort((a: Game, b: Game) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        } else {
            setGames(allGames.sort((a: Game, b: Game) => {
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
                            Add Game
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
                        <Button onClick={() => changePage(1)} disabled={(page * 10) >= games.length}>Next</Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <ListGroup className='d-flex text-center'>
                            {games.map((game: Game) => {
                                    return <ListGroup.Item onClick={() => selectGame(game)}>
                                        <div>
                                            <div className="fw-bold">
                                                {game.NAME}
                                            </div>
                                            <div>
                                                {game.CONSOLE}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                    {
                        showModal && selectedGame &&
                        <GameModal game={selectedGame} closeModal={closeModal} />
                    }
                </div>
            }
            {
                (stage === Stages.ADDING || stage === Stages.UPDATING) &&
                <AddGame refresh={refreshList} game={selectedGame}/>
            }
        </div>
    );
}
