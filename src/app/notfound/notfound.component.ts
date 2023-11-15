import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.less'],
})
export class NotfoundComponent {
  constructor(public router: Router) {}
  goHome() {
    this.router.navigate(['/login']);
  }
}
