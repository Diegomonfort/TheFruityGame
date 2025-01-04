import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fruitUrls } from "./fruits.js"; // The images of the fruits

const Cards = ({ questionData, onSelectFruit, timeLeft, error, isCorrect, onCountdownEnd }) => {

    const navigate = useNavigate();
    const { fruits, question, correct_fruit_id } = questionData; 
    const [countdown, setCountdown] = useState(3);
    const [selectedFruitId, setSelectedFruitId] = useState(null);

    const getImageUrl = (fruitName) => {
        if (fruitUrls[fruitName]) {
            return fruitUrls[fruitName];
        } else {
            console.error(`URL not found: ${fruitName}`);
        }
    };

    // Function to select the fruit card
    const handleSelectFruit = (fruitId) => {
        setSelectedFruitId(fruitId);
        onSelectFruit(fruitId);
    };

    const handleBackHome = () => {
        navigate('/');
    };

    useEffect(() => {
        if (isCorrect) {
            setCountdown(3); // Reset the countdown
            const interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            const timeout = setTimeout(() => {
                clearInterval(interval);
                onCountdownEnd();
            }, 3900);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [isCorrect, onCountdownEnd]);

    return (
        <div className="cardsContainer">
            <div className="fruitsContainer">
                {fruits.map((fruit, index) => {
                    const isSelected = selectedFruitId === fruit.id;
                    const isCorrectFruit = correct_fruit_id === fruit.id;
                    const circleColor = isSelected
                        ? isCorrectFruit
                            ? "green"
                            : "black"
                        : "transparent";

                    // Show the family atribtute or the nutruitions atribute
                    const valueOrFamily = fruit.value !== null ? fruit.value : fruit.family;

                    return (
                        <React.Fragment key={fruit.id}>
                            <div
                                className="cardFruitContainer"
                                onClick={() => handleSelectFruit(fruit.id)}
                            >
                                <span>{fruit.name}</span>
                                <div className="fruitCard">
                                    <img
                                        src={getImageUrl(fruit.name)}
                                        alt={fruit.name}
                                        onError={(e) => (e.target.src = "/assets/default-fruit.jpg")}
                                    />
                                    {(isSelected || error || isCorrect) && (
                                        <div className="overlay">
                                            <div
                                                className={`valueCircle ${circleColor}`}
                                            >
                                                <span className="valueText">{valueOrFamily}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {index < fruits.length - 1 && <div className="vsContainer">VS</div>}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="questionContainer">
                <div className={`questionItem ${error ? "error" : isCorrect ? "correct" : ""}`}>
                    {error ? (
                        <div className="asnwerContianer">
                            <div className="errorMessageGame">INCORRECT</div>
                            <button className="backHomeButtonGame" onClick={handleBackHome}>
                                Back Home
                            </button>
                        </div>
                    ) : isCorrect ? (
                        <div className="asnwerContianer">
                            <div className="errorMessageGame">CORRECT</div>
                            <div className="nextQuestionMessage">
                                Next question in {countdown}...
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="questiontext">{question}</div>
                            <div className="questionTime">{timeLeft}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cards;
