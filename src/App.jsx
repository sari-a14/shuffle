import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const defaultTasks = [
    "Tidy Room",
    "Read a Book",
    "Draw Something",
    "Go for a Walk",
    "Practice Guitar",
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("shuffleTasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : defaultTasks;
  });

  const [currentTask, setCurrentTask] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(tasks.join("\n"));

  const [cardPop, setCardPop] = useState(false);

  const hasTasks = tasks.length > 0;

  useEffect(() => {
    localStorage.setItem(
      "shuffleTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const taskCard = (
  <div
    className={`taskCard ${
      isShuffling ? "shuffling" : ""
    } ${cardPop ? "pop" : ""}`}
  >
    <h2 className="taskDisplay">
      {currentTask || (hasTasks ? "\u00A0" : "No Tasks Yet")}
    </h2>
  </div>
);

  // Editing screen
  if (isEditing) {
    return (
      <div className="editorScreen">
        <h1>Edit Tasks</h1>

        <textarea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />

        <button
          className="doneEditing"
          onClick={() => {
            const newTasks = [
              ...new Set(
                taskText
                  .split("\n")
                  .map(task => task.trim())
                  .filter(task => task !== "")
              )
            ];
            setTasks(newTasks);
            setIsEditing(false);
          }}
        >
          Done
        </button>
      </div>
    );
  }

  // Main screen
  return (
    <>
        <div 
          className="app" 
          onClick={!isWorking ? randomiseTask : undefined}
        >
          <div className="header">
            <h1>
              {isWorking ? "Focus" : "Shuffle"}
            </h1>
            <p>
              {isWorking
                ? "Lock In"
                : !hasTasks
                  ? "Tap ⚙️ to add tasks"
                  : isShuffling
                    ? "Shuffling..."
                    : "Tap to Randomise"}
            </p>
          </div>

            {taskCard}
            
          <div className="playContainer">
            {!isWorking ? (
              <button
                className="playButton"
                disabled={!currentTask || isShuffling || !hasTasks}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsWorking(true);
                }}
              >
                ▶
              </button>
            ) : (
              <button
                className="doneButton"
                onClick={() => {
                  setIsWorking(false);
                  setCurrentTask("");
                }}
              >
                ✓
              </button>
            )}
        </div>

          <button
            className="gearButton"
            onClick={(e) => {
              e.stopPropagation();
              setTaskText(tasks.join("\n"));
              setIsEditing(true);
            }}
          >
            ⚙️
          </button>
        </div>
    </>
  );

  // Randomise task function
  function randomiseTask() {
    if (isWorking) return;
    if (isShuffling) return;
    if (!hasTasks) return;

    setIsShuffling(true);

    let count = 0;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * tasks.length);
      setCurrentTask(tasks[randomIndex]);

      count++;

      if (count >= 20) {
        clearInterval(interval);

        const finalIndex = Math.floor(Math.random() * tasks.length);
        
        setCurrentTask(tasks[finalIndex]);
        setIsShuffling(false);
        setCardPop(true);
        setTimeout(() => {
          setCardPop(false);
        }, 250);
      }
    }, 60);
  }
}

export default App;