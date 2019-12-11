import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';
import panzoom from 'panzoom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('panel', { static: false }) panel: ElementRef;
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
  panZoomController;
  zoomLevels: number[];
  currentZoomLevel: number;
  originalHeight = 397;
  originalWidth = 276;
  height = this.originalHeight;
  width = this.originalWidth;
  panelSidebar = 18;
  panelMain = 82;
  collapsed = false;
  tab = 1;
  ngAfterViewInit() {
    this.zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
    this.currentZoomLevel = this.zoomLevels[4];
    this.panZoomController = panzoom(this.panel.nativeElement);
  }

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
    console.log('dragEnd ', x.sizes, ' total > ', x.sizes.reduce((t, s) => t + s, 0));
  }

  collapseArea() {
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      this.panelSidebar = 4;
      this.panelMain = 96;
    } else {
      this.panelSidebar = 18;
      this.panelMain = 82;
    }
  }

  zoom() {
    const scale = this.currentZoomLevel;
    if (scale) {
      this.width = this.originalWidth * scale ;
      this.height = this.originalHeight * scale ;
      console.log(`width: ${this.width}, height: ${this.height}`);
    }
  }

  zoomToggle(zoomIn: boolean) {
    const idx = this.zoomLevels.indexOf(this.currentZoomLevel);
    if (zoomIn) {
      if (typeof this.zoomLevels[idx + 1] !== 'undefined') {
        this.currentZoomLevel = this.zoomLevels[idx + 1];
      }
    } else {
      if (typeof this.zoomLevels[idx - 1] !== 'undefined') {
        this.currentZoomLevel = this.zoomLevels[idx - 1];
      }
    }
    this.zoom();
  }

  addClass(numTab) {
    this.tab = numTab;
    console.log(numTab);
  }
  openSublist(e) {
    console.log(e);

  }
}
