import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CustomDescriptionItemInfo,
  ImgDescription,
} from '../../interfaces/custom-description';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule, NzImageService } from 'ng-zorro-antd/image';
import { NzCardModule } from 'ng-zorro-antd/card';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject } from 'rxjs';
import { HttpImgComponent } from './http-img/http-img.component';

@Component({
  selector: 'lib-img-description',
  standalone: true,
  templateUrl: './img-description.component.html',
  styleUrl: './img-description.component.less',
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzImageModule,
    NzCardModule,
    HttpImgComponent,
  ],
})
export class ImgDescriptionComponent implements OnInit {
  @Input({ required: true }) descriptionInfo!: CustomDescriptionItemInfo;

  constructor(
    private nzImageService: NzImageService,
    private http: HttpClient,
  ) {}

  public description!: ImgDescription;
  public url$ = new AsyncSubject<string>();

  ngOnInit(): void {
    this.description = this.descriptionInfo.description as ImgDescription;
  }
}
