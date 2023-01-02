import { useState, useEffect } from 'react';
import { Stages, useSession } from '../hooks/useSession';
import { Music } from '../hooks/constants';
import { getMusic } from '../hooks/controller';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MusicModal } from './sub_components/MusicModal';
import { AddMusic } from './sub_components/AddMusic';

export function Musics(props: any) {
    const [state, dispatch] = useSession();
    const {stage, user} = state;
    const {setStage} = dispatch;

    const [allMusic, setAllMusic] = useState([] as Music[]);
    const [music, setMusic] = useState([] as Music[]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMusic, setSelectedMusic] = useState({} as Music);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const email = user ? user.EMAIL : "";

    const refreshList = () => {
        if(page > 1) {
            changePage(-(page - 1));
        }

        getMusic(email, (data: Music[]) => {
            setAllMusic(data);
            setMusic(data.sort((a: Music, b: Music) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        }, (err: any) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getMusic(email, (data: Music[]) => {
            setAllMusic(data);
            setMusic(data.sort((a: Music, b: Music) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        }, (err: any) => {
            console.log(err);
        })
    }, [email]);

    const selectMusic = (newMusic: Music) => {
        setSelectedMusic(newMusic);
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

            setMusic(allMusic.filter((musicItem) => {
                const nameMatch = musicItem.NAME.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(strippedSearch);
                const artistMatch = musicItem.ARTIST.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(strippedSearch);
                return nameMatch || artistMatch;
            }).sort((a: Music, b: Music) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice((newPage * 10) - 10, (newPage * 10)));
        } else {
            setMusic(allMusic.sort((a: Music, b: Music) => {
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

            setMusic(allMusic.filter((musicItem) => {
                const nameMatch = musicItem.NAME.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(strippedSearch);
                const artistMatch = musicItem.ARTIST.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(strippedSearch);
                return nameMatch || artistMatch;
            }).sort((a: Music, b: Music) => {
                return a.NAME.localeCompare(b.NAME);
            }).slice(0, 10));
        } else {
            setMusic(allMusic.sort((a: Music, b: Music) => {
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
                            Add Music
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
                        <Button onClick={() => changePage(1)} disabled={(page * 10) >= music.length}>Next</Button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <ListGroup className='d-flex text-center'>
                            {music.map((musicItem: Music) => {
                                    return <ListGroup.Item onClick={() => selectMusic(musicItem)}>
                                        <div>
                                            <div className="fw-bold">
                                                {musicItem.NAME}
                                            </div>
                                            <div>
                                                {musicItem.ARTIST}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                })
                            }
                        </ListGroup>
                    </div>
                    {
                        showModal && selectedMusic &&
                        <MusicModal music={selectedMusic} closeModal={closeModal} />
                    }
                </div>
            }
            {
                (stage === Stages.ADDING || stage === Stages.UPDATING) &&
                <AddMusic refresh={refreshList} music={selectedMusic}/>
            }
        </div>
    );
}
