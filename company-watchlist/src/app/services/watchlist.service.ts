import { Injectable } from "@angular/core";
import { AlphaVantageIntradaily } from "../models/alphavantage-intradaily.model";
import { AlphaVantageOverview } from "../models/alphavantage-overview.model";
import { AlphaVantageSearch } from "../models/alphavantage-search.model";
import { Watchlist } from "../models/watchlist.model";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class WatchlistService {
    constructor(private apiService: ApiService) { }

    async getAllWatchlistsAsync(): Promise<Watchlist[]> {
        const apiFunction = `/api/watchlist/getAll`;
        return await this.apiService.GetAsync<Watchlist[]>(apiFunction);
    }

    async getOneWatchlistAsync(id: number): Promise<Watchlist> {
        const apiFunction = `/api/watchlist/getOne/${id}`;
        return await this.apiService.GetAsync<Watchlist>(apiFunction);
    }

    async getWatchlistsByUserIdAsync(userId: number): Promise<Watchlist[]> {
        const apiFunction = `/api/watchlist/getByUserId/${userId}`;
        return await this.apiService.GetAsync<Watchlist[]>(apiFunction);
    }

    async createWatchlistAsync(Watchlist: Watchlist): Promise<any> {
        const apiFunction = `/api/watchlist/add`;
        return await this.apiService.PostAsync<any>(apiFunction, Watchlist);
    }

    async deleteWatchlistAsync(id: number): Promise<any> {
        const apiFunction = `/api/watchlist/delete/${id}`;
        return await this.apiService.DeleteAsync<any>(apiFunction);
    }

    async alphaVantageSearchAsync(symbol: string): Promise<AlphaVantageSearch[]> {
        const apiFunction = `/api/watchlist/alphaVantageSearch/${symbol}`;
        return await this.apiService.GetAsync<AlphaVantageSearch[]>(apiFunction);
    }

    async alphaVantageIntradailyAsync(symbol: string): Promise<AlphaVantageIntradaily> {
        const apiFunction = `/api/watchlist/alphaVantageIntradaily/${symbol}`;
        return await this.apiService.GetAsync<AlphaVantageIntradaily>(apiFunction);
    }

    async alphaVantageOverviewAsync(symbol: string): Promise<AlphaVantageOverview> {
        const apiFunction = `/api/watchlist/alphaVantageOverview/${symbol}`;
        return await this.apiService.GetAsync<AlphaVantageOverview>(apiFunction);
    }
}