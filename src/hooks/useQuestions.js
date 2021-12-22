import { useEffect, useState } from "react";
import {
    getDatabase,
    ref,
    query,
    orderByKey,
    get
} from 'firebase/database'
 
export default function useQuestions(videoID) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        async function fetchQuestions() { 
            // database related code
            const db = getDatabase()
            const quizRef = ref(db, "quiz/" + videoID + "/questions")
            const quizQuery = query(
                quizRef,
                orderByKey(),
            )

            try {
                setError(false)
                setLoading(true)
                // request firebase database
                const res = await get(quizQuery)
                setLoading(false)
                if (res.exists()) {
                    setQuestions([...questions, ...Object.values(res.val())])
                } else {

                }
            } catch (err) {
                console.log(err);
                setLoading(false)
                setError(true)
            }
        }
        
        fetchQuestions()
    }, [videoID])
    return {
        loading,
        error,
        questions,
    }
}