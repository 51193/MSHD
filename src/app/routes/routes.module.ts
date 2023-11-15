import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { MshdModule } from './mshd/mshd.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RoutesRoutingModule, MshdModule],
})
export class RoutesModule {}
