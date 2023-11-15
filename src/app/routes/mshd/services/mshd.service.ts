import { Injectable } from '@angular/core';
import {
  DisasterCodeInfo,
  DisasterCodeInfos,
} from '../interfaces/mshd.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MshdService {
  constructor() {}

  DisasterCodeInfos$ = new BehaviorSubject<DisasterCodeInfos>([]);
}
