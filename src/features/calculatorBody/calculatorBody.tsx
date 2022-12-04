//@ts-nocheck
import { useEffect, useState } from "react";
import Button from "../button/button";
import Display from "../display/display";

function CalculatorBody() {
  const buttonText = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    "Clear",
    "=",
  ];
  const idNames: [string, number | string][] = [
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
    ["zero", 0],
    ["equals", "="],
    ["clear", "AC"],
    ["decimal", "."],
    ["multiply", "*"],
    ["divide", "/"],
    ["add", "+"],
    ["subtract", "-"],
  ];
  const buttons = [];

  const [formula, setFormula]: [(number | Function)[], Function] = useState([]);
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(0);
  const [numb, setNumb]: [number | string, Function] = useState(0);

  function handleFormula(operation: string) {
    if (operationMap.has(formula[-1])) {
    }
    setFormula([...formula, operation]);
  }

  function combineNumbers(a: number, b: number) {
    return Number(a.toString() + b.toString());
  }

  function handleNumberState(number: number) {
    if (typeof formula[-1] == "number") {
      var sliceToTake = formula.slice(0, -1);
    } else {
      var sliceToTake = formula;
    }
    if (numb == 0) {
      setNumb(number);
      setFormula([...sliceToTake, Number(number)]);
    } else {
      setNumb(combineNumbers(numb, number));
      setFormula([...formula.slice(0, -1), combineNumbers(numb, number)]);
    }
  }

  function checkForResultReset() {
    // Trying to change input right after finishing an equation
    // should reset the input. We first need to reset result and
    // treat it like we're starting all over again.
    if (formula.length == 1 && formula[0] == result) {
      setFormula([]);
      setResult(0);
      return true;
    }
    return false;
  }

  function handleButton(event: Event, operation: string | number) {
    if (typeof operation == "number") {
      if (checkForResultReset()) {
        setNumb(operation);
        setFormula([operation]);
      } else {
        handleNumberState(operation);
      }
    } else if (operation == ".") {
      // if numb is a string, then it is a number with a decimal at the end.
      // Therefore, do nothing. Otherwise, numb is a number, so convert it into
      // a string with a decimal at the end.
      if (typeof numb == "number") {
        setNumb(numb.toString() + ".");
      }
    } else {
      if (specMap.has(operation)) {
        // operation is = or AC
        specMap.get(operation)();
      } else {
        // operation is + - * /
        handleFormula(operation);

        setNumb(0);
      }
    }
  }

  // update the expected result every time there's an update.
  // The UX is enhanced because user will see what their calculation
  // will do without having pressed equals yet.
  // useEffect(() => {
  //     if (formula.length > 2) {
  //         setResult((formula: (number | Function)[]) => {
  //             return formula.reduce((acc, cur, ind, array) => {
  //                 if (typeof cur == "number") {
  //                     return array[ind - 1](acc, cur);
  //                 }
  //                 return acc;
  //             })
  //         })
  //     }
  // });
  function clear() {
    setResult(0);
    setFormula([]);
    setHistory([]);
    setNumb(0);
    console.log("cleared");
  }

  function equals() {
    // let equation = [...formula, numb];
    let newResult: number = formula.reduce(
      (accumulator: number, curVal, index, array) => {
        if (typeof curVal == "number") {
          // if (index == 0) {
          //     accumulator = curVal;
          // } else {
          if (array[index - 1] == "-" && typeof array[index - 2] != "number") {
            return operationMap.get(array[index - 2])(accumulator, -curVal);
          }
          return operationMap.get(array[index - 1])(accumulator, curVal);

          // }
        }
        return accumulator;
      }
    );

    setResult(newResult);
    setFormula([newResult]);
    setNumb(newResult);
  }

  function decimal(a: number, b: number) {
    if (a % 1 > 0) {
      // number already a decimal, do not decimalize further
      return combineNumbers(a, b);
    } else {
      // number is whole, you can decimalize
      return Number(a.toString() + "." + b.toString());
    }
  }

  const specMap = new Map([
    [
      "AC",
      () => {
        clear();
      },
    ],
    [
      "=",
      () => {
        equals();
      },
    ],
  ]);

  const operationMap = new Map([
    ["+", (a: number, b: number) => a + b],
    ["-", (a: number, b: number) => a - b],
    ["*", (a: number, b: number) => a * b],
    ["/", (a: number, b: number) => a / b],
    [".", (a: number, b: number) => decimal(a, b)],
  ]);
  //   const opsMap = new Map([
  //     [
  //       "+",
  //       () => {
  //         // setFormula(formula.push(initial));
  //         setFormula([...formula, numb, (a: number, b: number) => a + b]);
  //         setHistory([...history, numb, "+"]);
  //         console.log("add");
  //         console.log(formula);
  //         // return (a, b) => { a + b };
  //       },
  //     ],
  //     [
  //       "-",
  //       () => {
  //         // setFormula(formula.push(initial));
  //         setFormula([...formula, numb, (a: number, b: number) => a - b]);
  //         setHistory([...history, numb, "-"]);
  //         console.log("subtract");
  //         console.log(formula);
  //         // return (a:number, b:number) => { a - b };
  //       },
  //     ],
  //     [
  //       "*",
  //       () => {
  //         // setFormula(formula.push(initial));
  //         setFormula([...formula, numb, (a: number, b: number) => a * b]);
  //         setHistory([...history, numb, "*"]);
  //         console.log("mult");
  //         console.log(formula);
  //         // return (a, b) => { a * b };
  //       },
  //     ],
  //     [
  //       "/",
  //       () => {
  //         // setFormula(formula.push(initial));
  //         // setFormula([...formula, initial]);
  //         setFormula([...formula, numb, (a: number, b: number) => a / b]);
  //         setHistory([...history, numb, "/"]);
  //         console.log("divided");
  //         console.log(formula);
  //         // return (a, b) => { a / b };
  //       },
  //     ],
  //     ["AC", () => {}],
  //     [
  //       ".",
  //       () => {
  //         setNumb(numb + ".");
  //         // todo: only allow one decimal
  //       },
  //     ],
  //     [
  //       "=",
  //       () => {
  //     //     setFormula([...formula, numb]);
  //     setHistory([...history, numb]);

  //     // // setResult(99999);
  //     // setInitial(result);
  //     // setFormula([result]);
  //   },
  // ],
  //   /*  */]);

  for (let i = 0; i < idNames.length; i++) {
    // Generate a list of buttons to render.
    // Each button has innertext (the html displaying function),
    // operation (their number, or a function performing their
    // assigned operation).
    // Each button also has the formula, the current number, from
    // the parent component as states.
    let innertext: string = "";
    let operation: number | string;

    if (typeof idNames[i][1] == "number") {
      // console.log(idNames[i][1] + " is a number");
      innertext = idNames[i][1].toString();
      operation = idNames[i][1];
    } else {
      // console.log(idNames[i][1] + " is an operation");
      innertext = idNames[i][1].toString();
      // operation = opsMap.get(idNames[i][1]);
      operation = idNames[i][1];
    }

    // buttons have their id, text, and the operation they perform
    // Number buttons have their number as the operation
    buttons.push(
      <Button
        key={i}
        idName={idNames[i][0]}
        innertext={innertext}
        // resultState={[result, setResult]}
        // formulaState={[formula, setFormula]}
        // numberState={[initial, setInitial]}
        handler={handleButton}
        operation={operation}
      />
    );
  }

  return (
    <div className="calculator-body">
      <Display result={result} formula={formula} numberState={numb} />
      {buttons}
    </div>
  );
}

export default CalculatorBody;
