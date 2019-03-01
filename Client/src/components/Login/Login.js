import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { Button, Row, Col, Form as Btform } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import './Login.scss';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    sleep = (ms) => {
        new Promise(resolve => setTimeout(resolve, ms))
    }
    // function to execute on the subbmition of the form
    showResults = async values => {
        await this.sleep(50000);
        window.alert(JSON.stringify(values, undefined, 2));
    }
    required = values => (values ? undefined : 'Required');
    render() {
        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            // this.signup(response, 'google');
        }
        return (
            <Row>
                <Col xs={{ span: 10, offset: 1 }} sm={{ span: 10, offset: 1 }} md={{ span: 4, offset: 4 }}>
                    <div className="login_container">
                        <div className="login_form">
                            <h1>Login to your account</h1>
                            {/* final-form code */}
                            <Form onSubmit={this.showResults}>
                                {({ handleSubmit, values, submitting }) =>
                                    <form className='form-container' onSubmit={handleSubmit}>
                                        <GoogleLogin
                                            className='btn_google btn btn-primary'
                                            clientId="145953429991-eeiugdr5dpvvehd8s2jglniahkouq8aa.apps.googleusercontent.com"
                                            buttonText="Login with Google"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle} />
                                        <div className="login-buttons-divider">
                                            <div className="login-divider-or login-divider-or--white">
                                                or
                                            </div>
                                        </div>
                                        <Field
                                            name='email'
                                            label='Email'
                                            type='email'
                                            validate={this.required}
                                            placeholder='Enter Email'
                                        >{({ input, meta, placeholder, label, type }) =>
                                            <Btform.Group>
                                                <Btform.Label>{label}</Btform.Label>
                                                <Btform.Control  {...input} type={type} className={(meta.active ? 'active' : '') && (meta.invalid && meta.touched ? 'input invalid' : 'input')} placeholder={placeholder} />
                                                {meta.error && meta.touched ? <span>{meta.error}</span> : ''}
                                            </Btform.Group>
                                            }</Field>
                                        <Field
                                            name='password'
                                            label='Password'
                                            validate={this.required}
                                            type='password'
                                            placeholder='Enter Password'
                                        >{({ input, meta, placeholder, type, label }) =>
                                            <Btform.Group>
                                                <Btform.Label>{label}</Btform.Label>
                                                <Btform.Control  {...input} type={type} className={(meta.active ? 'active' : '') && (meta.invalid && meta.touched ? 'input invalid' : 'input')} placeholder={placeholder} />
                                                {meta.error && meta.touched ? <span>{meta.error}</span> : ''}
                                            </Btform.Group>
                                            }</Field>
                                        <Row className='mt-4'>
                                            <Col>
                                                <Btform.Group>
                                                    <Btform.Check type="checkbox" label="Remember Me" />
                                                </Btform.Group>
                                            </Col>
                                            <Col>
                                                <Btform.Group>
                                                    <Btform.Label>{`Forget Password`}</Btform.Label>
                                                </Btform.Group>
                                            </Col>
                                        </Row>
                                        <Button disabled={submitting} variant="outline-success" type="submit">
                                            Submit
                                        </Button>
                                    </form>}
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default Login;