import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http'
import { HttpOptions } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { CommonModule, NgForOf } from '@angular/common';
import { MyDataService } from '../services/my-data';
import { Router } from '@angular/router';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonList, IonItem, NgForOf, IonLabel, IonCard, FormsModule],
})
export class HomePage {

  trendingMovies!:any;
  keyword: string = "";

  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzg3MmU5NmU2ZGUzMzNiOGY4ZGUxNDZjYTQ4OWQyYiIsIm5iZiI6MTc3NzM5MDQ1OC4zMTYsInN1YiI6IjY5ZjBkMzdhMGRiNTlmMDdmZTlkMmU2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rPpOoRzzVCCO1vKYBGrHofG33SVyHWFhgzEKfbwxi9A'
    }
  }

  constructor(private mhs:MyHttpService, private ds:MyDataService, private router:Router) {}

  ngOnInit() {
    this.getTrendingMovies();
  }

  async getTrendingMovies() {
    let result = await this.mhs.get(this.options)
    this.trendingMovies = result.data.results
  }

  async searchMovies() {
    //if button selected without search term, how to return to trending movies?
    await this.ds.set("kw", this.keyword);
    if (this.keyword == "") {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['movies']);
    }
  }

  getMovieDetails() {
    this.router.navigate(['movie-details'])
  }
}
