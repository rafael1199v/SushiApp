import { useEffect, useState } from "react";
import { useLayout } from "../../context/LayoutContext";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import blogAPI from "../../services/Api/BlogAPI";
import BlogCard from "../../components/blogCard/BlogCard";
import { useAuthContext } from "../../context/AuthContext";
import BlogList from "../../services/BlogList";
import { useNavigate } from "react-router-dom";

import "./blogPage.css";

function Blog() {
  const { updateLayout } = useLayout();
  const [blogs, setBlogs] = useState([]);
  const { token, userId } = useAuthContext();
  const [showStars, setShowStars] = useState(false);
  const navigate = useNavigate();

  const getBlogs = async() => {
    const data = await blogAPI.getAllBlogs();
    BlogList.instance.setBlogs(data);
    setBlogs(data);
  }

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.BLOG_PAGE);
    getBlogs();

    if(token)
      setShowStars(true);
  }, []);

  const filterFavoriteBlogs = () => {
    const favoriteBlogs = BlogList.instance.getFavorites();
    setBlogs(favoriteBlogs);
    setShowStars(true);
  }

  const filterOwnBlogs = () => {
    const ownBlogs = BlogList.instance.getMyArticles(userId);
    setBlogs(ownBlogs);
    setShowStars(false);
  }

  const filterAllBlogs = () => {
    const allBlogs = BlogList.instance.blogs;
    setBlogs(allBlogs);
    setShowStars(true);
  }

  const handleToggleFavorite = (blogId) => {
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog.id === blogId ? {...blog, favorite: !blog.favorite}
        : blog
      )
    );
  }

  return (
    <section className="blog-page">
      <div className="blog-page__title">
        <div className="blog-page__logo">
          <img
            src="/assets/img/diamondIcon.svg"
            className="blog-page__logo-diamond"
          />
          <div className="blog-page__logo-line"></div>
        </div>

        <h1 className="blog-page__title-content">
          Behind the scenes & latest news
        </h1>

        <div className="blog-page__logo">
          <div className="blog-page__logo-line"></div>
          <img
            src="/assets/img/diamondIcon.svg"
            className="blog-page__logo-diamond"
          />
        </div>
      </div>

      { token && (
        <nav className="blog-page__nav">
          <a className="blog-page__nav-item" tabIndex="1" id="news" onClick={filterAllBlogs}>
            All news
          </a>

          <a className="blog-page__nav-item" tabIndex="2" id="favorites" onClick={filterFavoriteBlogs}>
            Favorites
          </a>

          <a className="blog-page__nav-item" tabIndex="3" id="articles" onClick={filterOwnBlogs}>
            My articles
          </a>
        </nav>
      )}
      

      <div className="blog-page__blogs">
        {blogs.map(blog => (

          <div className="blog-page__card--clickeable" key={blog.id}>
            <BlogCard 
            id={blog.id}
            title={blog.title}
            description={blog.description}
            date={blog.date}
            img={blog.imageUrl}
            authorName={blog.users.name}
            favorite={blog.favorite}
            showStar={showStars}
            onClickCard={() => navigate(`/blog/${blog.id}`)}
            onClickFavorite={() => {
              console.log("Favorito o no xd?", blog.id)
              handleToggleFavorite(blog.id);
            }}
          />
          </div>
          
        )) }

      </div>
    </section>
  );
}

export default Blog;
