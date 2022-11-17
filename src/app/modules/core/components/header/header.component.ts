import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  CURRENT_WEATHER_PATH,
  FORECASTS_WEATHER_PATH,
  HISTORY_WEATHER_PATH,
  IRoutingTemp,
} from 'src/app/shared/constants/routing.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, DoCheck {
  public currentWeatherRoute: IRoutingTemp = CURRENT_WEATHER_PATH;
  public historyWeatherRoute: IRoutingTemp = HISTORY_WEATHER_PATH;
  public forecastsWeatherRoute: IRoutingTemp = FORECASTS_WEATHER_PATH;
  public currentUrl: string = '';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cdR: ChangeDetectorRef
  ) {}
  ngDoCheck(): void {
    this.currentUrl = this.router.url;
    this.cdR.markForCheck();
  }

  ngOnInit(): void {}

  public changeLanguage(): void {
    this.translate.use(this.translate.currentLang === 'ru' ? 'en' : 'ru');
  }
}
