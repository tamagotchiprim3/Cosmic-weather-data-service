import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash';
import { selectSpinnerCount } from 'src/app/store/app/app.selectors';
import {
  changeTheme,
  geocodingByCity,
  geocodingByZip,
  getCurrentWeather,
} from 'src/app/store/weather/current-weather.actions';
import { selectCurrentTemperature } from 'src/app/store/weather/weather.selectors';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class CurrentWeatherComponent implements OnDestroy {
  @ViewChild(SideBarComponent) sidebar: SideBarComponent;

  public theme: string = 'white';
  public spnrCount: number;
  public dataTemp?: { location: string; temp: number; icon: string };

  constructor(private store: Store, private translate: TranslateService) {
    store
      .select(selectCurrentTemperature)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data && data.icon && data.location && data.temp) {
          this.dataTemp = cloneDeep(data);
        }
      });
    store
      .select(selectSpinnerCount)
      .pipe(untilDestroyed(this))
      .subscribe((spnrCount) => {
        this.spnrCount = spnrCount;
      });
  }
  ngOnDestroy(): void {}

  public changeLanguage(): void {
    if (
      this.sidebar.locationForm.get('latitude').value &&
      this.sidebar.locationForm.get('longitude').value
    ) {
      this.store.dispatch(
        getCurrentWeather({
          data: {
            lat: this.sidebar.locationForm.get('latitude').value,
            lon: this.sidebar.locationForm.get('longitude').value,
            lang: this.translate.currentLang === 'en' ? 'ru' : 'en',
          },
        })
      );
    }
    if (this.sidebar.locationForm.get('city').value) {
      this.store.dispatch(
        geocodingByCity({
          data: {
            name: this.sidebar.locationForm.get('city').value,
            lang: this.translate.currentLang === 'en' ? 'ru' : 'en',
          },
        })
      );
    }
    if (this.sidebar.locationForm.get('zip').value) {
      this.store.dispatch(
        geocodingByZip({
          data: {
            zip: this.sidebar.locationForm.get('zip').value,
            lang: this.translate.currentLang === 'en' ? 'ru' : 'en',
          },
        })
      );
    }
    this.translate.use(this.translate.currentLang === 'en' ? 'ru' : 'en');
  }

  public changeTheme(): void {
    this.theme = this.theme === 'white' ? 'black' : 'white';
    this.store.dispatch(changeTheme({ data: this.theme }));
  }
}
