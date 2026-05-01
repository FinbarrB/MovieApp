import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http'
import { HttpOptions } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { CommonModule, NgForOf } from '@angular/common';
import { MyDataService } from '../services/my-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonList, IonItem, NgForOf, IonLabel],
})
export class HomePage {

  trendingMovies: any[] = []
  keyword: string = ""

  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzg3MmU5NmU2ZGUzMzNiOGY4ZGUxNDZjYTQ4OWQyYiIsIm5iZiI6MTc3NzM5MDQ1OC4zMTYsInN1YiI6IjY5ZjBkMzdhMGRiNTlmMDdmZTlkMmU2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rPpOoRzzVCCO1vKYBGrHofG33SVyHWFhgzEKfbwxi9A'
    }
  }

  constructor(private mhs:MyHttpService, private ds:MyDataService) {}

  ngOnInit() {
    this.getTrendingMovies();
  }

  async getTrendingMovies() {
    var result = await this.mhs.get(this.options)
    this.trendingMovies = result.data
    console.log(this.trendingMovies)
  }

  openMovies() {
    this.ds.set("kw", this.keyword);
  }

}
