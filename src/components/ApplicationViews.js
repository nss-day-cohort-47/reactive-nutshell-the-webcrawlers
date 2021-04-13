import React from "react"
import { Route } from "react-router-dom"

import { ArticleForm } from "./articles/articleForm"
import { ArticleList } from "./articles/articleList"
import { TaskList } from "./tasks/taskList"
import { TaskForm } from "./tasks/taskForm"

export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
        {/* Render the component for news articles */}
        <ArticleList />
      </Route>
      <Route path="/articles/create">
        <ArticleForm />
      </Route>

      <Route path="/friends">
        {/* Render the component for list of friends */}
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
      </Route>
    </>
  )
}
