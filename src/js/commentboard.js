const SCROLLBAR_CLS = "scrollbar";
const COMMENT_CLS = "comment";
const COMMENTS_COUNT_FOR_SCROLL = 10;
/**
 * Comment component for the board
 */
var Comment = React.createClass({
  /**
   * Getting Initials state for the page
   */
  getInitialState: function () {
    return { editMode: false };
  },
  /**
   * saving the comment in the Array
   * @param {*} event
   */
  saveComment: function (event) {
    if (this.refs.commentText.value == "") {
      alert("Please enter text to save");
      return false;
    }
    this.props.saveComment(this.refs.commentText.value, this.props.id);
    this.setState({ editMode: false });
  },
  /**
   * Render the Form for taking the input of the User
   */
  renderForm: function () {
    return (
      <div className="comment-box" style={{ alignItems: "center" }}>
        <textarea
          style={{ width: "80%" }}
          ref="commentText"
          defaultValue={this.props.children}
        ></textarea>
        <button className="button-save" onClick={this.saveComment}>
          save
        </button>
      </div>
    );
  },
  /**
   * Editing the comment
   * @param {*} event
   */
  editComment: function (event) {
    this.setState({ editMode: true });
  },
  /**
   * Deleting a comment using the id props passed
   * @param {*} event
   */
  deleteComment: function (event) {
    this.props.deleteComment(this.props.id);
  },
  /**
   * generating comments from the comment array
   */
  renderComment: function () {
    return (
      <div className="comment-box">
        <span className="comment-text">{this.props.children}</span>
        <button className="button-primary" onClick={this.editComment}>
          edit
        </button>
        <button className="button-delete" onClick={this.deleteComment}>
          delete
        </button>
      </div>
    );
  },
  /**
   * comment rendering method
   */
  render: function () {
    return this.state.editMode ? this.renderForm() : this.renderComment();
  },
});
/**
 * Board component for the comments management.
 */
var Board = React.createClass({
  /**
   * Initially there are no comments on the board
   */
  getInitialState: function () {
    return { comments: [] };
  },
  /**
   * Adding comment on the board
   */
  addComment: function () {
    let comments = this.state.comments;
    // console.log(`adding comment...`);
    comments.push(`Comment Default text..`);
    this.setState({ comments: comments });
  },
  /**
   * Deleting the comment from the board
   * making this available to children via props.
   * @param {*} index
   */
  deleteComment: function (index) {
    let comments = this.state.comments;
    comments.splice(index, 1);
    this.setState({ comments: comments });
  },
  /**
   * editing comment at a particular index
   * @param {*} text
   * @param {*} index
   */
  saveComment: function (text, index) {
    let comments = this.state.comments;
    comments[index] = text;
    this.setState({ comments: comments });
  },
  /**
   * Rendering comment on the board
   */
  renderComments: function () {
    // console.log(this.state.comments);
    return this.state.comments.map((text, index) => {
      return (
        <Comment
          key={index}
          id={index}
          deleteComment={this.deleteComment}
          saveComment={this.saveComment}
        >
          ({index + 1}) {text}
        </Comment>
      );
    });
  },
  /**
   * Render the comment counter
   */
  renderCommentCounter: function () {
    let count = this.state.comments.length;
    return (
      count > 0 && (
        <span className="comment-count">Comment Count : {count}</span>
      )
    );
  },
  /**
   * When number of comments are greater than what can fit in the view-port
   * then we should put a scroll bar on the comments page.
   */
  addScrollbar() {
    if (window && typeof window == "object" && this.state.comments.length > 0) {
      console.log(this.refs.commentBoxContainer);
      if (this.state.comments.length > COMMENTS_COUNT_FOR_SCROLL) {
        return `${COMMENT_CLS} ${SCROLLBAR_CLS}`;
      }
    }
    return COMMENT_CLS;
  },
  /**
   * rendering the board
   */
  render: function () {
    return (
      <div>
        <button className="button-comment-add" onClick={this.addComment}>
          Add Comment
        </button>
        {this.renderCommentCounter()}
        <button
          className="button-comment-reset"
          disabled={this.state.comments.length == 0}
          onClick={() => this.setState({ comments: [] })}
        >
          reset
        </button>
        <div ref="commentBoxContainer" className={this.addScrollbar()}>
          {this.renderComments()}
        </div>
      </div>
    );
  },
});
/**
 * Showing multiple components created in the main parent.
 * Showing multiple components in the Dom using ReactDom.
 */
ReactDOM.render(<Board />, document.getElementById("example"));
