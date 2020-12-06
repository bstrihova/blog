import './App.scss';
import React from "react";
import Header from "./Header"
import Login from "./Login"
import ArticleDetail from "./ArticleDetail"
import ArticleIndex from "./ArticleIndex"
import AdminArticleIndex from "./AdminArticleIndex"
import AdminArticleEdit from "./AdminArticleEdit"
import AdminArticleCreate from "./AdminArticleCreate"
import About from "./About"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
        <main>
          <Switch>
            <Route
                exact
                path="/"
                children={
                    <ArticleIndex />
                }
            />

            <Route path="/login" children={<Login />} />

            <Route path="/articles/:id" children={<ArticleDetail />} />

            <Route path="/admin/create" children={<AdminArticleCreate />} />

            <Route path="/admin/:id" children={<AdminArticleEdit />} />

            <Route path="/admin" children={<AdminArticleIndex />} />

            <Route path="/about" children={<About />} />

  

          </Switch>
        </main>
    </Router>
  
  
  )
}

export default App;
