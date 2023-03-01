import * as L from 'leaflet';

export const MAP_LAYERS = {
  'Convective precipitation': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/PAC0/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Precipitation intensity': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/PR0/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Accumulated precipitation': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/PA0/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Accumulated precipitation - rain': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/PAR0/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Accumulated precipitation - snow': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/PAS0/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Depth of snow': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/SD0/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Wind speed at an altitude of 10 meters': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/WS10/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Joint display of speed wind (color) and wind direction (arrows)':
    L.layerGroup([
      L.tileLayer(
        'http://maps.openweathermap.org/maps/2.0/weather/WND/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
        {
          maxNativeZoom: 0,
          opacity: 0.7,
        }
      ),
    ]),
  'Atmospheric pressure on mean sea level': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/APM/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Air temperature at a height of 2 meters': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/TA2/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Temperature of a dew point': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/TD2/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Soil temperature 0-10 сm': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/TS0/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Soil temperature > 10 сm': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/TS10/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  'Relative humidity': L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/HRD0/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
  Cloudiness: L.layerGroup([
    L.tileLayer(
      'http://maps.openweathermap.org/maps/2.0/weather/CL/0/0/0?appid=6202a1d93912d029f06422b65d0702ac',
      {
        maxNativeZoom: 0,
        opacity: 0.7,
      }
    ),
  ]),
};
