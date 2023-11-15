import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisasterCodeInfo, DisasterCodeInfos } from '../../../interfaces/mshd.interface';
import { MshdService } from '../../../services/mshd.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent {
  public infos: DisasterCodeInfos = [];
  public x: DisasterCodeInfo | undefined;
  public id: string = "";

  constructor(
    private route: ActivatedRoute,
    private mshdService: MshdService
  ){
    this.route.paramMap.subscribe(param => {
      const y = param.get("disasterId")
      if(y != null){
        this.id = y;
      }
    })
    this.getUser();
    this.mshdService.DisasterCodeInfos$.subscribe((infos) => {
      this.infos = infos;
      this.x = infos.find(item => item.disasterId == this.id);
    });
  }

  getUser(): void{
    const x = this.route.snapshot.paramMap.get('id');
    if(x != null){
      this.id = x;
    }
  }
}
