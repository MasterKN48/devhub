import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../profiles/Spinner.svg';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import {getPosts} from '../../actions/postAction';
class Post extends Component {

    componentDidMount(){
        this.props.getPosts();
    }
  render() {
      const {posts,loading}=this.props.post;
      let postContent;
      if(posts === null || loading){
          postContent=<img src={Spinner} alt="spinner" style={{width:'100px',margin:'auto',display:'block'}} />
      }else{
          postContent=<PostFeed posts={posts} />;
      }
    return (
     <div className='feed'>
       <div className="container">
           <PostForm />
           {postContent}
       </div>
     </div>
    );
  }
}
Post.propTypes={
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}
const mapStateToProps=state=>({
    post:state.post
})
export default connect(mapStateToProps,{getPosts})(Post);