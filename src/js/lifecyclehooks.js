/**
 * Previously we have 1 component for the Board & 1 for the comments for Edit/Save/Delete
 * Now this has been divided to have the different components and also for the purpose of the
 * Life-cycle hooks demonstration.
 *
 * Idea is to solve the issue of putting selection / focus of the full text when the text area
 * is being rendered and after comment is being saved do any cleanup if you would like to.
 *
 */
const SCROLLBAR_CLS = "scrollbar";
const COMMENT_CLS = "comment";
const COMMENTS_COUNT_FOR_SCROLL = 10;

/**
 * When we have to render the comment normally
 */
var DisplayComment = React.createClass({
  /**
   * Deleting a comment using the id props passed
   * @param {*} event
   */
  deleteComment: function (event) {
    this.props.deleteComment(this.props.id);
  },
  /**
   * Render method for the display comment component.
   */
  render: function () {
    return (
      <div className="comment-box">
        <span className="comment-text">{this.props.children}</span>
        <button
          className="button-primary"
          onClick={(e) => this.props.onEditComment()}
        >
          edit
        </button>
        <button className="button-delete" onClick={this.deleteComment}>
          delete
        </button>
      </div>
    );
  },
});

/**
 * When we have to render the edit normally
 */
var EditComment = React.createClass({
  /**
   * After the text-box is rendered we have to do the operations such that selected / focus
   * is being set.
   */
  componentDidMount: function () {
    // console.log(`Edit component mounted.`);
    // console.log(ReactDOM.findDOMNode(this.refs.commentText));
    ReactDOM.findDOMNode(this.refs.commentText).select();
    // ReactDOM.findDOMNode(this.refs.commentText).focus();
  },

  /**
   * This will triggered only when Text box is unmounted or save is being clicked.
   */
  componentWillUnmount: function () {
    console.log(`Edit component un-mounted.`);
  },

  /**
   * Rendering the Form for editing the comment
   */
  render: function () {
    return (
      <div className="comment-box" style={{ alignItems: "center" }}>
        <textarea
          style={{ width: "80%" }}
          ref="commentText"
          defaultValue={this.props.children}
        ></textarea>
        <button
          className="button-save"
          onClick={() =>
            this.props.onSaveComment(this.refs.commentText.value, this.props.id)
          }
        >
          save
        </button>
      </div>
    );
  },
});

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
  handleSaveComment: function (value, id) {
    if (value == "") {
      alert("Please enter text to save");
      return false;
    }
    this.props.saveComment(value, id);
    this.setState({ editMode: false });
  },

  /**
   * Editing the comment
   * @param {*} event
   */
  handleEditComment: function (event) {
    this.setState({ editMode: true });
  },
  /**
   * comment rendering method
   */
  render: function () {
    return this.state.editMode ? (
      <EditComment {...this.props} onSaveComment={this.handleSaveComment} />
    ) : (
      <DisplayComment {...this.props} onEditComment={this.handleEditComment} />
    );
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
      // console.log(this.refs.commentBoxContainer);
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
