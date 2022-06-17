import React from "react";
class LessonContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    };
  }
  onBaseClick(e) {
    if (e.pageY !== this.state.top || e.pageX !== this.state.left)
      this.setState({
        top: e.pageY,
        left: e.pageX,
      });
  }
  render() {
    if (this.props.apiResponse !== null) {
      return (
        <>
          <h1 id="lesson-title">{this.props.apiResponse.lesson_title}</h1>
          <p id="text-content">{this.props.apiResponse.text_content}</p>

          <OnTopPic
            // ref={this.componentRef}
            apiResponse={this.props.apiResponse}
            top={this.state.top}
            left={this.state.left}
          />
          <div id="baseImg">
            <img
              onClick={(e) => {
                this.onBaseClick(e);
              }}
              id="base-pic"
              src={this.props.apiResponse.base_url}
              alt={this.props.apiResponse.base_alt}
            />
          </div>
        </>
      );
    }
  }
}

class OnTopPic extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
    this.state = {
      width: 0,
      height: 0,
    };
  }
  render() {
    return (
      <img
        ref={this.imgRef}
        style={{
          top: this.props.top - this.state.height / 3,
          left: this.props.left - this.state.width / 2,
        }}
        id="on-top-pic"
        src={this.props.apiResponse.on_top_url}
        alt={this.props.apiResponse.on_top_alt}
      />
    );
  }
  componentDidUpdate() {
    if (
      this.state.width !== this.imgRef.current.clientWidth ||
      this.state.height !== this.imgRef.current.clientHeight
    ) {
      this.setState({
        width: this.imgRef.current.clientWidth,
        height: this.imgRef.current.clientHeight,
      });
    }
  }
}

export class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
    };
    this.getApiData();
  }
  getApiData() {
    fetch("/api/v1/library/lesson/" + localStorage.getItem("lesson"))
      .then((response) => response.json())
      .then((data) => {
        this.setState({ apiResponse: data });
      });
  }
  render() {
    return (
      <div className="react">
        <LessonContent apiResponse={this.state.apiResponse} />
      </div>
    );
  }
}
