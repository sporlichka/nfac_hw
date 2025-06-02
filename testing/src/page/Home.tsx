import React, { useEffect, useState } from "react";
import RandomPhrases from "./components/RandomPhrases";

export default function Home() {
    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || '';
    });
    const [customTime, setCustomTime] = useState(10);
    const [timer, setTimer] = useState(customTime);
    const [isRunning, setIsRunning] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [completionCount, setCompletionCount] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState('#f0f8ff');

    useEffect(() => {
        let intervalId: number; 
        if (isRunning && timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsRunning(false);
            setShowMessage(true);
            changeBackgroundColor();
        }

        return () => {
            if (intervalId) {
                setCompletionCount(prev => prev + 1);
                clearInterval(intervalId);
                
            }
        };
    }, [isRunning, timer]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        localStorage.setItem('username', newUsername);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseInt(e.target.value) || 10;
        setCustomTime(newTime);
        if (!isRunning) {
            setTimer(newTime);
        }
    };

    const startTimer = () => {
        setTimer(customTime);
        setIsRunning(true);
        setShowMessage(false);
    };

    const resetTimer = () => {
        setTimer(customTime);
        setIsRunning(false);
        setShowMessage(false);
    };

    const changeBackgroundColor = () => {
        const colors = ['#ffebee', '#e8f5e9', '#e3f2fd', '#f3e5f5', '#fff8e1'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
    };

    return (
        <div style={{ 
            minHeight: '100vh',
            backgroundColor: backgroundColor,
            transition: 'background-color 0.5s ease',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '20px',
            padding: '40px'
        }}>
            <h1 style={{ color: '#333', marginBottom: '20px' }}>Timer App</h1>
            
            <div style={{ 
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '30px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '500px'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Your Name:
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter your name"
                        style={{ 
                            padding: '10px',
                            fontSize: '16px',
                            width: '100%',
                            borderRadius: '5px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Set Timer (seconds):
                    </label>
                    <input
                        type="number"
                        value={customTime}
                        onChange={handleTimeChange}
                        min="1"
                        max="60"
                        disabled={isRunning}
                        style={{ 
                            padding: '10px',
                            fontSize: '16px',
                            width: '100%',
                            borderRadius: '5px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                <div style={{ 
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10px',
                    padding: '20px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '18px', marginBottom: '5px' }}>
                        {username || 'Guest'}, you have:
                    </div>
                    <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1976d2' }}>
                        {timer} sec
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button 
                        onClick={startTimer}
                        disabled={isRunning}
                        style={{ 
                            padding: '12px 24px',
                            fontSize: '16px',
                            cursor: isRunning ? 'not-allowed' : 'pointer',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            flex: 1
                        }}
                    >
                        Start Timer
                    </button>
                    <button 
                        onClick={resetTimer}
                        style={{ 
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            flex: 1
                        }}
                    >
                        Reset
                    </button>
                </div>

                <div style={{ 
                    backgroundColor: '#e8f5e9',
                    borderRadius: '10px',
                    padding: '15px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Timer Completions:</div>
                    <div style={{ fontSize: '24px' }}>{completionCount}</div>
                </div>
            </div>

            {showMessage && (
                <div style={{ 
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '500px',
                    textAlign: 'center'
                }}>
                    <RandomPhrases username={username} />
                </div>
            )}
        </div>
    );
}