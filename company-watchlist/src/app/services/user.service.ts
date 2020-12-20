import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private apiService: ApiService) { }

    async getAllUsersAsync(): Promise<User[]> {
        const apiFunction = `/api/user/getAll`;
        return await this.apiService.GetAsync<User[]>(apiFunction);
    }

    async getOneUserAsync(id: number): Promise<User> {
        const apiFunction = `/api/user/getOne/${id}`;
        return await this.apiService.GetAsync<User>(apiFunction);
    }

    async createUserAsync(User: User): Promise<any> {
        const apiFunction = `/api/user/add`;
        return await this.apiService.PostAsync<any>(apiFunction, User);
    }

    async deleteUserAsync(id: number): Promise<any> {
        const apiFunction = `/api/user/delete/${id}`;
        return await this.apiService.DeleteAsync<any>(apiFunction);
    }
}