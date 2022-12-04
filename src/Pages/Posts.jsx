
import React, {useEffect, useMemo, useRef, useState} from "react";
import PostServer from "../API/PostServer";
import {usePosts} from "../Nooks/usePosts";
import {useFetching} from "../Nooks/useFetching";
import {getPageCount} from "../components/Utils/pages";
import MyButton from "../components/UI/Button/MyButton";
import MyModal from "../components/UI/Modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/Pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";

function Posts() {
    const [posts, setPosts]=useState([])
    const [filter, setFilter]=useState({sort:'',query:''})
    const [modal, setModal]=useState(false)
    const [totalPages,setTotalPages]=useState(0)
    const [limit,setLimit]=useState(10)
    const [page,setPage]=useState(1)
    const sortedAndSearchedPosts=usePosts(posts, filter.sort, filter.query)



    const {fetching,isLoading:isPostsLoading,error: postError}=useFetching( async()=> {
        const responce = await PostServer.getAll(limit, page);
        setPosts(responce.data);
        const totalCount= responce.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useEffect(()=>{
        fetching()
    },[page])


    const createPost=(newPost)=>{
        setPosts([...posts,newPost])
        setModal(false)
    }
    const removePost=(post)=>{
        setPosts(posts.filter(p =>p.id !== post.id))
    }
    const changePage=(page)=>{
        setPage(page)
    }


    return (
        <div className="App">
            <MyButton onClick={fetching}>GET POSTS</MyButton>
            <MyButton style={{marginTop:'30px'}} onClick={()=>{setModal(true)}}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin:'15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Произошла ошибка ${postError}</h1>}
            {
                isPostsLoading
                    ? <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}><Loader/></div>
                    :<PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>

        </div>
    );
}

export default Posts;
