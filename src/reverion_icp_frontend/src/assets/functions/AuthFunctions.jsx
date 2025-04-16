import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import supabaseApi from '../supabase/supabaseApi'

function AuthFunctions() {

    const navigate = useNavigate()
    const [isGoogleSigningUp, setIsGoogleSigningUp] = useState(false)
    const [errors, setErrors] = useState({ signinForm: '' })

    const handleGoogleSignUp = async () => {

        setIsGoogleSigningUp(true)
        
        try {
            const { data: result } = await supabaseApi.post('/google')
        
            if (result.error) {
                setErrors(prev => ({
                    ...prev,
                    signupForm: result.error || 'Google authentication failed. Please try again.'
                }))
                setIsGoogleSigningUp(false)
                return
            }

            window.location.href = result.data?.url || '/home'
        
        } catch (error) {
            setErrors(prev => ({
            ...prev,
            signupForm: (error.response && error.response.data.error) || 'An unexpected error occurred. Please try again later.'
        }))
            setIsGoogleSigningUp(false)
        }

    }

    return {
        navigate,
        isGoogleSigningUp,
        setIsGoogleSigningUp,
        handleGoogleSignUp,
        errors
    }
}

export default AuthFunctions