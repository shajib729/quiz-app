import { useEffect, useState } from "react";
import {
    getDatabase,
    ref,
    query,
    orderByKey,
    get
} from 'firebase/database'
 
export default function useAnswers(videoID) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        async function fetchAnswers() { 
            // database related code
            const db = getDatabase()
            const answerRef = ref(db, "answers/" + videoID + "/questions")
            const answerQuery = query(
                answerRef,
                orderByKey(),
            )

            try {
                setError(false)
                setLoading(true)
                // request firebase database
                const res = await get(answerQuery)
                setLoading(false)
                if (res.exists()) {
                    setAnswers([...answers, ...Object.values(res.val())])
                } else {

                }
            } catch (err) {
                console.log(err);
                setLoading(false)
                setError(true)
            }
        }
        
        fetchAnswers()
    }, [videoID])
    return {
        loading,
        error,
        answers,
    }
}