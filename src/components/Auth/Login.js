import React from "react";
import {Grid,Form,Segment,Button,Header,Message,Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import firebase from "../../firebase";




class Login extends React.Component{
  state={
    email:"",
    password:"",
    errors:[],
    loading:false,
  };
  handleChange=event=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  };



  displayErros = errors => errors.map((error,i)=>
    <p key={i}>{error.message}
    </p>

  )



  handleSubmit = event =>{
    event.preventDefault();
    if(this.isFormValid(this.state)){
      this.setState({errors:[],loading:true});
      firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .then(signedInUser =>{
        console.log(signedInUser)
        
      })
      .catch(err =>{
        console.log(err);
        this.setState({
          errors:this.state.errors.concat(err),
          loading:false
        })
      })

    }

  }

  isFormValid =({email,password}) =>email && password ;


  render(){
    const {email,password
      ,errors,loading}=this.state;
    return(
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth:450 }}>
          <Header as="h3" icon color="grey" textAlign="center">
            <Icon name="code branch" color="blue" />
              Login
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>


              <Form.Input fluid name="email" icon="mail" iconPosition="left"
              placeholder="Enter Email" onChange={this.handleChange} type="email"
              value={email} />

              <Form.Input fluid name="password" icon="lock" iconPosition="left"
              placeholder="Enter Password" onChange={this.handleChange} type="password"
              value={password} />



              <Button disabled={loading}
              className={loading? "loading":""}
               color="black"
               fluid size="large">Submit</Button>

            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              {this.displayErros(errors)}
            </Message>
          )}

          <Message><Link to="/register">Don't have an account?Create Now  </Link> </Message>

        </Grid.Column>
      </Grid>
    )
  }
}
export default Login
