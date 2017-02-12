import React, {Component} from 'react';
import axios from 'axios';
import PlaceInfo from './PlaceInfo';
import PostInfo from './PostInfo';
import SorryMessage from './SorryMessage';

class PlacePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            gotPlace: false,
            place: null,
            is_open_now: false,
            newComment: false,
            updateComments: true
        }
    }

  componentDidMount(){
    axios.defaults.baseURL = location.protocol + '//' + location.hostname + ':' + 3001;
    var arrUrl = window.location.href.split("/");
    var id =  arrUrl[arrUrl.length - 1];
    var thisComponent = this;
    axios.get("/getplace", {params:{id: id}}).then(function(place){
        console.log(place);
      place.data.jsonBody.hours[0].is_open_now ? thisComponent.setState({place: place.data, gotPlace: true, is_open_now: true}) : thisComponent.setState({place: place.data, gotPlace: true});
    });
  }

  leaveComment(){
    this.setState({newComment: true});
  }

  handleOnPostComment(){
    var thisComponent = this;
    var data;
    // var data = $(".feedback-form").serialize();
    data += "&id=" + this.state.place.jsonBody.id;
    axios.post('/leavecomment', data, function(response){
      thisComponent.setState({newComment: false, updateComments: false});
      thisComponent.setState({updateComments: true});
    });
  }
  // {rating: data.rating, comment: data.comment, id: this.state.place.jsonBody.id}

  render(){
    return (
      <div>
        {this.state.gotPlace && this.state.updateComments && <PlaceInfo isOpenNow={this.state.is_open_now} place={this.state.place.jsonBody} leaveComment={this.leaveComment.bind(this)}/>}  
        {(this.state.is_open_now && this.state.updateComments && <PostInfo place={this.state.place.jsonBody}/>) || <SorryMessage/>}          
      </div>
    );
  }
}

export default PlacePage;
/*<Header gotLocationData={true}/>
<div className="empty-div"></div>
<AdditionalNavigation/>
{this.state.newComment && <NewCommentForm place={this.state.place.jsonBody} handlePost={this.handleOnPostComment.bind(this)}/>}
*/