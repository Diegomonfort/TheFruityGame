import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [expandedSession, setExpandedSession] = useState(null);
  const [questions, setQuestions] = useState({});
  const [fruits, setFruits] = useState({});
  const navigate = useNavigate();
  
  const storedUser = localStorage.getItem('user');
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  if (!userId) {
    console.error("User ID not found in localStorage");
  }

  // Get all the user sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/game/sessions?user_id=${userId}`);
        const data = await response.json();
        setSessions(data.sessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, [userId]);

  // Function to expand the containers
  const handleToggleExpand = async (sessionId) => {
    if (expandedSession === sessionId) {
      setExpandedSession(null);
      return;
    }

    setExpandedSession(sessionId);

    if (!questions[sessionId]) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/game/get-questions/${sessionId}`);
        const data = await response.json();


        const fruitsResponse = await fetch(`http://127.0.0.1:5000/api/fruits`);
        const fruitsData = await fruitsResponse.json();

        const fruitsMap = {};
        fruitsData.forEach((fruit) => {
          fruitsMap[fruit.id] = { name: fruit.name, family: fruit.family };
        });

        setFruits((prev) => ({ ...prev, ...fruitsMap }));
        setQuestions((prev) => ({ ...prev, [sessionId]: data.questions }));
      } catch (error) {
        console.error("Error fetching questions or fruits:", error);
      }
    }
  };


  const deleteSession = async (sessionId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/game/sessions/${sessionId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setSessions(prevSessions => prevSessions.filter(session => session.session_id !== sessionId));
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };


  const backHome = () =>{
    navigate("/")
}

  return (
    <div className="sessionsContainer">
        <span className="backBtn" onClick={backHome}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
        </span>
      <h1>MY SESSIONS</h1>
      <div className="sessionsDisplay">
        {sessions.map((session) => (
          <div
            key={session.session_id}
            className={`sessionItem ${
              expandedSession === session.session_id ? "expanded" : ""
            }`}
            onClick={() => handleToggleExpand(session.session_id)}
          >
            <div className="infoSession">
              <span className="scoreSession">Score {session.score}</span>
              <span className="deleteSession" onClick={() => deleteSession(session.session_id)}>Delete</span>
            </div>
            {expandedSession === session.session_id && (
              <div className="expandedContent">
                {questions[session.session_id] ? (
                  questions[session.session_id].map((question, index) => {
                    const fruit1 = fruits[question.fruit1_id];
                    const fruit2 = fruits[question.fruit2_id];
                    const isLastQuestion =
                      index === questions[session.session_id].length - 1;
                    const text =
                      question.attribute === "family"
                        ? `Which fruit belongs to the family of ${fruit1?.family || "Loading..."}?`
                        : `Which fruit has more ${question.attribute}?`;

                    return (
                      <div key={question.id} className="questionSessionDiv">
                        <div className="questionSession">{text}</div>
                        <div className="answerQuestion">
                          <span
                            className={
                              question.result === question.fruit1_id
                                ? "correctFruit"
                                : ""
                            }
                          >
                            {fruit1?.name || "Loading..."}
                          </span>
                          <span
                            className={
                              question.result === question.fruit2_id
                                ? "correctFruit"
                                : ""
                            }
                          >
                            {fruit2?.name || "Loading..."}
                          </span>
                          <FontAwesomeIcon
                            icon={
                              isLastQuestion && question.result !== question.correct
                                ? faXmark
                                : faCheck
                            }
                            className="answerIcon"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>Loading questions...</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sessions;
