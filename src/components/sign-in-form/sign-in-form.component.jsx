import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthWithEmailAndPassword
} from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        
        try {
            await signInWithGooglePopup()
        }
        catch(error) {
            if (error.code === "auth/cancelled-popup-request") {
                alert("Popup closed by user!")
            }
        }
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthWithEmailAndPassword(email, password)
            resetFormFields();
        }
        catch(error) {
            if (error.code === "auth/invalid-credential"){
                alert("Inavalid credential!")
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]:value})
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>            
                <FormInput required label="Email" type="email" onChange={ handleChange } name="email" value={email} />
                <FormInput required label="Password" type="password" onChange={ handleChange } name="password" value={password} />
                <div className="button-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="" buttonType='google' onClick={signInWithGoogle}>google sign in</Button>
                </div>
            </form>
        </div>
    )
    
}

export default SignInForm;
