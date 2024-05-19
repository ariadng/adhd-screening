"use client";

import styles from "./styles.module.scss";
import questions from "./questions.json";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/ui";

export function ADHDTest() {

	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [answers, setAnswers] = useState<(number|string|boolean)[]>([]);

	const answerQuestion = useCallback((questionId: number, answer: number | string | boolean) => {
		const updatedAnswers = [...answers];
		updatedAnswers[questionId] = answer;
		setAnswers(updatedAnswers);
		goToNextQuestion();
	}, [answers, currentQuestion]);

	const goToNextQuestion = useCallback(() => {
		if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
	}, [questions, currentQuestion]);

	const canGoBack = useMemo(() => {
		if (currentQuestion === 0) return false;
		return true;
	}, [currentQuestion, answers]);

	const canGoForward = useMemo(() => {
		if (currentQuestion + 1 >= questions.length) return false;
		if (typeof answers[currentQuestion] === "undefined") return false;
		return true;
	}, [currentQuestion, answers]);

	const goBack = useCallback(() => {
		if (canGoBack) setCurrentQuestion(currentQuestion - 1);
	}, [currentQuestion, answers]);
	
	const goForward = useCallback(() => {
		if (canGoForward) setCurrentQuestion(currentQuestion + 1);
	}, [currentQuestion, answers]);

	return (
		<div className={styles.ADHDTest}>
			
			<div className={styles.ProgressBar}>
				{questions.map((q, index) => (
					<div key={q.id} className={classNames(styles.Cell, {
						[styles.Done]: answers[index],
						[styles.Active]: currentQuestion === index,
					})}></div>
				))}
			</div>

			<div className={styles.TestArea}>
				<div className={styles.Question}>
					<div className={styles.QuestionNumber}>
						Pertanyaan No. {currentQuestion + 1}
					</div>
					<div className={styles.QuestionText}>
						{questions[currentQuestion].question}
					</div>
				</div>
				<div className={styles.Options}>

					{questions[currentQuestion].type === "rating" && <>
						<Button color={answers[currentQuestion] === 1 ? "primary-inverse" : "default"} onClick={() => answerQuestion(currentQuestion, 1)} label="Tidak Pernah" />
						<Button color={answers[currentQuestion] === 2 ? "primary-inverse" : "default"} onClick={() => answerQuestion(currentQuestion, 2)} label="Jarang" />
						<Button color={answers[currentQuestion] === 3 ? "primary-inverse" : "default"} onClick={() => answerQuestion(currentQuestion, 3)} label="Kadang-kadang" />
						<Button color={answers[currentQuestion] === 4 ? "primary-inverse" : "default"} onClick={() => answerQuestion(currentQuestion, 4)} label="Sering" />
						<Button color={answers[currentQuestion] === 5 ? "primary-inverse" : "default"} onClick={() => answerQuestion(currentQuestion, 5)} label="Sangat Sering" />
					</>}

					{questions[currentQuestion].type === "boolean" && <>
						<Button color={answers[currentQuestion] === true ? "primary-inverse" : "default"} onClick={() => answerQuestion(currentQuestion, true)} label="Ya" />
						<Button color={answers[currentQuestion] === false ? "primary-inverse" : "default"} onClick={() => answerQuestion(currentQuestion, false)} label="Tidak" />
					</>}

				</div>
			</div>

			<div className={styles.Actions}>
				{canGoBack && <Button icon="arrow_back" onClick={() => goBack()} />}
				{canGoForward && <Button icon="arrow_forward" onClick={() => goForward()} />}
				{currentQuestion === questions.length - 1 && <Button label="Selesaikan Tes" color="primary" />}
			</div>

		</div>
	);

}