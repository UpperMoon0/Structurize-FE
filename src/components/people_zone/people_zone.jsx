import React, { useEffect, useState } from 'react';
import Header from '../header';
import SearchBar from './search_bar';
import CreatePost from './create_post';
import Posts from './posts';

import './css/people-zone.css'

function PeopleZone() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/posts/all')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
      <div className="people-zone">
        <Header />
        <SearchBar />
        <CreatePost />
        <Posts posts={posts} />
      </div>
    </>
  )
}

export default PeopleZone;