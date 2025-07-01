
import { NextResponse, NextRequest } from 'next/server'
 
const privatePaths = ['/me']
const authpaths = ['/login', '/register']
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl
    const sessionToken = request.cookies.get('sessionToken')?.value
    //chưa đăng nhập ko cho vào  me
    if (privatePaths.some(path => pathname.startsWith(path)) && !sessionToken){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    //đăng nhập rồi ko cho vào register
    if (authpaths.some(path => pathname.startsWith(path)) && sessionToken){
        return NextResponse.redirect(new URL('/me', request.url))
    }
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/me','/login', '/register'],
}