// 24 hr world temp variation
// define region of interest
var aoi = ee.Geometry.Polygon(
        [[[-178.5028576529238, 84.71147787186631],
          [-178.5028576529238, -82.44102378112217],
          [178.68464234707616, -82.44102378112217],
          [178.68464234707616, 84.71147787186631]]], null, false);

//  northern summer solstice hourly temp data
var image = ee.ImageCollection('NOAA/GFS0P25')
  .filterDate('2020-06-21', '2020-06-22')
  .limit(24)
  .select('temperature_2m_above_ground');

// Define arguments for animation function parameters.
var band = {
  dimensions: 768,
  region: aoi,
  framesPerSecond: 5,
  crs: 'EPSG:3857',
  min: -40.0,
  max: 35.0,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

//print animation to console
print(ui.Thumbnail(image, band));

// print URL to console.
print(image.getVideoThumbURL(band));
