import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async( e ) => {
        e.preventDefault();


        try {
            setError( '' );
            setLoading( true );
            await login( email, password );
            navigate( '/' );
        } catch( err ) {
            console.log( err );
            setLoading( false );
            setError( 'Failed to login!' );
        }
    }

    return (
        <Form style={ { height: '330px' } } onSubmit={ handleSubmit }>
            <TextInput
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
                required
                value={ email }
                onChange={ ( e ) => setEmail( e.target.value ) }
            />

            <TextInput
                type="password"
                placeholder="Enter password"
                icon="lock"
                required
                value={ password }
                onChange={ ( e ) => setPassword( e.target.value ) }
            />

            <Button type={ 'submit' } disabled={ loading }>
                <span>Submit now</span>
            </Button>

            { error && <p className={ 'error' }>{ error }</p> }

            <div className="info">
                Don't have an account? <Link to={ '/signup' }>Signup</Link> instead.
            </div>
        </Form>
    );
};

export default LoginForm;