import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Post from "../components/Post";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import CreateDiscussionButton from "../components/buttons/CreateDiscussionButton";
import CreatePost from "../components/CreatePost";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
function Forums() {
    const { state: { props: { appid, name, header, playtime, lastplayed,hasAchievements } } } = useLocation();
    const [achievedLen , setAchievedLen] = useState(),
          [notachievedLen , setnotAchievedLen] = useState(),
          [percentage, setPercentage] = useState(0),
          [playerCount, setPlayerCount] = useState(0),
          [dataFetched, setDataFetched] = useState(false);
        
         const [searchTerm, setSearchTerm] = useState("");
         const [showPosts, setShowPosts] = useState(true);
          const [showCreateMenu, setShowCreateMenu] = useState(false);
          const [posts, setPosts] = useState([]);
        useEffect(() => {
          if (hasAchievements) {
            fetch('/getDashboard', {
              method: "POST",
              body: JSON.stringify({ appid, hasAchievements }),
              headers: { "content-type": "application/json" },
            }).then(response =>
              response.json().then(({achievedlength, notachievedlength, achievementPercentage, playerCount }) => {
                setAchievedLen(achievedlength);
                setnotAchievedLen(notachievedlength);
                setPercentage(achievementPercentage);
                setPlayerCount(playerCount);
                setDataFetched(true);
              })
            );
          } else {
            fetch('/getDashboard', {
              method: "POST",
              body: JSON.stringify({ appid, hasAchievements }),
              headers: { "content-type": "application/json" },
            }).then(response =>
              response.json().then(({ playerCount }) => {
                setPlayerCount(playerCount);
                setDataFetched(true);
              })
            );
          }
        }, []);

        useEffect(() => {
          fetch('/getPosts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ appid })
          })
            .then(response => response.json())
            .then(data => {
              // Handle the fetched data here
              console.log(data);
              setPosts(data);
            })
            .catch(error => {
              // Handle any errors that occur during the fetch
              console.error(error);
            });
        }, []);

    
        

        if (!dataFetched) {
          return (
            <Loading/>
          );
        }

 
function hidePosts() {
  setShowPosts(!showPosts);
  setShowCreateMenu(!showCreateMenu);
}

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
            hasAchievements={hasAchievements}
          />
          <div className="searchAndradio"> 
                <Form>
                  <Form.Group>
                      <Form.Control size="lg" type="input" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--quaternary-color)'}} placeholder="Search" value={searchTerm} onChange={event => setSearchTerm(event.target.value)}/>
                  </Form.Group>                
                </Form>

                <CreateDiscussionButton handlePress={hidePosts} />
            </div>
   {showPosts && ( <div className = "card-container">
   <Row xs={1} md={1} lg={1} className="g-4">
   {posts.map(post => (
        <Post
          key={post.postid}
          title={post.title}
          content={post.content}
          username={post.username}
          pfp={post.pfp}
        />
      ))}
   </Row> </div> )}

    {showCreateMenu && ( <CreatePost hidePosts={hidePosts} appid={appid}/>)}
    </>
  );
}

export default Forums;

