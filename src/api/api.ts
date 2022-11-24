import axios from "axios"
import { PhotosType } from "../types/types"
const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "b67629cf-3e35-4a5e-a5dc-feb693c91523"
    }
})
// axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`, {
//   withCredentials: true, headers: {
//     "API-KEY": "7741aeff-4475-4c99-8e86-0fb98b53e58f"
//   }
// }).then(response => {
//   if (response.data.resultCode === 0) {
//     console.log("response", response.data)
//     props.unFollow(el.id)
//   }
// })
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    Capcha = 10
}
type ResponseType<T> = {
    data: T
    resultCode: ResultCodeEnum
    messages: Array<string>
}
export type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: boolean
    fullName: string
    contacts: ProfileContactsType
    photos: PhotosType
}

export const profileAPI = {
    async getProfile(profileId: number) {
        const response = await instance.get<ProfileType>(`profile/${profileId}`)
        return response.data
    },
    async getStatus(userId: number) {
        // statys in body
        const response = await instance.get(`profile/status/${userId}`)
        return response.data
    },
    async updateStatus(statusText: string) {
        const response = await instance.put<ResponseType<{}>>(`profile/status`, { status: statusText })
        return response.data
    },
}

type authMeType = {
    id: number
    email: string
    login: string
}
type LoginTYpe = {
    userId: number
}

export const AuthAPI = {
    async authMe() {
        const response = await instance.get<ResponseType<authMeType>>(`auth/me`)
        return response.data
    },
    async login(email: string, password: string, rememberMe: boolean, captcha: string) {
        const response = await instance.post<ResponseType<LoginTYpe>>(`auth/login`, { email, password, rememberMe, captcha })
        return response.data
    },
    async logout() {
        const response = await instance.delete<ResponseType<{}>>(`auth/login`)
        return response.data
    },
}
type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
}
type UserSType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await instance.get<UserSType>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },
    async followUser(userId: number) {
        const response = await instance.post<ResponseType<{}>>(`follow/${userId}`)
        return response.data
    },
    async unFollowUser(userId: number) {
        const response = await instance.delete<ResponseType<{}>>(`follow/${userId}`)
        return response.data
    },
}
type CaptchaType = {
    url: string
}
export const securityAPI = {
    async getCaptchaURL() {
        const response = await instance.get<CaptchaType>(`security/get-captcha-url`)
        return response.data
    },
}