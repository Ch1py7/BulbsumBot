import { AxiosRequestConfig } from 'axios'

export interface Post {
	url: string
	body?: object
	options?: AxiosRequestConfig
}

export interface Get {
	url: string
	options?: AxiosRequestConfig
}
