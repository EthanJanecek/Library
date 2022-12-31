import { useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { barcodeLookup } from '../../hooks/controller';
import { useSession, Stages } from '../../hooks/useSession';

export function BarcodeReader(props: any) {
    const [state, dispatch] = useSession();
    const {barcode} = state;
    const {setBarcode, setStage, setBarcodeObject} = dispatch;

    const [gotBarcode, setGotBarcode] = useState(false);
    const [manualBarcode, setManualBarcode] = useState("");

    const retake = () => {
        setGotBarcode(false);
        setBarcode("");
    }

    const capturedBarcode = (code: string) => {
        setGotBarcode(true);
        setBarcode(code);
    }

    const useBarcode = () => {
        barcodeLookup(barcode, (responseData: any) => {
            setBarcodeObject(responseData);
            setStage(Stages.ADDING);
        });
    }

    const useManualBarcode = () => {
        setBarcode(manualBarcode);
        barcodeLookup(manualBarcode, (responseData: any) => {
            setBarcodeObject(responseData);
            setStage(Stages.ADDING);
        });
    }

    return (
        <div>
            <BarcodeScannerComponent
                    width={"100%"}
                    height={"50%"}
                    onUpdate={(err, result) => {
                        if (result && !gotBarcode) {
                            capturedBarcode(result.getText());
                        }
                    }}
                />
                <p>{barcode}</p>
                {
                    gotBarcode &&
                    <div>
                        <button className='btn btn-primary' onClick={useBarcode}>
                            Use Barcode
                        </button>
                        <button className='btn btn-primary' onClick={retake}>
                            Retake
                        </button>
                    </div>
                }
                {
                    !gotBarcode &&
                    <div>
                        <label>
                            Barcode:
                            <input type="text" value={manualBarcode} onChange={(event) => {setManualBarcode(event.target.value)}}/>
                        </label>
                        <button className='btn btn-primary' onClick={useManualBarcode}>
                            Submit
                        </button>
                    </div>
                }
        </div>
    );
}