//@ts-nocheck
import { useState } from "react";

function Button(props: {
    idName: string;
    innertext: string;
    // resultState: [number, Function];
    // formulaState: [(number|Function)[],Function];
    // numberState: [number, Function];
    handler: Function;
    operation: number|string;
}){
    
    // // destructure formula and input number state
    // const [formula, setFormula] = props.formulaState;
    // const [curNum, setNum] = props.numberState;
    
    // // handler for number button
    // const doNumber = (numberState: [number|string, Function]) => {
    //     if (numberState[0] == 0) {
    //         setNum(props.operation)
    //     } else {
    //         setNum(
    //             Number(numberState[0].toString() + props.operation.toString())
    //         )
    //     }
    // }
    
    // // handler for operation button
    // const doOperation = (operation: string) => {
    //     // if (typeof operation != Number) {
    //     //     setFormula([...formula, curNum]);
    //     //     operation();
    //     //     console.log("Non returning operation performed.");
    //     // }
    //     console.log("formula from dooperation: " + formula);
    //     if (["AC", "="].includes(operation)) {
    //         setFormula([...formula, curNum]);

    //     } else {
    //         setFormula([...formula, curNum, operation]);
    //     }
    

    //     // operation();
    //     console.log("result: " + props.resultState[0]);
    //     console.log("formula: " + formula);
    //     console.log("number: " + curNum);
        // operation();
        // setNum(0);
    // }
    
    // user clicks on it, program splits logic depending on if the button
    // is a number or an operation
    const handleClick = (_e) => {
        console.log("Event triggered: " + props.idName);
        // if (typeof props.operation == "number") {
        //     doNumber([curNum, setNum]);
        // } else {
        //     console.log(typeof props.operation)
        //     doOperation(props.operation);
        // }
        props.handler(_e, props.operation);
    };

    return (
        <div
            className="button"
            id={props.idName}
            onClick={(e) => { handleClick(e) }}
        >
            {props.innertext}
        </div>
    )
} 

export default Button;
