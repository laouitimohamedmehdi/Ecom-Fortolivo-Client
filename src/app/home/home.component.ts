import { Component } from '@angular/core';
import { CarouselComponent } from '../core/carousel/carousel.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
