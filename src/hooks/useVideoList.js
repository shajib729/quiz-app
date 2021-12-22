import { useEffect, useState } from "react";
import {
    getDatabase,
    ref,
    query,
    orderByKey,
    get,
    startAt,
    limitToFirst
} from 'firebase/database'
 
export default function useVideoList(page) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [videos, setVideos] = useState([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        async function fetchVideo() { 
            // database related code
            const db = getDatabase()
            const videosRef = ref(db, "videos")
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(8)
            )

            try {
                setError(false)
                setLoading(true)
                // request firebase database
                const res = await get(videoQuery)
                setLoading(false)
                if (res.exists()) {
                    setVideos([...videos, ...Object.values(res.val())])
                } else {
                    setHasMore(false)
                }
            } catch (err) {
                console.log(err);
                setLoading(false)
                setError(true)
            }
        }
        
        setTimeout(() => {
            fetchVideo()
        }, 1000)
    }, [page])
    return {
        loading,
        error,
        videos,
        hasMore
    }
}