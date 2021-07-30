import auth0 from 'auth0-js';
import history from './history'; 

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'dev-qwm7c3i8.us.auth0.com',
        clientID: '6aClS2kGWHizDJpPmdZQpEdcE0a0KP1E',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid, profile, email'
    })

    login = () => {
        this.auth0.authorize()
    }

    handleAuth = () => {
        this.auth0.parseHash((err, authResult) => {
            if (authResult) {
                console.log("AUTH RESULT ", authResult)
                localStorage.setItem('access_token', authResult.accessToken)
                localStorage.setItem('id_token', authResult.idToken)

                let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
                localStorage.setItem('expiresAt', expiresAt)
                setTimeout(() => {history.replace('/authcheck')}, 200)
            } else {
                console.log("Authentication Error: ", err)
            }
        })
    }

    logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expiresAt')
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
        return new Date().getTime() < expiresAt
    }
}