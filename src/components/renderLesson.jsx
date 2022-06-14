import React from "react";
class LessonContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      left: 0,
    };
  }
  // onBaseClick(e) {
  //   if (e.pageY !== this.state.top || e.pageX !== this.state.left)
  //     this.setState({
  //       top: e.pageY,
  //       left: e.pageX,
  //     });
  // }
  render() {
    <>
      <h1 id="lesson-title">{this.props.apiResponse.lesson_title}</h1>
      <p id="text-content">{this.props.apiResponse.text_content}</p>

      <onTopPic
        apiResponse={this.props.apiResponse}
        top={this.state.top}
        left={this.state.left}
      />
      <div id="baseImg">
        <img
          // onClick={(e) => {
          //   this.onBaseClick(e);
          // }}
          id="base-pic"
          src={this.props.apiResponse.base_url}
          alt={this.props.apiResponse.base_alt}
        />
      </div>
    </>;
  }
}

class onTopPic extends React.Component {
  render() {
    return (
      <img
        // style={`top = ${this.props.top} - height / 3px; left = ${this.props.left} - width / 2px;`}
        id="on-top-pic"
        src={this.props.apiResponse.on_top_url}
        alt={this.props.apiResponse.on_top_alt}
      />
    );
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
    console.log("i work!!!!");
    fetch("/api/v1/library/lesson/" + localStorage.getItem("lesson"))
      .then((response) => response.json())
      .then((data) => {
        this.setState({ apiResponse: data });
        console.log("HELLLLLLLLLOOOOOOOOOO");
      });
  }
  render() {
    <LessonContent apiResponse={this.state.apiResponse} />;
  }
}
