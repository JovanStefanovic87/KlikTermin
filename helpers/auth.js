import Router from 'next/router'
import nextCookie from 'next-cookies'

export function auth(ctx) {
  const { token } = nextCookie(ctx)

  if (ctx.req && (!token || token === 'undefined')) {
    ctx.res.writeHead(302, { Location: '/' })
    return
  }

  if (!token || token === 'undefined') {
    Router.push('/')
  }

  return token
}
