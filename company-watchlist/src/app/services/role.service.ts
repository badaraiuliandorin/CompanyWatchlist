import { Injectable } from "@angular/core";
import { Role } from "../models/role.model";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private apiService: ApiService) { }

    async getAllRolesAsync(): Promise<Role[]> {
        const apiFunction = `/api/role/getAll`;
        return await this.apiService.GetAsync<Role[]>(apiFunction);
    }

    async getOneRoleAsync(id: number): Promise<Role> {
        const apiFunction = `/api/role/getOne/${id}`;
        return await this.apiService.GetAsync<Role>(apiFunction);
    }

    async createRoleAsync(role: Role): Promise<any> {
        const apiFunction = `/api/role/add`;
        return await this.apiService.PostAsync<any>(apiFunction, role);
    }

    async deleteRoleAsync(id: number): Promise<any> {
        const apiFunction = `/api/role/delete/${id}`;
        return await this.apiService.DeleteAsync<any>(apiFunction);
    }
}