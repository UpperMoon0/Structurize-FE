import React from 'react';
import Header from '../header';
import SearchBar from './search_bar';
import CreatePost from './create_post';
import Posts from './posts';

import './css/people-zone.css'

function PeopleZone() {
  // You would typically fetch this data from an API
  const posts = [
    { author: 'Author1', title: 'Title1', content: 'Content1', date: 'Date1' },
    { author: 'Author2', title: 'Title2', content: 'Content2', date: 'Date2' },
    // More posts...
  ];

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