import React, { useState, useEffect, useContext } from 'react'
import Post from '../components/Post'
import { UserContext } from '../context/UserContext'
import { LikesContext } from '../context/LikesContext'

const SinglePost = ({ match, history }) => {
    const [post, setPost] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [edit, setEdit] = useState(false)
    const [description, setDescription] = useState('')
    const { user, setUser } = useContext(UserContext)
    const { likesGiven, reloader } = useContext(LikesContext)

    const { id } = match.params

    // this variable tells us if we like this post or not
    const isPostAlreadyLiked = (() => {
        return likesGiven && likesGiven.find(like => like.post && like.post.id == id)
    })()


    console.log('user', user);
    console.log('isPostAlreadyLiked:', isPostAlreadyLiked)
    // console.log('setUser', setUser);

    const fetchPost = async () => {
        try {
            const response = await fetch(`https://strapi-crud.herokuapp.com/posts/${id}`)
            const data = await response.json()

            console.log("data", data)
            setPost(data)
            setDescription(data.description)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("404 - not found")
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://strapi-crud.herokuapp.com/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
            const data = await response.json()
            history.push('/')

        } catch (error) {
            console.log('error in delete:', error)
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        console.log('in handleEditSubmit');
        try {
            const response = await fetch(`https://strapi-crud.herokuapp.com/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: JSON.stringify({
                    description
                })
            })
            const data = await response.json()
            fetchPost()
            console.log("handleEditSubmit data", data);
        } catch (error) {
            console.log('error:', error);
        }
    }

    const handleLike = async () => {
        try {
            const response = await fetch('https://strapi-crud.herokuapp.com/likes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post: parseInt(id)
                })
            })
            fetchPost()
            reloader()
        } catch (err) {
            console.log("Exception ", err)
        }
    }

    const handleRemoveLike = async () => {
        try {
            const response = await fetch(`https://strapi-crud.herokuapp.com/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                }
            })
            fetchPost()
            reloader()
        } catch (err) {
            console.log("Exception ", err)
        }
    }

    return (
        <div className='Post piokatw'>
            {loading && <p>Loading...</p>}
            {!loading &&
                <>
                    {/* only display it after you fetch it */}
                    {post.id &&
                        <>
                            <Post
                                likes={post.likes}
                                description={post.description}
                                url={post.image && post.image.url}
                            />

                            {user &&
                                <>
                                    {isPostAlreadyLiked &&
                                        <button onClick={handleRemoveLike}>Remove Like</button>
                                    }

                                    {!isPostAlreadyLiked &&
                                        <button onClick={handleLike}>Like</button>
                                    }
                                </>
                            }
                            {user && user.user && post && post.author && post.author.id === user.user.id &&
                                <>
                                    <button onClick={handleDelete}>Delete this post</button>
                                    <button onClick={() => setEdit(true)}>Edit this post</button>
                                    {edit &&
                                        <form onSubmit={handleEditSubmit}>
                                            <input
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder='New Description'
                                            />
                                            <button>Confirm</button>
                                        </form>
                                    }
                                </>
                            }
                        </>
                    }
                    {/* {!post.id && <p>404 - not found</p>} */}
                </>
            }
            {error && <p>{error}</p>}
        </div>
    )
}

// Mits version
export default SinglePost
