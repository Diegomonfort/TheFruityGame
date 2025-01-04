import React, { useEffect, useState } from "react";
import axios from "axios";

// Score component for the game page
const Score = ({ score }) => {
    const [bestScore, setBestScore] = useState(0);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user")); // Get user info from localstorage


        if (!user || !user.id) {
            return;
        }

        // Get the highest score
        const fetchBestScore = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/game/session-top?user_id=${user.id}`);


                if (response.data && response.data.highest_score !== undefined) {
                    setBestScore(response.data.highest_score);
                } else {
                    console.log("The highest score was not received");
                }
            } catch (error) {
                console.error("Error fetching best score:", error);
            }
        };

        fetchBestScore();
    }, []);

    return(
        <div className="scoreContainer">
            <div className="scoreItem">
                <span>Score</span>
                <div className="scoreNumber">{score}</div>
            </div>
            <div className="scoreItem">
                <span>Best</span>
                <div className="scoreNumberBest">{bestScore}</div>
            </div>
        </div>
    );
};

export default Score;
