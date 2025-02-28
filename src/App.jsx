import { useState } from "react";
import styles from "./App.module.css";

export const App = () => {
	const [operand1, setOperand1] = useState("");
	const [operator, setOperator] = useState("");
	const [operand2, setOperand2] = useState("");
	const [display, setDisplay] = useState("0");
	const [result, setResult] = useState(null);
	const [resultDisplay, setResultDisplay] = useState(false);

	const NUMS = [
		"C",
		"7",
		"8",
		"9",
		"4",
		"5",
		"6",
		"1",
		"2",
		"3",
		"+",
		"0",
		"-",
		"=",
	];

	const numberClick = (num) => {
		if (resultDisplay) {
			setOperand1(num);
			setOperator("");
			setOperand2("");
			setDisplay(num);
			setResultDisplay(false);
		} else if (!operator) {
			setOperand1(operand1 === "0" ? num : operand1 + num);
			setDisplay(operand1 === "0" ? num : operand1 + num);
		} else {
			setOperand2(operand2 === "0" ? num : operand2 + num);
			setDisplay(
				operand1 + operator + (operand2 === "0" ? num : operand2 + num)
			);
			console.log("operand1", operand1);
		}
	};
	console.log("operand2", operand2);
	const operatorClick = (newOperator) => {
		if (result !== null && operand2 === "") {
			setOperand1(result);
			setOperator(newOperator);
			setDisplay(result + newOperator);
			setResult(null);
		} else if (operator && operand2 !== "") {
			const newResult = calculateResult();
			setOperand1(newResult);
			setOperator(newOperator);
			setOperand2("");
			setDisplay(newResult + newOperator);
			setResult(null);
		} else {
			setOperator(newOperator);
			setDisplay(operand1 + newOperator);
		}
		setResultDisplay(false);
	};

	const equalsClick = () => {
		const newResult = calculateResult();
		setResult(newResult);
		setDisplay(newResult);
		setResultDisplay(true);
		setOperand1("");
		setOperator("");
		setOperand2("");
	};

	const clearClick = () => {
		setOperand1("");
		setOperator("");
		setOperand2("");
		setDisplay("0");
		setResult(null);
		setResultDisplay(false);
	};

	const calculateResult = () => {
		const num1 = parseInt(operand1);
		const num2 = parseInt(operand2);
		switch (operator) {
			case "+":
				return num1 + num2;
			case "-":
				return num1 - num2;
			default:
				return num2;
		}
	};

	return (
		<div className={styles.calculator}>
			<div
				className={`${styles.display} ${
					resultDisplay ? styles.result : ""
				}`}
			>
				{display}
			</div>
			<div className={styles.buttons}>
				{NUMS.map((num) => (
					<button
						key={num}
						className={styles.button}
						onClick={() => {
							if (num === "C") {
								clearClick();
							} else if (num === "+" || num === "-") {
								operatorClick(num);
							} else if (num === "=") {
								equalsClick();
							} else {
								numberClick(num);
							}
						}}
					>
						{num}
					</button>
				))}

				{/*<button
					className={styles.button}
					onClick={() => operatorClick("+")}
				>
					+
				</button>
				<button
					className={styles.button}
					onClick={() => operatorClick("-")}
				>
					-
				</button>
				<button className={styles.button} onClick={equalsClick}>
					=
				</button>
				<button className={styles.button} onClick={clearClick}>
					C
				</button>*/}
			</div>
		</div>
	);
};
