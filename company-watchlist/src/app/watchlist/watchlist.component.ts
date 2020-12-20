import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlphaVantageIntradaily } from '../models/alphavantage-intradaily.model';
import { AlphaVantageOverview } from '../models/alphavantage-overview.model';
import { AlphaVantageSearch } from '../models/alphavantage-search.model';
import { Watchlist } from '../models/watchlist.model';
import { WatchlistService } from '../services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  public searchForm: FormGroup = FormGroup.prototype;
  public companies: Watchlist[] = [];
  public searchedCompanies: AlphaVantageSearch[] = [];
  public currentCompanySymbol!: string;
  public currentWatchlistStock: AlphaVantageIntradaily = new AlphaVantageIntradaily();
  public currentWatchlistOverview: AlphaVantageOverview = new AlphaVantageOverview();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private watchlistService: WatchlistService,
    private authService: AuthService) { }

    get f() { return this.searchForm.controls; }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });

    this.getWatchlists();
  }

  async getWatchlists() {
    this.watchlistService.getWatchlistsByUserIdAsync(this.authService.getUserId()).then(x => {
      this.companies = x;
    });
  }

  async onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }

    await this.watchlistService.alphaVantageSearchAsync(this.f.search.value).then(x => {
      this.searchedCompanies = x;
    });
  }

  existsCompanyInWatchlist(symbol: string) {
    return this.companies.some(x => x.symbol === symbol);
  }

  async removeCompanyFromWatchlist(id: number){
    await this.watchlistService.deleteWatchlistAsync(id).then(async x => {
      await this.getWatchlists();
    });
  }

  async viewCompanyDetails(symbol: string) {
    await this.watchlistService.alphaVantageIntradailyAsync(symbol).then(async x => {
      await this.watchlistService.alphaVantageOverviewAsync(symbol).then(async y => {
        this.currentWatchlistStock = x;
        this.currentWatchlistOverview = y;
        this.currentCompanySymbol = symbol;
      });
    });
  }

  async addToWatchlist(symbol : string) {
    var watchlist = new Watchlist();
    watchlist.symbol = symbol;
    watchlist.userId = this.authService.getUserId();
    await this.watchlistService.createWatchlistAsync(watchlist).then(async x => {
      await this.getWatchlists();
    });
  }

  logout() {
    this.router.navigate(['logout']);
  }
}
