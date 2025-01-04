import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from '@mui/material';
import Score from "../components/Game/sccore.jsx";
import Cards from "../components/Game/cards.jsx";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Game = () => {

    const sessionId = useSelector((state) => state.session.sessionId);
    const [questionData, setQuestionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const navigate = useNavigate();

    // If not session redirect to home
    useEffect(() => {
        if (!sessionId) {
            navigate('/');
        }
    }, [sessionId, navigate]);



    useEffect(() => {

        // Get a question from backend
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/game/question?session_id=${sessionId}`);
                setQuestionData(response.data);
                setLoading(false);
                setTimeLeft(30);
            } catch (error) {
                console.error("Error fetching question:", error);
                setLoading(false);
            }
        };

        if (sessionId) {
            fetchQuestion();
        }
    }, [sessionId]);


    useEffect(() => {
        if (timeLeft === 0 && !isCorrect && !error) {
            handleGameOver(); // End the game is time ends
        }

        const timer = timeLeft > 0 && !isCorrect && !error && setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isCorrect, error]);

    const handleSelectFruit = async (selectedFruitId) => {
        if (!questionData || error || isCorrect) return;

        const { correct_fruit_id } = questionData;

        if (selectedFruitId === correct_fruit_id) {
            setScore(prevScore => prevScore + 1);
            setIsCorrect(true);
        } else {
            handleGameOver();
        }
    };

    // Function to end the game
    const handleGameOver = () => {
        setError(true); // Know when the game end
        saveScore(); // Save the score of the session
    };

    // Get a new question for the actual session
    const fetchNewQuestion = async () => {
        try {

            const response = await axios.get(`http://127.0.0.1:5000/api/game/question?session_id=${sessionId}`);
            setQuestionData(response.data);
            setLoading(false);
            setTimeLeft(30);
            setError(false);
            setIsCorrect(false);

        } catch (error) {
            console.error("Error fetching new question:", error);
            setLoading(false);
        }
    };

    // Save the score to backend
    const saveScore = async () => {
        try {
            await axios.post(`http://127.0.0.1:5000/api/game/save_score`, {
                session_id: sessionId,
                score: score
            });
        } catch (error) {
            console.error("Error saving score:", error);
        }
    };

    return (
        <div className="gameContainer">
            <Score score={score} />
            {loading ? (
                <CircularProgress />
            ) : (
                <Cards
                    questionData={questionData}
                    onSelectFruit={handleSelectFruit}
                    timeLeft={timeLeft}
                    error={error}
                    isCorrect={isCorrect}
                    onCountdownEnd={fetchNewQuestion}
                />
            )}
        </div>
    );
};

export default Game;
