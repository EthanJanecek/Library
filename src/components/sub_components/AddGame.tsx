import { useState } from 'react';
import { addGame, updateGame } from '../../hooks/controller';
import { Stages, useSession } from '../../hooks/useSession';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { videoGameOptions } from '../../hooks/constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function AddGame(props: any) {
    const [state, dispatch] = useSession();
    const {user, stage} = state;
    const {setStage} = dispatch;

    const [err, setErr] = useState("");
    const [data, setData] = useState(
        {
            gameID: stage === Stages.UPDATING ? props.game.VIDEO_GAME_ID : 0,
            name: stage === Stages.UPDATING ? props.game.NAME : "",
            consoleBrand: stage === Stages.UPDATING ? props.game.CONSOLE_BRAND : videoGameOptions.consoleTypes[0].brand,
            console: stage === Stages.UPDATING ? props.game.CONSOLE : videoGameOptions.consoleTypes[0].consoles[0],
            type: stage === Stages.UPDATING ? props.game.TYPE : videoGameOptions.type[0],
            barcode: stage === Stages.UPDATING ? props.game.BARCODE : 0,
            played: stage === Stages.UPDATING ? props.game.PLAYED : false
        }
    );

    const [consoleOptions, setConsoleOptions] = useState(videoGameOptions.consoleTypes[0].consoles);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const email = user ? user.EMAIL : "";

        if(stage === Stages.ADDING) {
            addGame(email, data, (success: Boolean, response: any) => {
                if(success) {
                    props.refresh();
                    setStage(Stages.VIEWING);
                } else {
                    setErr(response);
                }
            });
        } else if(stage === Stages.UPDATING) {
            updateGame(email, data, (success: Boolean, response: any) => {
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

    const changeConsoleBrand = (brandName: string) => {
        var foundMatch = false;

        videoGameOptions.consoleTypes.forEach((consoleType) => {
            if(consoleType.brand === brandName) {
                foundMatch = true;
                setConsoleOptions(consoleType.consoles);
                setData({...data, consoleBrand: brandName, console: consoleType.consoles[0]});
            }
        })

        if(!foundMatch) {
            setConsoleOptions([]);
            setData({...data, consoleBrand: brandName, console: ''});
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
                    <Form.Label>Console Brand*</Form.Label>
                    <Dropdown options={videoGameOptions.consoleTypes.map((consoleType) => {
                        return consoleType.brand;
                    })} value={data.consoleBrand} onChange={(event) => {changeConsoleBrand(event.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Console*</Form.Label>
                    <Dropdown options={consoleOptions} value={data.console} onChange={(event) => {setData({...data, console: event.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Dropdown options={videoGameOptions.type} value={data.type} onChange={(event) => {setData({...data, type: event.value})}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Barcode</Form.Label>
                    <Form.Control type="number" required value={data.barcode} onChange={(event) => {setData({...data, barcode: checkNum(event.target.value)})}} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Played?" checked={data.played} onChange={() => {setData({...data, played: !data.played})}}/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}