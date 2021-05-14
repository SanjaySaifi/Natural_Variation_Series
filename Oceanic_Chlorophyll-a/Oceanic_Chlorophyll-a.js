
// Variation of Ocean Chlorophyll-a
// add image collection from MODIS
var data = ee.ImageCollection('NASA/OCEANDATA/MODIS-Terra/L3SMI').select('chlor_a');

var region = 
    ee.Geometry.Polygon(
        [[[61.25328957539798, 25.211170920220475],
          [61.25328957539798, -13.190460784327627],
          [95.00328957539797, -13.190460784327627],
          [95.00328957539797, 25.211170920220475]]], null, false);

//group images by date
data = data.map(function(img) {
  var doy = ee.Date(img.get('system:time_start')).getRelative('day', 'year');
  return img.set('doy', doy);
});

var distinctDOY = data.filterDate('2020-04-01', '2020-05-01');


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
  max: 99.99,
  palette: [
    '#25d5ec'
  ]
 
};

// Create RGB visualization images for use as animation frames.
var rgbVis = comp.map(function(img) {
  return img.visualize(visParams).clip(region);
});
// Define GIF visualization parameters.
var gifParams = {
  'region': region,
  'dimensions': 600,
  'crs': 'EPSG:3857',
  'framesPerSecond': 5
};

// add GIF URL to the console.
print(rgbVis.getVideoThumbURL(gifParams));
// Render the GIF animation in the console.
print(ui.Thumbnail(rgbVis, gifParams));







