import React from "react";
import { Link } from "react-router-dom";
function wordFormatter(string) {
  let returnArr = [];
  let fullStringArr = string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .split(" ");
  for (let i = 0; i < fullStringArr.length; i++) {
    if (!returnArr.includes(fullStringArr[i])) {
      returnArr.push(fullStringArr[i]);
    }
  }
  return returnArr;
}

function doesArrInclude(word, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].includes(word)) {
      return true;
    }
  }
}
function pushingCards(arr, data) {
  arr.push(
    <div>
      <Card lessonData={data} />
    </div>
  );
}

function sortMaybe(objectArr) {
  let values = [];
  if (objectArr.length <= 0) {
    return values;
  }
  objectArr.sort(function (a, b) {
    return b.number - a.number;
  });
  for (let i = 0; i < objectArr.length; i++) {
    if (objectArr[i].number !== 0) {
      values.push(objectArr[i].lessonNumber);
    }
  }
  return values;
}

class LessonCards extends React.Component {
  render() {
    let lessonArr = [];
    let lessonFrequency = [];
    if (this.props.lessonData !== null) {
      for (let i = 0; i < this.props.lessonData.length; i++) {
        var lessonContentArr = wordFormatter(
          this.props.lessonData[i].text_content
        );
        var numberOfMatches = 0;
        if (this.props.userSearch === null) {
          lessonFrequency.push({ lessonNumber: i, number: 1 });
        } else {
          for (let j = 0; j < this.props.userSearch.length; j++) {
            if (doesArrInclude(this.props.userSearch[j], lessonContentArr)) {
              numberOfMatches += 1;
            }
          }
          lessonFrequency.push({ lessonNumber: i, number: numberOfMatches });
        }
      }

      let orderedArr = sortMaybe(lessonFrequency);
      if (orderedArr.length === 0) {
        return (
          <div className="noMatchesBanner">
            <h1>We could not find any lessons that match your search!</h1>
          </div>
        );
      } else {
        for (let l = 0; l < orderedArr.length; l++) {
          pushingCards(lessonArr, this.props.lessonData[orderedArr[l]]);
        }
        return lessonArr;
      }
    }
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
    };
  }
  lessonClick() {
    const beenClicked = this.state.isDropdownOpen == true ? false : true;
    this.setState({ isDropdownOpen: beenClicked });
  }
  render() {
    return (
      <div className="lesson">
        <button
          type="button"
          className="icon"
          onClick={() => this.lessonClick()}
        >
          <div className="card">
            <img
              src={this.props.lessonData.image}
              alt={this.props.lessonData.alt_text}
              className="img"
            />
          </div>
        </button>
        {(this.state.isDropdownOpen && (
          <div className="content">
            <ol>
              <li className="noListDeco">
                <p>{this.props.lessonData.text_content}</p>
              </li>
              <li className="noListDeco">
                <div className="classification">
                  <p>{this.props.lessonData.classification}</p>
                </div>
              </li>
            </ol>
            <LessonButton url={this.props.lessonData.url} />
          </div>
        )) || (
          <div className="overlay">{this.props.lessonData.lesson_title}</div>
        )}
      </div>
    );
  }
}

class LessonButton extends React.Component {
  savingUrl() {
    localStorage.setItem("lesson", this.props.url);
  }
  render() {
    // if (sessionStorage.length >= 1) {
    return (
      <Link
        className="goToLesson"
        onClick={() => this.savingUrl()}
        to={`/lesson/${this.props.url}`}
      >
        go to lesson
      </Link>
    );
    // } else {
    //   return (
    //     <Link className="goToLesson" to="/profile">
    //       go to lesson
    //     </Link>
    //   );
    // }
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="newHeading">
        <div className="heading">
          <h1>Stile Lessons</h1>
        </div>
        <Search onClick={this.props.onClick} />
      </div>
    );
  }
}

class Search extends React.Component {
  render() {
    return (
      <input
        id="mySearch"
        type="text"
        placeholder="Search..."
        name="search"
        onChange={this.props.onClick}
      />
    );
  }
}

export class Lessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      search: null,
    };
    this.getApiData();
  }
  getApiData() {
    fetch("/api/v1/library/cards")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ apiResponse: data });
      });
  }
  getUserInput(input) {
    let value = input.target.value;
    if (value) {
      let userInput = wordFormatter(value);
      this.setState({ search: userInput });
    }
  }
  render() {
    return (
      <div className="react">
        <Header onClick={(input) => this.getUserInput(input)} />
        <div className="lessons">
          <LessonCards
            lessonData={this.state.apiResponse}
            userSearch={this.state.search}
          />
        </div>
      </div>
    );
  }
}

//look at createRoot
