import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const loginDir = props => {
    const { token, path } = props
    cookie.set('token', token, { expires: 1 })
    Router.push(path)
}

export const login = ({ token }) => {
    cookie.set('token', token, { expires: 1 })
    Router.push('/user/profile')
}

const redirectTo = (ctx={}, pathname) => {
    if (typeof window === 'undefined') {
        if (typeof ctx.res.writeHead === 'function') {
            ctx.res.writeHead(302, { Location: pathname })
        }
        ctx.res.end()
    } else {
        Router.push(pathname)
    }
}

export const auth = ctx => {
    const { token } = nextCookie(ctx)
    const whiteList = ['/user/login', '/user/signup']
    
    if (!token) {
        if (whiteList.indexOf(ctx.pathname) === -1) {
            console.log('unauthorized, redirect to login')
            redirectTo(ctx, '/user/login')
        }
        return
    } 
    if (whiteList.indexOf(ctx.pathname) > -1) {
        console.log('authorized, redirect to root')
        redirectTo(ctx, '/')
    }
    return token
}

export const logout = () => {
    cookie.remove('token')
    window.localStorage.setItem('logout', Date.now())
    Router.push('/user/login')
}

// Higher Order Component for Authentication
export const withAuthSync = WrappedComponent => {
    const Wrapper = props => {
        const syncLogout = event => {
            if (event.key === 'logout') {
                console.log('user logged out from local storage')
                Router.push('/user/login')
            }
        }
        useEffect(() => {
            window.addEventListener('storage', syncLogout)
            return () => {
                window.removeEventListener('storage', syncLogout)
                window.localStorage.removeItem('logout')
            }
        }, [])
        return <WrappedComponent {...props} />
    }
    Wrapper.getInitialProps = async ctx => {
        const token = auth(ctx)
        const loginStatus = (token) ? true : false
        const componentProps = 
            WrappedComponent.getInitialProps && 
            (await WrappedComponent.getInitialProps(ctx))
        
        return {...componentProps, token, loginStatus}
    }
    return Wrapper
}
