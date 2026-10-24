'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const exercises = [
  { name: 'Warm-up mobility', detail: '5 minutes light mobility and activation', reps: '5 min' },
  { name: 'Push-ups', detail: 'Controlled reps with full range motion', reps: '3x10' },
  { name: 'Bodyweight squats', detail: 'Slow controlled lower pattern', reps: '3x15' },
  { name: 'Plank hold', detail: 'Core engagement and posture control', reps: '3x30s' },
  { name: 'Cool-down stretch', detail: 'Light recovery sequence', reps: '5 min' },
];

export default function WorkoutTimer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const intervalRef = useRef<number | null>(null);

  const currentExercise = useMemo(() => exercises[currentIndex], [currentIndex]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (currentIndex < exercises.length - 1) {
            setCurrentIndex((index) => index + 1);
            return 45;
          }

          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isRunning, currentIndex]);

  const handleComplete = async () => {
    const response = await fetch('/api/workout/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routineName: 'Momentum Routine', durationMinutes: 30 }),
    });

    if (response.ok) {
      setCurrentIndex(0);
      setSecondsLeft(45);
      setIsRunning(false);
      alert('Workout completed! You earned points and your streak increased.');
    }
  };

  const next = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSecondsLeft(45);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSecondsLeft(45);
    }
  };

  return (
    <section className="card-panel workout-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Workout session</p>
          <h2>Momentum Routine</h2>
        </div>
        <span className="pill">{currentIndex + 1}/{exercises.length}</span>
      </div>

      <div className="exercise-box">
        <div className="timer-display">{secondsLeft}s</div>
        <h3>{currentExercise.name}</h3>
        <p>{currentExercise.detail}</p>
        <div className="meta-row">
          <span>Sets/reps: {currentExercise.reps}</span>
          <span>Next: {currentIndex < exercises.length - 1 ? exercises[currentIndex + 1].name : 'Complete'}</span>
        </div>
      </div>

      <div className="button-row">
        <button className="btn btn-primary" onClick={() => setIsRunning((prev) => !prev)}>{isRunning ? 'Pause' : 'Start'}</button>
        <button className="btn btn-secondary" onClick={previous}>Previous</button>
        <button className="btn btn-secondary" onClick={next}>Skip</button>
        <button className="btn btn-primary" onClick={handleComplete}>Complete workout</button>
      </div>
    </section>
  );
}
