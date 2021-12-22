import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";
import _ from 'lodash'
import {useAuth} from '../../context/AuthContext'
import { getDatabase, ref, set } from "firebase/database";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked = action.value;
      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const { loading, error, questions } = useQuestions(id)

  const [state, dispatch] = useReducer(reducer, initialState)
  const {currentUser} = useAuth()
  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions
    })
  }, [questions])
  
  function handleAnswerChange(e, index) { 
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked
    })
  }

  // next question function
  function nextQuestion() {
    if (currentQuestion < questions.length-1) {
      setCurrentQuestion(currentQuestion+1)
    }
  }

  // next question function
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion(currentQuestion-1)
    }
  }

  // progress count
  const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : '0'
  document.querySelector('.ProgressBar_tooltip__RgDmZ')?.style.setProperty('--x',percentage+"%")

  // submit quiz
  async function submit() {
    const { uid } = currentUser
    
    const db = getDatabase()
    const resultRef = ref(db, `result/${uid}`)

    await set(resultRef, {
      [id] : state
    })
    navigate(`/result/${id}`, {state})
  }

  return (
    <>
      {
        loading && <h3>Loading...</h3>
      }
      {
        error && <h3>There was an error!</h3>
      }
      {
      !loading && !error && questions.length && (
      <>
        <h1>{questions[currentQuestion]?.title}</h1>
        <h4>Question can have multiple answers</h4>
        <Answers handleAnswerChange={handleAnswerChange} options={state[currentQuestion]?.options} />
        <ProgressBar submit={submit} nextQuestion={nextQuestion} prevQuestion={prevQuestion} progress={percentage} />
        <MiniPlayer />
      </>  
      )}
    </>
  );
}