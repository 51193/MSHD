import { Component } from '@angular/core';
import { DisasterCodeInfos } from '../../interfaces/mshd.interface';
import { MshdService } from '../../services/mshd.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.less']
})
export class CodesComponent {
  public infos: DisasterCodeInfos = [];
  constructor(private mshdService: MshdService) {
    mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;
      
    });
  }
}
