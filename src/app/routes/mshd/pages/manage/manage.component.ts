import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.less'
})
export class ManageComponent {

}
