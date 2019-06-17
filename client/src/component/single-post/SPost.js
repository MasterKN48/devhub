import React, { Component } from "react"; 
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../profiles/Spinner.gif';
import PostItem from '../post/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import {getPost} from '../../actions/postAction';
class SPost extends Component {
componentDidMount(){
  this.props.getPost(this.props.match.params.id);
}
  render() {
    const {post,loading}=this.props.post;
    let postContent;
    if(post === null || loading || Object.keys(post).length ===0){
      postContent= <img src={Spinner} style={{heigth:'100px',width:'100px'}} alt="spin"/>
    }else{
      postContent=(
        <div>
          <PostItem post={post} showActions={false}/>
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments}/>
        </div>
      )
    }
    return (
     <div className='post'>
       <div className="container">
         <div className="row">
           <div className="col-md-12">
             <Link to='/post' className='btn btn-light mb-3' >
                Back to posts
             </Link>
             {postContent}
           </div>
         </div>
       </div>
     </div>
    );
  }
}
SPost.propTypes={
  getPost:PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  post:state.post
})

export default connect(mapStateToProps,{getPost})(SPost);