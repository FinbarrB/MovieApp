import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http'
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton],
})
export class HomePage {

  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
  }

  constructor(private mhs:MyHttpService) {}

  ngOnInit() {
    this.getTrendingMovies();
  }

  async getTrendingMovies() {
    var result = await this.mhs.get(this.options);
    console.log(JSON.stringify(result));
  }

}
