import React from "react"
import { Route } from "react-router-dom"



import { FriendList } from "./friends/FriendList"

import { ArticleEditForm } from "./articles/articleEditForm"
import { ArticleForm } from "./articles/articleForm"
import { ArticleList } from "./articles/articleList"

import { TaskList } from "./tasks/taskList"
import { TaskForm } from "./tasks/taskForm"

import { EventList } from "./events/eventList"
import { EventForm } from "./events/eventForm"
import { EventEditForm } from "./events/eventEditForm"



export const ApplicationViews = () => {
  return (
    <>

<Route exact path="/">
        {/* Render the component for news articles */}

        <ArticleList />
      </Route>
      <Route path="/articles/create">
        <ArticleForm />
       main
      </Route>
      <Route path="/articles/:articleId(\d+)/edit">
        <ArticleEditForm />
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
        <h2>Tasks</h2>
                <section>
                    <TaskList />
                </section>
      </Route>
      <Route path="/tasks/create">
        <TaskForm />
      </Route>
      <Route path="/events">
        {/* Render the component for the user's events */}
        <EventList />
      </Route>
      <Route path="/events/create">
        <EventForm />
      </Route>
      <Route path="/events/:eventId(\d+)/edit">
        <EventEditForm />
      </Route>
    </>
  )
}
