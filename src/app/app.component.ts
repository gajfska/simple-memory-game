import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Memory Game';

    loadedFeature = 'easy';

    onNavigate(feature: string) {
        this.loadedFeature = feature;
    }
}
