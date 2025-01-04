import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Leadboard = () => {
    const [leadboard, setLeadboard] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserPosition, setCurrentUserPosition] = useState(null);

        const navigate = useNavigate();
    

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setCurrentUser(parsedUser);
        }

        // Get the leadboard stats
        axios.get("http://127.0.0.1:5000/api/leadboard")
            .then(response => {
                setLeadboard(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los datos del leaderboard:", error);
            });

        // Get users info to show there names usign the user_id from the leadboard
        axios.get("http://127.0.0.1:5000/api/users")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los datos de los usuarios:", error);
            });
    }, []);

    useEffect(() => {
        // Get the position of the actual user
        if (currentUser && leadboard.length > 0) {
            const userPosition = leadboard.findIndex(item => item.user_id === currentUser.id);
            if (userPosition !== -1) {
                setCurrentUserPosition({
                    position: userPosition + 1,
                    score: leadboard[userPosition].score,
                    name: currentUser.name
                });
            }
        }
    }, [currentUser, leadboard]);


    const backHome = () =>{
        navigate("/")
    }

    return (
        <div className="leadboardContainer">
            <span className="backBtn" onClick={backHome}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Back
            </span>
            <h1>Leadboard</h1>
            <div className="leadboardGeneral">
                <div className="labelsLeadboard">
                    <span className="labelL">Position</span>
                    <span className="labelL">Name</span>
                    <span className="labelL">Score</span>
                </div>

                <div className="scrollContainerLeadboard">
                    {leadboard.map((item, index) => {
                        const userName = users.find(user => user.id === item.user_id)?.name || "Anonymus";

                        // This is use to add the clases for the leadbaord items
                        let rankClass = '';
                        if (index === 0) rankClass = 'gold';
                        else if (index === 1) rankClass = 'silver';
                        else if (index === 2) rankClass = 'bronze';
                        else rankClass = 'regular';

                        return (
                            <div key={item.position} className={`itemPositionSocre ${rankClass}`}>
                                <span className="labelL">{`#${item.position}`}</span>
                                <span className="labelL">{userName}</span>
                                <span className="labelL">{item.score}</span>
                            </div>
                        );
                    })}
                </div>
                {currentUserPosition ? (
                    <div className="userPointsAtached">
                        <span className="labelL">{`#${currentUserPosition.position}`}</span>
                        <span className="labelL">{currentUserPosition.name}</span>
                        <span className="labelL">{currentUserPosition.score}</span>
                    </div>
                ) : (
                    <div className="userPointsAtached">
                        <span className="labelL">-</span>
                        <span className="labelL">You</span>
                        <span className="labelL">-</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leadboard;
