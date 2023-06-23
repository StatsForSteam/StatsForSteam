import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Post from "../components/Post";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import CreateDiscussionButton from "../components/buttons/CreateDiscussionButton";
import CreatePost from "../components/CreatePost";
import "../index.scss";
import {Dropdown, DropdownButton, Col, Row, Form, Container} from 'react-bootstrap';

function Forums() {

  //Needed for creating posts, tag dropdowns, and posts themselves. If adding/modifying/removing tags update this object and the db accordingly.
  //The scss files in Index.scss, CreatePost.scss, and Post.scss will also need to be updated with the new tag colors.
  const tags = [
    { id: 1, name: 'None', color: 'id1' },
    { id: 2, name: 'Achievement Help',color: 'id2' },
    { id: 3, name: 'Looking For Group', color: 'id3' },
    { id: 4, name: 'General Discussion', color: 'id4' },
  ];  

  const { state: { props: { appid, name, header, playtime, lastplayed,hasAchievements, postCount } } } = useLocation();
  const [achievedLen , setAchievedLen] = useState(),
        [notachievedLen , setnotAchievedLen] = useState(),
        [percentage, setPercentage] = useState(0),
        [playerCount, setPlayerCount] = useState(0),
        [dashBoardFetched, setDashBoardFetched] = useState(false),
        [postsFetched, setPostsFetched] = useState(false),
        [newPostComponent, setNewPostComponent] = useState([]),
        [searchTerm, setSearchTerm] = useState(""),
        [showCreateMenu, setShowCreateMenu] = useState(false),
        [tag, setTag] = useState(tags[0]),
        [posts, setPosts] = useState([]);
          
      
        useEffect(() => {
          if (hasAchievements) {
            fetch('http://127.0.0.1:8000/api/getDashboard', {
              method: "POST",
              body: JSON.stringify({ appid, hasAchievements }),
              headers: { "content-type": "application/json" },
              credentials: 'include',
            }).then(response =>
              response.json().then(({achievedlength, notachievedlength, achievementPercentage, playerCount }) => {
                setAchievedLen(achievedlength);
                setnotAchievedLen(notachievedlength);
                setPercentage(achievementPercentage);
                setPlayerCount(playerCount);
                setDashBoardFetched(true);
              })
            );
          } else {
            fetch('http://127.0.0.1:8000/api/getDashboard', {
              method: "POST",
              body: JSON.stringify({ appid, hasAchievements }),
              headers: { "content-type": "application/json" },
              credentials: 'include',
            }).then(response =>
              response.json().then(({ playerCount }) => {
                setPlayerCount(playerCount);
                setDashBoardFetched(true);
              })
            );
          }
        }, []);

        useEffect(() => {
          fetch('http://127.0.0.1:8000/api/getPosts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ appid }),
            credentials: 'include',
          })
            .then(response => response.json())
            .then(data => {
              setPosts(data);
              setPostsFetched(true);
            })
        }, []);

    
        

      if (!postsFetched || !dashBoardFetched) {
        return (
          <Loading/>
        );
      }

//Handle the dropdown menu changing names and colors
const handleTagSelect = (event) => {
  const selectedTagName = event.target.textContent;
  const selectedTag = tags.find(tag => tag.name === selectedTagName);
  setTag(selectedTag);
};
    
function hideCreateForm() {
  setShowCreateMenu(!showCreateMenu);
  setSearchTerm("");
  setTag(tags[0]);
}

function handleNewPost(newPost) {
  const [postid, title, content, date, username, pfp, tagid] = newPost;
  const newPostComponent = (
    <Post
      key={postid}
      postid={postid}
      title={title}
      content={content}
      username={username}
      pfp={pfp}
      date={date}
      votes={0} 
      ExistingVoteType={'none'} 
      numReplies={0} 
      isCreator={true}
      tagid={tagid}
      tags={tags}
      replies={[]} 
    />
  );
  setNewPostComponent(prevState => [...prevState, newPostComponent]);
}

const filteredPosts = posts.filter((post) => {
  const isMatchingSearchTerm = post.title.toLowerCase().includes(searchTerm.toLowerCase());
  const isMatchingTag = tag.id === 1 || post.tagid === tag.id; 
  return isMatchingSearchTerm && isMatchingTag;
});


  return (
    <>
     <Dashboard
            percentage={percentage}
            achievedLen={achievedLen}
            notachievedLen={notachievedLen}
            name={name}
            playtime={playtime}
            playerCount={playerCount}
            lastplayed={lastplayed}
            header={header}
            appid={appid}
            hasAchievements={hasAchievements}
            postCount={postCount}
          />


  <Row   className="justify-content-center">
    <Col lg={5} md={5} xs={9} sm={9}>
      
      {!showCreateMenu && (
        <Form>
          <Form.Group>
            <Form.Control
              size="lg"
              type="input"
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--quaternary-color)',
              }}
              placeholder="Search"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
          </Form.Group>
        </Form>
      )}

      {!showCreateMenu && (
        <DropdownButton
        style={{marginTop: '1px'}}
          drop="down-centered"
          title={`Filter Posts By: ${tag.name}`}
          className={`tag-dropdown ${tag.color}`}
        >
          {tags.map(tagItem => (
            <Dropdown.Item
              key={tagItem.id}
              type="button"
              onClick={handleTagSelect}
            >
              {tagItem.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}
    </Col>
    <Col lg={1} md={1} xs={2} sm={2}>
      <CreateDiscussionButton
        showCreateMenu={showCreateMenu}
        handlePress={hideCreateForm}
      />
    </Col>
  </Row>
      {showCreateMenu && ( <CreatePost tags={tags} onNewPost={handleNewPost} hideCreateForm={hideCreateForm} appid={appid}/>)}

      {!showCreateMenu && <div className="card-container">
            <Row xs={1} md={1} lg={1} className="g-4">
              {newPostComponent}
              {filteredPosts.map((post) => (
                <Post
                  key={post.postid}
                  postid={post.postid}
                  title={post.title}
                  content={post.content}
                  username={post.username}
                  pfp={post.pfp}
                  date={post.date}
                  votes={post.votes}
                  ExistingVoteType={post.existing_vote_type}
                  numReplies={post.replies.length}
                  isCreator={post.is_creator}
                  tagid={post.tagid}
                  tags={tags}
                  replies={post.replies}
                />
              ))}
            </Row>
          </div> }
          {posts.length === 0 && <h1 className="text-center" style={{marginTop: '3%'}}>No posts under this game, press the + to be the first!</h1>}
    </>
  );
}
export default Forums;
