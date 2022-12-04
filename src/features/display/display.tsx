import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from "react";

function Display(props: {
    formula: ReactNode; numberState: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
}) {
    // const [currentResult, setCurrentResult] = useState(0);

    return (
        <div id="display">
            <div>
                {/* {props.formula} */}
            </div>
            <p>Formula: {props.formula} </p>
            <p>Previous: { props.result }</p>
            <p>Input: {props.numberState}</p>
            {/* {currentResult} */}
        </div>
    )
}


export default Display;