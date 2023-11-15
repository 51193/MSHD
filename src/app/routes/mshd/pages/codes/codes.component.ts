import { Component } from '@angular/core';
import { DisasterCodeInfos } from '../../interfaces/mshd.interface';
import { MshdService } from '../../services/mshd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.less']
})
export class CodesComponent {
  public infos: DisasterCodeInfos = [];
  public inputs: any;

  constructor(
    private mshdService: MshdService,
    public router: Router
    ) {
    
    mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;
      
    });


  }

  call(x: any){
    console.log(x);
  }

  click(x: string){
    this.router.navigate(['/codes', x]);
  }
}
