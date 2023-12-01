/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import "../index.css";
import { useNavigate } from 'react-router-dom';
export default function UForum() {
  // quizzes ophalen van database

  const navigate = useNavigate();


  const getforum = [
    { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', content: 'You can install React from npm.' }
  ];

  const forum = getforum.map((post) =>
    <div key={post.id}>
      <button onClick={() => openPost(post.id)} className="postbanner"> {post.title} </button>
      <div id={post.id.toString()} className="postdescription">
        <p>{post.content}</p>

        <button onClick={() => navigateToPost(post.id)} className="Gotopostbutton">
          Make Post
        </button>
      </div>
    </div>
  );

  function openPost(id) {
    const x = document.getElementById(id) as HTMLElement;
    if (x.style.display == "block") {
      x.style.display = "none";
    }
    else {
      x.style.display = "block";
    }

  }
  // const Makepost = (e) => {
  //   navigate("/userSidebar/Forum/MakePost")
  // }

  function navigateToPost(id) {
    const route = "/userSidebar/Forum/" + { id };
    navigate("/userSidebar/Forum/1");
  }

  return (
    <div>
      <h1>Forum</h1>
      <div className="titel">
        <h1> Post</h1>
      </div>
      <div className="forum">
        {forum}
      </div>

      <button className="Gotopostbutton">Delete a post</button>
      {/* <button className="Gotopostbutton" onClick={Makepost} >Add a post</button> */}
    </div>
  )
}
