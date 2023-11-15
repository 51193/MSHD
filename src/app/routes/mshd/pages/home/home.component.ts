import { Component } from '@angular/core';
import { MshdService } from '../../services/mshd.service';
import { DisasterCodeInfos } from '../../interfaces/mshd.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  public infos: DisasterCodeInfos = [];
  constructor(private mshdService: MshdService) {
    mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;
    });
  }
}
