import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../Nooks/useFetching";
import PostServer from "../API/PostServer";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params= useParams()
    const [post,setPost]=useState({})
    const [comments,setComments]=useState([])

    const {fetching,isLoading:isLoading,error:Error}=useFetching(async ()=>{
        const response=await PostServer.getById(params.id)
        setPost(response.data)
    })
    const {fetching:fetchComment,isLoading:isComLoading,error: comError}=useFetching(async ()=>{
        const response=await PostServer.getCommentsByPostId(params.id)
        setComments(response.data)
    })
    useEffect(()=>{
        fetching()
        fetchComment()
    },[])
    return (
        <div>
            <h1>Вы открыли страницу c ID = {params.id}</h1>
            {isLoading
                ?<Loader/>
                :<div>{post.id}. {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
            ?<Loader/>
            :<div>
                {comments.map(comm=>
                    <div key={comm.id} style={{marginTop:15}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )}
            </div>
            }
        </div>
    );
};

export default PostIdPage;