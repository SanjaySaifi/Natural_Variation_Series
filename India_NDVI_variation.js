// Variation of NDVI throughout the year
// add ndvi image collection from MODIS
var data = ee.ImageCollection('MODIS/006/MOD13A2').select('NDVI');

// add india shapefile mask
var mask = ee.FeatureCollection("users/ucanwhatsappme/India_Shapefile");

// Define the regional bounds of animation frames.
var region = ee.Geometry.Polygon(
        [[[62.81491808757164, 37.915821144955075],
          [62.81491808757164, 4.463895947247117],
          [99.90476183757164, 4.463895947247117],
          [99.90476183757164, 37.915821144955075]]], null, false);

//group images by date
data = data.map(function(img) {
  var doy = ee.Date(img.get('system:time_start')).getRelative('day', 'year');
  return img.set('doy', doy);
});

var distinctDOY = data.filterDate('2013-01-01', '2014-01-01');


// filter the images
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});

// Define a join.
var join = ee.Join.saveAll('doy_matches');

// join and convert to imagecollection
var joinCol = ee.ImageCollection(join.apply(distinctDOY, data, filter));

// Apply median reduction among matching DOY collections.
var comp = joinCol.map(function(img) {
  var doyCol = ee.ImageCollection.fromImages(
    img.get('doy_matches')
  );
  return doyCol.reduce(ee.Reducer.median());
});
// Define RGB visualization parameters.
var visParams = {
  min: 0.0,
  max: 9000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};

// Create RGB visualization images for use as animation frames.
var rgbVis = comp.map(function(img) {
  return img.visualize(visParams).clip(mask);
});
// Define GIF visualization parameters.
var gifParams = {
  'region': region,
  'dimensions': 600,
  'crs': 'EPSG:3857',
  'framesPerSecond': 3
};

// add GIF URL to the console.
print(rgbVis.getVideoThumbURL(gifParams));
// Render the GIF animation in the console.
print(ui.Thumbnail(rgbVis, gifParams));









