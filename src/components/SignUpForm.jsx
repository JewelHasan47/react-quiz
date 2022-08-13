import React, { useState } from 'react';
import TextInput from './TextInput';
import CheckBox from './CheckBox';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';
import { useAuth } from '../contexts/AuthContext';

const SignUpForm = () => {
    const [ userName, setUserName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ ConfirmPassword, setConfirmPassword ] = useState( '' );
    const [ agree, setAgree ] = useState( '' );
    const [ error, setError ] = useState( '' );
    const [ loading, setLoading ] = useState( false );

    const { signup } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async( e ) => {
        e.preventDefault();

        // do validation
        if( password !== ConfirmPassword ) {
            return setError( 'Password do not match!' );
        }

        try {
            setError( '' );
            setLoading( true );
            await signup( email, password, userName );
            navigate( '/' );
        } catch( err ) {
            console.log( err );
            setLoading( false );
            setError( 'Failed to create an account!' );
        }
    }

    return (
        <Form className={ { style: '500px' } } onSubmit={ handleSubmit }>
            <TextInput
                type={ 'text' }
                required
                placeholder={ 'Enter Your Name' }
                icon={ 'person' }
                value={ userName }
                onChange={ ( e ) => setUserName( e.target.value ) }
            />
            <TextInput
                type={ 'text' }
                required
                placeholder={ 'Enter Your Email' }
                icon={ 'alternate_email' }
                value={ email }
                onChange={ ( e ) => setEmail( e.target.value ) }
            />
            <TextInput
                type={ 'password' }
                required
                placeholder={ 'Enter Your Password' }
                icon={ 'lock' }
                value={ password }
                onChange={ ( e ) => setPassword( e.target.value ) }
            />
            <TextInput
                type={ 'password' }
                required
                placeholder={ 'Confirm Your Password' }
                icon={ 'lock_clock' }
                value={ ConfirmPassword }
                onChange={ ( e ) => setConfirmPassword( e.target.value ) }
            />
            <CheckBox
                text={ 'I agree to the Terms & Conditions' }
                required
                value={ agree }
                onChange={ ( e ) => setAgree( e.target.value ) }
            />
            <Button type={ 'submit' } disabled={ loading }>
                <span>Submit now</span>
            </Button>

            { error && <p className={ 'error' }>{ error }</p> }

            <div className="info">
                Already have an account? <Link to={ '/login' }>Login</Link> instead.
            </div>
        </Form>
    );
};

export default SignUpForm;