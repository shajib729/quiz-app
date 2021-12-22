import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useVideoList from '../hooks/useVideoList'
import classes from '../styles/Videos.module.css'
import Video from './Video.jsx'
import InfiniteScroll from 'react-infinite-scroll-component';

const Videos = () => {

    const [page, setPage] = useState(1)
    const {loading, error, videos, hasMore} = useVideoList(page)

    return (
        <div className={classes.videos}>
            
                {
                videos.length > 0 &&
                    <InfiniteScroll
                        dataLength={videos.length} 
                        next={()=>setPage(page+8)}
                        hasMore={hasMore}
                        loader={<h3>Loading...</h3>}
                    >
                        {videos.map((video,i) => video.noq>0? (
                            <NavLink to={`/quiz/${video.youtubeID}`} key={video.youtubeID}>
                                <Video title={`${i} ) ${video.title}`} id={video.youtubeID} noq={video.noq}/>
                            </NavLink>
                        ) :
                        (
                            <Video key={video.youtubeID} title={`${i} ) ${video.title}`} id={video.youtubeID} noq={video.noq}/>       
                        ) 
                        )}
                    </InfiniteScroll>
                }
            {
                loading && <h1 style={{ display: 'block',textAlign:"center", alignItems: "center", justifyContent:"center", width: '100%'}}>Loading ...</h1>
            }
            {
                !loading && videos.leangth===0 && <h3>No data found!</h3>
            }
            {
                error && <h3>There was an error!</h3>
            }
        </div>
    )
}

export default Videos
