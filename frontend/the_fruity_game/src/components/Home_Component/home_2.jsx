import React from "react";
import Logo from "../../assets/logoColor.png";
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { setSessionId } from "../../store/sessionSlice";

const HomeSignedIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    const handleStartGame = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (!userId) {
            alert("An error ocurred, please try again.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/game/start-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
            });

            if (response.ok) {
                const data = await response.json();
                const sessionId = data.session_id;

                dispatch(setSessionId(sessionId));
                localStorage.setItem('seesionId', JSON.stringify({ session: sessionId }));

                navigate('/game');
            } else {
                const errorData = await response.json();
                alert(`Error starting new game: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error ocurred, please try again.");
        }
    };


    const goSessions = () =>{
        navigate("/sessions")
    }
    

    return (
        <div className="home2">
            <span className="logOutBtn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <img src={Logo} alt="Logo" />
            <div className="optionsHomeSelection">
                <button onClick={handleStartGame} className="filled2 ButtonHome">New Game</button>
                <Link to="/leadboard"><button className="outline2 ButtonHome">Leadboard</button></Link>
            </div>
            <span className="sessionsBtn" onClick={goSessions} >Sessions</span>
        </div>
    );
}

export default HomeSignedIn;
