import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register";
import {BrowserRouter as Router,Switch,Route, withRouter} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import firebase from "./firebase";
import {createStore} from "redux";
import {Provider,connect} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers";
import {setUser,clearUser} from "./actions"
import Spinner from "./Spinner";


const store=createStore(rootReducer,composeWithDevTools());

class Root extends React.Component{
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.props.setUser(user);
        this.props.history.push("/")
      }else{
        this.props.history.push('/login');
        this.props.clearUser();
      }

    }
  )
  }
  render(){
    return this.props.isLoading ? <Spinner /> : (

        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register} />

        </Switch>

    )
  }
}

const mapStateFromProps = state =>({
  isLoading:state.user.isLoading
})

const RootWithAuth=withRouter(
  connect(mapStateFromProps
    ,{setUser,clearUser}) (Root));


ReactDOM.render(
  <Provider store={store}>
    <Router>
        <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
