import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() mainMenu: boolean = true;
  @Input() prevLink: string = '/';

  full: boolean = false;
  elem: any;

  constructor() {}

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  openFullscreen() {
    // https://imvikaskohli.medium.com/how-to-implement-fullscreen-mode-in-angular-fb9f55c24f67 tutorial fullscreen
    this.full = true;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
}
