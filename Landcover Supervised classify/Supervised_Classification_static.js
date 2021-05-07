// Explore output here: https://ucanwhatsappme.users.earthengine.app/view/supervised-classify-gzb-by-sanjay

// Add trainning data and shapefile
var water = 
    /* color: #0000ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([77.53265554913975, 28.73308047259064]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([77.55435490312348, 28.694846823049105]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([77.54342777276217, 28.71255788544961]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.38550041361832, 28.737540045916965]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.4011803447184, 28.668698249629333]),
            {
              "landcover": 2,
              "system:index": "4"
            })]),
    bare = 
    /* color: #fcfc00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([77.48016729776859, 28.683171596989776]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([77.46081247751712, 28.6794442716432]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([77.49600414225911, 28.651430682539303]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.563466551806, 28.653951041818413]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.37700326305934, 28.64608169957076]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([77.42111567001265, 28.654169875553293]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([77.26921680908126, 28.79155567107847]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([77.28061242079052, 28.811754418790738]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([77.366541353696, 28.778924052725568]),
            {
              "landcover": 1,
              "system:index": "8"
            })]),
    vegetation = 
    /* color: #0cf803 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([77.37263533257783, 28.71134635670389]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([77.45474917700206, 28.72010479221291]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([77.52289701552185, 28.725413686224922]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.50491548628601, 28.724811542335548]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.55993254683426, 28.752751865213472]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([77.5405147150566, 28.757599691206988]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([77.24242626868562, 28.799955583517022]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([77.27306782447175, 28.804430722674972]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([77.26950585089998, 28.821351780165315]),
            {
              "landcover": 3,
              "system:index": "8"
            })]),
    urban = 
    /* color: #ff1a09 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([77.31242092000798, 28.73408117639369]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([77.30420263158635, 28.733121587503533]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([77.35895879750483, 28.711830684320063]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.42938287739985, 28.700877227886263]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.44989641194574, 28.70226999903679]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([77.52211247184438, 28.679133172007656]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([77.5387207100646, 28.680827432278054]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([77.5543676038209, 28.716310479522086]),
            {
              "landcover": 0,
              "system:index": "7"
            })]),
    gzb = ee.FeatureCollection("users/ucanwhatsappme/ghaziabad");
    

// Supervised landcover classification of sentinel data
// Select and add dataset Sentinel-2 MSI: MultiSpectral Instrument, Level-2A
var image = ee.ImageCollection("COPERNICUS/S2_SR")
             .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
             .filter(ee.Filter.date('2019-01-01', '2019-12-31'))
             .filter(ee.Filter.bounds(gzb))
             .select('B.*')
// clip the data to region of interest
var clip = image.median().clip(gzb) 

// Display the input composite.
var band = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(clip, band, 'image');

var gcps = urban.merge(bare).merge(water).merge(vegetation)

// Overlay the point on the image to get training data.
var training = clip.sampleRegions({
  collection: gcps, 
  properties: ['landcover'], 
  scale: 10
});


// Train a classifier.
var classifier = ee.Classifier.smileRandomForest(50).train({
  features: training,  
  classProperty: 'landcover', 
  inputProperties: clip.bandNames()
});
// // Classify the image.
var classified = clip.classify(classifier);
Map.addLayer(classified, {min: 0, max: 3, palette: ['red', 'yellow', 'blue', 'green']}, 'Classified'); 

// Display the GCPs
// We use the style() function to style the GCPs
var palette = ee.List(['red', 'yellow', 'blue', 'green'])
var landcover = ee.List([0, 1, 2, 3])

var gcpsStyled = ee.FeatureCollection(
  landcover.map(function(lc){
    var color = palette.get(landcover.indexOf(lc));
    var markerStyle = { color: 'white', pointShape: 'diamond', 
      pointSize: 4, width: 1, fillColor: color}
    return gcps.filter(ee.Filter.eq('landcover', lc))
                .map(function(point){
                  return point.set('style', markerStyle)
                })
      })).flatten();
      
// Add gcps to map
Map.setCenter(77.4, 28.6, 10);
Map.addLayer(gcpsStyled.style({styleProperty:"style"}), {}, 'GCPs')    
    
    
