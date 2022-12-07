
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
import {useObserver} from "../Nooks/useObserver";
import MySelect from "../components/UI/Select/MySelect";

function Posts() {
    const [posts, setPosts]=useState([])
    const [filter, setFilter]=useState({sort:'',query:''})
    const [modal, setModal]=useState(false)
    const [totalPages,setTotalPages]=useState(0)
    const [limit,setLimit]=useState(10)
    const [page,setPage]=useState(1)
    const sortedAndSearchedPosts=usePosts(posts, filter.sort, filter.query)
    const lastElement=useRef()



    const {fetching:fetchPosts,isLoading:isPostsLoading,error: postError}=useFetching( async()=> {
        const responce = await PostServer.getAll(limit, page);
        setPosts([...posts,...responce.data]);
        const totalCount= responce.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement,isPostsLoading,()=>{setPage(page + 1)},page<totalPages)

    useEffect(()=>{
        fetchPosts(limit,page)
    },[page,limit])


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
            <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
            <MyButton style={{marginTop:'30px'}} onClick={()=>{setModal(true)}}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin:'15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect value={limit}
                      onChange={value=>setLimit(value)}
                      defaultValue="Кол-во элементов на странице"
                      options={[
                          {value:5, name:'Кол-во 5'},
                          {value:10, name:'Кол-во 10'},
                          {value:25, name:'Кол-во 25'},
                          {value:-1, name:'Показать все'}
                      ]}/>
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
            <div ref={lastElement} style={{height: 20, background:'red'}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>

        </div>
    );
}

export default Posts;
