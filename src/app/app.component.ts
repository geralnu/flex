import { Component, ViewChild } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('split', { static: false }) split: SplitComponent;
  @ViewChild('area1', { static: false }) area1: SplitAreaDirective;
  @ViewChild('area2', { static: false }) area2: SplitAreaDirective;
  direction = 'horizontal';
  sizes = {
    percent: {
      area1: 20,
      area2: 70,
    },
    pixel: {
      area1: 120,
      area2: '*',
      area3: 160,
    }
  };
  isVisibleA: boolean = true;

  title = 'flex-split';

  dragEnd(unit, { sizes }) {
    if (unit === 'percent') {
      this.sizes.percent.area1 = sizes[0];
      this.sizes.percent.area2 = sizes[1];
    } else if (unit === 'pixel') {
      this.sizes.pixel.area1 = sizes[0];
      this.sizes.pixel.area2 = sizes[1];
      this.sizes.pixel.area3 = sizes[2];
    }
  }
  log(x) {
    console.log('dragEnd ', x.sizes, ' total > ', x.sizes.reduce((t, s) => t+s, 0))
}
collapseArea() {
  console.log('oki');
  this.sizes.pixel.area1 = 50;
  //this.isVisibleA = !this.isVisibleA;

}
}
