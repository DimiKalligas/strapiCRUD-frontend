export default ({ likes, description, url }) => {
    // console.log(likes, description, url);\

    const API_URL = 'https://strapi-crud.herokuapp.com'
    const formatImageUrl = (url) => `${API_URL}${url}`

    return (
        <div className="Post">
            <img className="Post_Image" src={formatImageUrl(url)} />
            <h4>{description}</h4>
            <div>
                <span>Likes: {likes}</span>
            </div>
        </div>
    )
}