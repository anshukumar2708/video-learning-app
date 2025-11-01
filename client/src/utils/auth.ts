import type { User } from "../types"


const KEY = 'vl_app_user'


export function saveUser(user: User) {
localStorage.setItem(KEY, JSON.stringify(user))
}


export function getUser(): User | null {
const s = localStorage.getItem(KEY)
return s ? JSON.parse(s) as User : null
}


export function logout(): void {
localStorage.removeItem(KEY)
}


export function isAuth(): boolean {
return !!getUser()
}