import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../services/socket";
import WaitRoomModal from "../components/modals/WaitRoomModal";
import QuestionModal from "../components/modals/QuestionModal";
import ResultsModal from "../components/modals/ResultsModal";
import useGameContext from "../context/GameHook";
import { addScore } from "../services/score";

const QUESTION_TIME_SEC = 5;
const POINTS_PER_CORRECT = 10;

type QA = {
  question: string;
  answers: string[];
  correct: number;
  timeSec?: number;
};

type AnswerState = {
  selected: number | null;
  isCorrect?: boolean;
  startedAt: number | null;
};

const Room: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { name, avatar } = useGameContext(); // << nombre y avatar del jugador

  const [questions, setQuestions] = useState<QA[]>([]);
  const [waiting, setWaiting] = useState(true);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [showResults, setShowResults] = useState(false);

  const quizStartRef = useRef<number | null>(null);
  const timerIdRef = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [finalElapsed, setFinalElapsed] = useState<number | null>(null);

  const postedRef = useRef(false); // evita postear dos veces

  useEffect(() => {
    if (!id) return;

    const initFromQuestions = (qs: QA[]) => {
      setQuestions(qs);
      setAnswers(qs.map(() => ({ selected: null, startedAt: null })));
      setCurrentIdx(0);
      setShowResults(false);
      setElapsed(0);
      setFinalElapsed(null);
      setWaiting(qs.length === 0);
      postedRef.current = false;
      quizStartRef.current = qs.length > 0 ? Date.now() : null;
    };

    socket.emit("room:getQuestions", { room: id }, (res: any) => {
      if (res?.ok && Array.isArray(res.questions)) {
        initFromQuestions(res.questions);
      } else {
        setWaiting(true);
      }
    });

    const onRooms = (payload: any) => {
      if (!payload) return;
      const handle = (roomObj: any) => {
        if (roomObj?.room === id && Array.isArray(roomObj.questions)) {
          initFromQuestions(roomObj.questions);
        }
      };
      if (Array.isArray(payload)) {
        const found = payload.find((r) => r.room === id);
        if (found) handle(found);
      } else {
        handle(payload);
      }
    };

    const onGameStarted = (data: any) => {
      if (data?.room === id && Array.isArray(data.questions)) {
        initFromQuestions(data.questions);
        setWaiting(false);
      }
    };

    socket.on("rooms", onRooms);
    socket.on("game:started", onGameStarted);
    return () => {
      socket.off("rooms", onRooms);
      socket.off("game:started", onGameStarted);
    };
  }, [id]);

  const totalTime = useMemo(
    () => questions.length * QUESTION_TIME_SEC,
    [questions.length]
  );

  useEffect(() => {
    if (waiting || questions.length === 0 || showResults) return;
    if (!quizStartRef.current) quizStartRef.current = Date.now();

    const tick = () => {
      const now = Date.now();
      const start = quizStartRef.current!;
      const e = Math.floor((now - start) / 1000);
      setElapsed(e);
    };

    tick();
    const idInt = window.setInterval(tick, 1000);
    timerIdRef.current = idInt;

    return () => {
      if (timerIdRef.current !== null) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [waiting, questions.length, showResults]);

  const ensureStarted = (idx: number) => {
    setAnswers((prev) => {
      const cur = prev[idx];
      if (cur && cur.startedAt == null) {
        const copy = [...prev];
        copy[idx] = { ...cur, startedAt: Date.now() };
        return copy;
      }
      return prev;
    });
  };

  const secondsUsedFor = (idx: number) => {
    const st = answers[idx]?.startedAt;
    if (!st) return 0;
    const now = Date.now();
    return Math.max(0, Math.floor((now - st) / 1000));
  };

  const remainingFor = (idx: number) =>
    Math.max(0, QUESTION_TIME_SEC - secondsUsedFor(idx));

  useEffect(() => {
    if (waiting || questions.length === 0 || showResults) return;
    ensureStarted(currentIdx);
  }, [waiting, questions.length, currentIdx, showResults]); // eslint-disable-line

  useEffect(() => {
    if (questions.length === 0 || waiting || showResults) return;
    if (Math.max(0, totalTime - elapsed) <= 0) finalizeResults();
  }, [elapsed, totalTime, questions.length, waiting, showResults]); // eslint-disable-line

  useEffect(() => {
    if (waiting || questions.length === 0 || showResults) return;
    const currLeft = remainingFor(currentIdx);
    if (currLeft > 0) return;
    const N = questions.length;
    for (let i = 1; i <= N; i++) {
      const idx = (currentIdx + i) % N;
      if (remainingFor(idx) > 0) {
        setCurrentIdx(idx);
        return;
      }
    }
    finalizeResults();
  }, [elapsed, currentIdx, waiting, questions.length, showResults]); // eslint-disable-line

  const finalizeResults = async () => {
    const evaluated = answers.map((a, i) => ({
      ...a,
      isCorrect: a.selected !== null && a.selected === questions[i].correct,
    }));
    setAnswers(evaluated);

    // tiempo final
    if (quizStartRef.current) {
      const end = Date.now();
      const start = quizStartRef.current;
      const e = Math.floor((end - start) / 1000);
      setFinalElapsed(e);
    }

    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }

    // ---- POST del puntaje (una sola vez) ----
    if (!postedRef.current) {
      postedRef.current = true;
      const correctCount = evaluated.reduce(
        (acc, a) => acc + (a.isCorrect ? 1 : 0),
        0
      );
      const points = correctCount * POINTS_PER_CORRECT;
      try {
        if (name) {
          await addScore({
            nombre: name,
            score: points,
            icono: avatar || "bat",
          });
        }
      } catch (e) {
        console.error("No se pudo guardar el score:", e);
      }
    }

    setShowResults(true);
  };

  const totalCorrect = useMemo(
    () => answers.reduce((acc, a) => acc + (a.isCorrect ? 1 : 0), 0),
    [answers]
  );

  const handlePrev = () => {
    if (questions.length === 0 || showResults) return;
    const N = questions.length;
    const idx = (currentIdx - 1 + N) % N;
    setCurrentIdx(idx);
    ensureStarted(idx);
  };

  const handleNext = (selectedId: string | null) => {
    if (questions.length === 0 || showResults) return;
    if (selectedId) {
      const selIndex = parseInt(selectedId.replace("opt-", ""), 10);
      if (remainingFor(currentIdx) > 0) {
        setAnswers((prev) => {
          const copy = [...prev];
          copy[currentIdx] = { ...copy[currentIdx], selected: selIndex };
          return copy;
        });
      }
    }
    const everyoneOutOfTime = questions.every((_, i) => remainingFor(i) === 0);
    const allAnswered = answers.every((a) => a.selected !== null);
    if (everyoneOutOfTime || allAnswered) {
      finalizeResults();
      return;
    }
    const N = questions.length;
    for (let i = 1; i <= N; i++) {
      const idx = (currentIdx + i) % N;
      if (remainingFor(idx) > 0) {
        setCurrentIdx(idx);
        return;
      }
    }
    finalizeResults();
  };

  // acciones resultados
  const handleGoBack = () => navigate(-1);
  const handleRestart = () => {
    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setAnswers(questions.map(() => ({ selected: null, startedAt: null })));
    setCurrentIdx(0);
    setShowResults(false);
    setElapsed(0);
    setFinalElapsed(null);
    setWaiting(false);
    postedRef.current = false;
    quizStartRef.current = Date.now();
  };

  if (waiting) {
    return (
      <WaitRoomModal open={true} roomName={`Sala ${id}`} roomCode={id ?? ""} />
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Sala {id}</h2>
        <p>No hay preguntas aún</p>
      </div>
    );
  }

  const q = questions[currentIdx];
  const selected = answers[currentIdx]?.selected;
  const remaining = Math.max(
    0,
    QUESTION_TIME_SEC -
      Math.floor(
        (Date.now() - (answers[currentIdx]?.startedAt ?? Date.now())) / 1000
      )
  );
  const timeUsed = Math.min(finalElapsed ?? elapsed, totalTime);

  // datos para el modal
  const correctItems = questions
    .map((qq, i) => ({
      question: qq.question,
      correctAnswer: qq.answers[qq.correct],
      userAnswer:
        answers[i].selected != null ? qq.answers[answers[i].selected!] : null,
      isCorrect: answers[i].isCorrect === true,
    }))
    .filter((x) => x.isCorrect)
    .map(({ question, correctAnswer, userAnswer }) => ({
      question,
      correctAnswer,
      userAnswer,
    }));

  const wrongItems = questions
    .map((qq, i) => ({
      question: qq.question,
      correctAnswer: qq.answers[qq.correct],
      userAnswer:
        answers[i].selected != null ? qq.answers[answers[i].selected!] : null,
      isCorrect: answers[i].isCorrect === false,
    }))
    .filter((x) => x.isCorrect)
    .map(({ question, correctAnswer, userAnswer }) => ({
      question,
      correctAnswer,
      userAnswer,
    }));

  return (
    <>
      {/* contador total */}
      <div className="fixed right-4 top-4 z-40 select-none rounded-xl bg-black/[0.04] px-3 py-2 text-center leading-tight">
        <div className="text-lg font-semibold text-black/80">
          {Math.max(0, totalTime - elapsed)}
        </div>
        <div className="text-[10px] uppercase tracking-wide text-black/50">
          seg totales
        </div>
      </div>

      <QuestionModal
        open={!showResults}
        heading={`Pregunta ${currentIdx + 1} / ${questions.length}`}
        headingSub={
          remaining > 0
            ? `Tiempo de esta pregunta: ${remaining}s`
            : "Tiempo agotado para esta pregunta"
        }
        question={q.question}
        options={q.answers.map((label, i) => ({ id: `opt-${i}`, label }))}
        initialSelectedId={selected !== null ? `opt-${selected}` : null}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <ResultsModal
        open={showResults}
        totalCorrect={answers.reduce(
          (acc, a) => acc + (a.isCorrect ? 1 : 0),
          0
        )}
        totalQuestions={questions.length}
        timeUsedSec={timeUsed}
        pointsPerCorrect={POINTS_PER_CORRECT}
        correctItems={correctItems}
        wrongItems={wrongItems}
        onBack={handleGoBack}
        onRestart={handleRestart}
      />
    </>
  );
};

export default Room;
