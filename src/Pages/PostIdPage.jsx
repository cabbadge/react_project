import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../Nooks/useFetching";
import Posts from "./Posts";
import PostServer from "../API/PostServer";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params= useParams()
    const [post,setPost]=useState({})
    const {fetching,isLoading:isLoading,error: postError}=useFetching(async ()=>{
        const response=await PostServer.getById(params.id)
        setPost(response.data)

    })
    useEffect(()=>{
        fetching()
    },[])
    return (
        <div>
            <h1>Вы открыли страницу c ID = {params.id}</h1>
            {isLoading
                ?<Loader/>
                :<div>{post.id}. {post.title}</div>
            }
        </div>
    );
};

export default PostIdPage;