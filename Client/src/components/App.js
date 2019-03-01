import React, { Component } from 'react'
import './index.scss';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
//Components
import Header from './Header/Header';
import Home from './Layout/Home';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Car_Choose from './Layout/Car_Choose';
import Contact from './Contact/Contact';
import NotFound from './NotFound/NotFound';
import Car_Detail from './Car_details/Car_details';
const client = new ApolloClient({
    uri: 'http://localhost:8003/graphql'
})
class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/users/sign_in" component={Login} />
                            <Route exact path="/car-chooser/:brand/:model/:id" component={Car_Detail} />
                            <Route path="/car-chooser/:brand" component={Car_Choose} />
                            <Route path="/car-chooser" component={Car_Choose} />
                            <Route path="/used-cars" component={Car_Choose} />
                            <Route path="/contact" component={Contact} />
                            <Route exact path="/" component={Home} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                        <Footer />
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}
export default App;
