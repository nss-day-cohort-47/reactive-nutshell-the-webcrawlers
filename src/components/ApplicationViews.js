import React from "react"
import { Route } from "react-router-dom"

import { FriendList } from "./friends/friendList"
import { FriendForm } from "./friends/friendForm"

import {UserList} from "./users/userList"


import { ArticleEditForm } from "./articles/articleEditForm"
import { ArticleForm } from "./articles/articleForm"
import { ArticleList } from "./articles/articleList"

import { TaskList } from "./tasks/taskList"
import { TaskForm } from "./tasks/taskForm"
import { TaskEditForm } from "./tasks/taskEditForm"

import { EventList } from "./events/eventList"
import { EventForm } from "./events/eventForm"
import { EventEditForm } from "./events/eventEditForm"

import { MessageList } from "./messages/messageList"
import { MessageForm } from "./messages/messageForm"
import { MessageEditForm } from "./messages/messageEditForm"



export const ApplicationViews = () => {
  return (
    <>

      {/* Render the component for news articles */}
      <Route exact path="/">
        <ArticleList />
      </Route>
      <Route path="/articles/create">
        <ArticleForm />
      </Route>
      <Route path="/articles/:articleId(\d+)/edit">
        <ArticleEditForm />
      </Route>

      <Route exact path="/friends">
        {/* Render the component for list of friends */}
        <FriendList />
      </Route>


      <Route path="/friends/create">
        <FriendForm />
      </Route>

      <Route exact path="/users">
        {/* Render the component for list of friends */}
        <UserList />
      </Route>

      {/* Render the component for the messages */}
      <Route exact path="/messages">
        <MessageList />
      </Route>
      <Route path="/messages/create">
        <MessageForm />
      </Route>
      <Route path="/messages/:messageId(\d+)/edit">
        <MessageEditForm />
      </Route>




      <Route exact path="/tasks">
        {/* Render the component for the user's tasks */}
        <h2>Tasks</h2>
        <section>
          <TaskList />
        </section>
      </Route>
      <Route path="/tasks/create">
        <TaskForm />
      </Route>
      <Route path="/tasks/:taskId(\d+)/edit">
        <TaskEditForm />
      </Route>

      <Route exact path="/events">
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
