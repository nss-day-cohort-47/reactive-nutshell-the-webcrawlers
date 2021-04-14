import React from "react"
import { Route } from "react-router-dom"

import { FriendCard } from "./friends/FriendCard"
import { FriendList } from "./friends/FriendList"

export const ApplicationViews = () => {
  return (
    <>

<Route exact path="/">
        {/* Render the component for news articles */}
       
      </Route>
      <Route path="/friends">
      </Route>


      <Route exact path="/">
        {/* Render the component for news articles */}
      </Route>
      <Route exact path="/friends">
        {/* Render the component for list of friends */} 
        <FriendList />
      </Route>



      







      <Route path="/messages">
        {/* Render the component for the messages */}
      </Route>
      <Route path="/tasks">
        {/* Render the component for the user's tasks */}
      </Route>
      <Route path="/events">
        {/* Render the component for the user's events */}
      </Route>
    </>
  )
}
