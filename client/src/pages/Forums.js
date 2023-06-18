import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Post from "../components/Post";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import CreateDiscussionButton from "../components/buttons/CreateDiscussionButton";
import CreatePost from "../components/CreatePost";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../index.scss";

function Forums() {
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

 
function hideCreateForm() {
  setShowCreateMenu(!showCreateMenu);
}

function handleNewPost(newPost) {
  const [postid, title, content, date, username, pfp] = newPost;
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
      replies={[]} 
    />
  );
  setNewPostComponent(prevState => [...prevState, newPostComponent]);
}

const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="d-flex align-items-center" style={{justifyContent: 'Center'}}>
          <div className="searchAndradio"> 
                <Form>
                  <Form.Group>
                      <Form.Control size="lg" type="input" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--quaternary-color)'}} placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                  </Form.Group>                
                </Form>
            </div>
            <CreateDiscussionButton showCreateMenu={showCreateMenu} handlePress={hideCreateForm} />
            </div>
            {showCreateMenu && ( <CreatePost onNewPost={handleNewPost} hideCreateForm={hideCreateForm} appid={appid}/>)}

          <div className="card-container">
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
                  replies={post.replies}
                />
              ))}
            </Row>
          </div> 
          {posts.length === 0 && <h1 className="text-center" style={{marginTop: '8%'}}>No posts under this game, press the + to be the first!</h1>}
    </>
  );
}
export default Forums;
