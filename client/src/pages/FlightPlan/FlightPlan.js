import React, { Component } from 'react';
import FlightPlanForm from '../../components/FlightPlanForm';
// Material-UI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import TextField from '@material-ui/core/TextField';
// Utils
import axios from 'axios';
import moment from 'moment';
import * as turf from '@turf/turf';
// Mapbox
import MapboxGL from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
// CSS
import './FlightPlan.css';

moment.locale('en');

class FlightPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPoly: null,
      renderedFeatures: null,
      formData: null,
      formSaved: false,
      selectedDate: new Date(),
      duration: 30,
      altitude: 400,
      radius: 0.5,
      resultMessage: '',
      resultDetails: '',
      showModal: false,
      showResults: false,
      isInteractive: true,
      controls: null,
      handlers: [
        'scrollZoom',
        'boxZoom',
        'dragRotate',
        'dragPan',
        'keyboard',
        'doubleClickZoom',
        'touchZoomRotate'
      ],
      isDrawnShape: false,
      bbox: null,
      map: null,
      draw: null,
      lng: -96,
      lat: 37.8,
      zoom: 3,
      userLayerId: [],
      radius: 0.5,
      mapboxAccessToken:
        'pk.eyJ1IjoiZ2l0a2VuZHJhIiwiYSI6ImNqZngzcDR0aDA2M2gyd21uMGkyOTgwMWQifQ.98Yw1AzzUrWT6mVTrY6R9A',
      style: 'mapbox://styles/gitkendra/cjjygg5mz3uxj2sn5ct6l38gv',
      // Mapbox control settings
      mapboxGeolocateControl: {
        positionOptions: {
          enableHighAccuracy: false,
          timeout: 6000,
          maximumAge: 0
        },
        fitBoundsOptions: {
          maxZoom: 15
        },
        trackUserLocation: false,
        showUserLocation: true,
        position: 'top-left'
      },
      mapboxScaleControl: {
        unit: 'imperial',
        maxWidth: 100,
        position: 'bottom-right'
      },
      mapboxFullscreenControl: {
        position: 'top-left'
      },
      mapboxNavigationControl: {
        showCompass: true,
        showZoom: true,
        position: 'top-right'
      },
      mapboxDrawOptions: {
        displayControlsDefault: false,
        controls: {
          point: true,
          line_string: false,
          polygon: true,
          trash: true,
          combine_features: false,
          uncombine_features: false
        }
      }
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleModalSave = this.handleModalSave.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateMapData = this.updateMapData.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.saveOperation = this.saveOperation.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.disableInteraction = this.disableInteraction.bind(this);
    this.enableInteraction = this.enableInteraction.bind(this);
    this.drawLayer = this.drawLayer.bind(this);
    this.drawDelete = this.drawDelete.bind(this);
    this.drawCreate = this.drawCreate.bind(this);
    this.deleteUserLayer = this.deleteUserLayer.bind(this);
    this.convertPointToCircle = this.convertPointToCircle.bind(this);
    this.addPopUp = this.addPopUp.bind(this);
    this.handleSavePath = this.handleSavePath.bind(this);
    this.handleEditPath = this.handleEditPath.bind(this);
    this.handleValidateOp = this.handleValidateOp.bind(this);
    this.sendUserPoly = this.sendUserPoly.bind(this);
    this.dateIsValid = this.dateIsValid.bind(this);
    this.timeIsValid = this.timeIsValid.bind(this);
    this.getSunriseSunset = this.getSunriseSunset.bind(this);
    this.filterGeojsonIntersection = this.filterGeojsonIntersection.bind(this);
    this.unionRenderedFeatures = this.unionRenderedFeatures.bind(this);
    this.sortFeaturesByLayer = this.sortFeaturesByLayer.bind(this);
    this.filterAirspace = this.filterAirspace.bind(this);
    this.uniqueLowestAirspace = this.uniqueLowestAirspace.bind(this);
    this.subtractIntersectingAirspace = this.subtractIntersectingAirspace.bind(this);
    this.isSameShape = this.isSameShape.bind(this);
    this.tBoolOverlap = this.tBoolOverlap.bind(this);
    this._pipe = this._pipe.bind(this);
    this.pipe = this.pipe.bind(this);
  }

  // Modal functions
  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };
  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleModalSave = (event) => {
    event.preventDefault();
    this.setState({ formSaved: true });
    this.closeModal();
  };
  handleModalCancel = () => {
    this.setState({ formSaved: false });
    this.closeModal();
  };
  handleModalOpen = () => {
    this.setState({ showModal: true });
  };
  handleModalClose = () => {
    this.setState({ showModal: false });
  };
  
  toggleVisibility = () => {
    const { showResults } = this.state;
    this.setState({ showResults: !showResults });
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    this.saveOperation();
  };
  updateMapData = mapData => {
    delete mapData.userPolygon.id;
    this.setState({
      userPoly: mapData.userPolygon,
      renderedFeatures: mapData.rendered
    });
  };
  updateFormData = formData => {
    this.setState({ formData });
  };
  saveOperation = () => {
    console.log('saveOperation');
  };
  closeModal() {
    this.setState({ showModal: false });
  }
  openModal() {
    this.setState({ showModal: true });
  }
  isDisabled = () => {
    const { userPoly, formData } = this.state;
    return !(userPoly != null && formData != null);
  };

  // =====================
  // MAP FUNCTIONS
  // ====================
  // TODO: get mapbox access token from enviroment variable
  componentDidMount() {
    const {
      lng,
      lat,
      zoom,
      style,
      mapboxAccessToken,
      mapboxGeolocateControl,
      mapboxScaleControl,
      mapboxFullscreenControl,
      mapboxDrawOptions,
      mapboxNavigationControl
    } = this.state;
    MapboxGL.accessToken = mapboxAccessToken;
    const map = new MapboxGL.Map({
      container: this.mapContainer,
      style,
      center: [lng, lat],
      zoom
    });

    // Add everything to the map once it's loaded
    map.on('load', () => {
      // Add the Toggleable Layers to the map
      const toggleableLayerIds = ['Satellite'];
      // Set up onclick events for each layer and add to DOM
      for (let i = 0; i < toggleableLayerIds.length; i++) {
        const id = toggleableLayerIds[i];
        const link = document.createElement('a');
        link.href = '#';
        link.className = '';
        link.textContent = id;
        // Add the onclick functionality of layer button
        link.onclick = function(event) {
          event.preventDefault();
          event.stopPropagation();
          const clickedLayer = this.textContent;
          let visibility = map.getLayoutProperty(clickedLayer, 'visibility');
          // Toggle visibility of map layer
          if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
          } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
          }
        };
        // Attach layers to DOM
        let layers = document.getElementById('menu-ui');
        layers.appendChild(link);
      }
      // Create Mapbox Controls
      const Geolocate = new MapboxGL.GeolocateControl(mapboxGeolocateControl);
      const Fullscreen = new MapboxGL.FullscreenControl(mapboxFullscreenControl);
      const Navigation = new MapboxGL.NavigationControl(mapboxNavigationControl);
      const Scale = new MapboxGL.ScaleControl(mapboxScaleControl);

      // Add Mapbox Controls to the map (order matters!)
      map.addControl(Geolocate);
      map.addControl(Fullscreen);
      map.addControl(Navigation);
      map.addControl(Scale, 'bottom-right');

      // Add Mapbox Drawing capabilitites to the map
      const Draw = new MapboxDraw(mapboxDrawOptions);
      this.setState({ draw: Draw });
      map.addControl(this.state.draw);
      map.on('draw.create', this.drawCreate);
      map.on('draw.delete', this.drawDelete);

      // Add Geocoder outside of Mapbox Div
      let Geocoder = new MapboxGeocoder({
        accessToken: mapboxAccessToken,
        zoom: 13,
        flyTo: true
      });
      document.getElementById('geocoder').appendChild(Geocoder.onAdd(map));
      this.setState({
        controls: {
          Geolocate: Geolocate,
          Fullscreen: Fullscreen,
          Navigation: Navigation,
          Scale: Scale,
          Geocoder: Geocoder
        }
      });
    });

    // Listener when map is moved. Updates state lng, lat, zoom
    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    // Add mapbox map to state
    this.setState({ map });
  }
  disableInteraction = () => {
    const { map, handlers, controls, isInteractive, draw } = this.state;
    if (isInteractive) {
      map.removeControl(controls.Geolocate);
      map.removeControl(controls.Fullscreen);
      map.removeControl(controls.Navigation);
      // map.removeControl(controls.Scale);
      map.removeControl(draw);
      map.removeControl(controls.Geocoder);
      handlers.forEach(handler => map[handler].disable());
      this.setState({ isInteractive: false });
    }
  };
  enableInteraction = () => {
    // Re-enable map handlers and controls
    const { handlers, map, controls, isInteractive, draw, userPoly } = this.state;
    if (!isInteractive) {
      map.addControl(controls.Geolocate);
      map.addControl(controls.Fullscreen);
      map.addControl(controls.Navigation);
      map.addControl(draw);
      document.getElementById('geocoder').appendChild(controls.Geocoder.onAdd(map));
      handlers.forEach(handler => map[handler].enable());
      // Convert layer into drawing
      this.deleteUserLayer();
      draw.add(userPoly);
      this.setState({ isInteractive: true });
    }
  };
  addUserLayer(feature) {
    // TODO: add onClick to layer with a popup edit button!!!
    let { userLayerId, map } = this.state;
    const id = 'userPoly';
    userLayerId.push(id);
    map.addLayer({
      id: id,
      type: 'fill',
      source: {
        type: 'geojson',
        data: feature
      },
      metadata: feature,
      paint: {
        'fill-color': 'blue',
        'fill-opacity': 0.4,
        'fill-outline-color': 'darkblue'
      }
    });
  }
  drawLayer(array, id) {
    if (array.length === 0) {
      return;
    }
    let color;
    switch (id) {
      case 'atc':
        color = 'blue';
        break;
      case 'classG':
        color = 'green';
        break;
      case 'frz':
        color = 'black';
        break;
      case 'uasfm':
        color = 'yellow';
        break;
      default:
        color = 'gray';
        break;
    }
    array.forEach((poly, index) => {
      let layerId = id + '-' + poly.properties.OBJECTID;
      this.userLayerId.push(layerId);
      // Add a layer showing the polygon.
      this.map.addLayer({
        id: layerId,
        type: 'fill',
        source: {
          type: 'geojson',
          data: poly
        },
        paint: {
          'fill-color': color,
          'fill-outline-color': 'black',
          'fill-opacity': 0.3
        }
      });
    });
  }
  drawDelete = event => {
    this.setState({ isDrawnShape: false });
  };
  drawCreate = event => {
    const { draw } = this.state;
    this.setState({ isDrawnShape: true });
    this.deleteUserLayer();

    const currentObjects = draw.getAll();
    const numObjects = currentObjects.features.length;
    // Only keep one drawn object at time
    if (numObjects > 1) {
      for (let i = 0; i < numObjects - 1; i++) {
        draw.delete(currentObjects.features[i].id).getAll();
      }
    }
    const type = event.features[0].geometry.type;
    const id = event.features[0].id;
    switch (type) {
      // If polygon, create an identical polygon with a polyId
      case 'Polygon':
        let feature = {
          type: 'Feature',
          properties: {},
          id: 'polyId',
          geometry: event.features[0].geometry
        };
        draw.delete(id).add(feature);
        // this.addUserLayer(feature);
        // updateMapData(feature);
        draw.changeMode('simple_select');
        break;
      case 'Point':
        // TODO: Prompt user for radius of circle
        const circle = this.convertPointToCircle(event.features[0]);
        draw.delete(id).add(circle);
        // this.addUserLayer(circle);
        // updateMapData(circle);
        break;
      case 'LineString':
        draw.changeMode('simple_select');
        break;
      default:
        break;
    }
    this.setState({ isDrawnShape: true });
  };
  deleteUserLayer = () => {
    // TODO - verify that destructuring map like this instead of this.state.map is correct way
    let { map, userLayerId } = this.state;
    if (userLayerId !== undefined && userLayerId.length > 0) {
      userLayerId.forEach(id => {
        map.removeLayer(id).removeSource(id);
      });
      this.setState({ userLayerId: [] });
    }
  };
  convertPointToCircle = point => {
    const { radius } = this.state;
    let center = point.geometry.coordinates;
    let options = {
      units: 'miles',
      steps: 30
    };
    let circle = turf.circle(center, radius, options);
    circle.id = 'circleId';
    return circle;
  };
  addPopUp = () => {
    // Possibly use a map.on('click', 'layerid', function (){})
  };
  handleSavePath = () => {
    const { map, draw } = this.state;
    // Get drawing from map
    const drawing = draw.getAll().features[0];
    // Stop if there is nothing drawn and notify user
    if (!drawing) {
      alert('Draw flight path first!');
      return;
    }
    // Draw immovable layer on non-interactive map
    this.addUserLayer(drawing);
    this.setState({ userPoly: drawing });
    this.disableInteraction();
    // Get bounding box for feature to update map bounds to fit operation path
    const bbox = turf.bbox(drawing);
    // Set map viewport to bounds of bbox
    map.fitBounds(bbox, {
      padding: 50 // {top: 10, bottom:40, left: 10, right: 20}
    });
  };
  handleEditPath = () => {
    this.enableInteraction();
    this.setState({ showResults: false, resultMessage: '', resultDetails: '' });
  };

  // ==================== \\
  // VALIDATION FUNCTIONS \\
  // ==================== \\
  handleValidateOp = () => {
    console.log('handleValidateOp');
    this.setState({
      resultMessage: '',
      resultDetails: '',
      showResults: false
    });
    const { userPoly, formData, map, altitude } = this.state;
    const lngLat = userPoly.geometry.coordinates[0][0];
    let resultDetails = '';

    // Object to store geojson features
    let geojson = {
      airspace: [],
      restrictedZone: [],
      facilityMap: [],
      airports: [],
      stadiums: [],
      atcAirspace: []
    };

    // Truthy variables that deterine approval or not
    let isValidDate = this.dateIsValid();
    let isAtOrBelow400 = formData.altitude <= 400;
    let isAtOrBelowFM = true;
    let isDaylight;
    let isInRestrictedArea;

    const bbox = turf.bbox(userPoly);
    // Set map viewport to bounds of bbox
    map.fitBounds(bbox, {
      padding: 50 // {top: 10, bottom:40, left: 10, right: 20}
    });

    // Set array of coordinates of bounding box
    let southWest = [bbox[0], bbox[1]];
    let northEast = [bbox[2], bbox[3]];
    // map.project: Returns a Point representing pixel coordinates, relative to the map's container, that correspond to the specified geographical location.
    let northEastPointPixel = map.project(northEast);
    let southWestPointPixel = map.project(southWest);
    /* Limitation on queryRenderedFeatures:
    *  1) Only works for those features that are visible on the map
    *    Workaround - added invisible class airspace to map
    *  2) Parameters include pixel coordinates relative to map's container
    *  3) May contain duplicates or split sections of a single layer item
    */
    const renderedFeatures = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], {
      layers: ['frz', 'class_airspace', 'facility_map', 'pending-nsufr-uas']
    });

    // store only relevant features to user drawn shape
    let simplifiedFeatures = this.pipe(
      this.filterGeojsonIntersection,
      this.unionRenderedFeatures,
      this.sortFeaturesByLayer
    )(renderedFeatures, userPoly);
    // separate features by type and reduce to relevant airspace
    geojson.atcAirspace = this.pipe(
      this.filterAirspace,
      this.uniqueLowestAirspace,
      this.subtractIntersectingAirspace
    )(simplifiedFeatures.airspace, formData.altitude);
    geojson.restrictedZone = simplifiedFeatures.restricted;
    geojson.facilityMap = simplifiedFeatures.facilityMap;

    console.log('***************************');
    console.log('Restricted zone', geojson.restrictedZone);
    console.log('facility map', geojson.facilityMap);
    console.log('atc airspace:', geojson.atcAirspace);
    // todo: send this value to Map to draw
    // this.drawLayer(geojson.atcAirspace, 'atc')

    // Check if altitude is at or below facility map alt
    geojson.facilityMap.forEach(feature => {
      if (altitude > feature.properties.CEILING) {
        isAtOrBelowFM = false;
      }
    });
    Promise.all([this.sendUserPoly(userPoly), this.getSunriseSunset(lngLat[1], lngLat[0])])
      .then(data => {
        // Sort data by distance from flight area
        geojson.airports = data[0].data.airports_nearby.sort((a, b) => a.distance - b.distance);
        geojson.stadiums = data[0].data.stadiums_nearby;
        // Display nearby airports/stadiums
        geojson.airports.forEach(a => {
          let name = a.feature.properties.NAME;
          let dist = this.round(a.distance, 1);
        });

        // Determine if flight is during civil time
        isDaylight = this.timeIsValid(data[1]);
        isInRestrictedArea = geojson.restrictedZone.length > 0;

        console.log('===============================');
        console.log('DATE:', isValidDate ? 'PASS' : 'FAIL');
        console.log('MAX 400 FT:', isAtOrBelow400 ? 'PASS' : 'FAIL');
        console.log('MAX UASFM:', isAtOrBelowFM ? 'PASS' : 'FAIL');
        console.log('DAYLIGHT:', isDaylight ? 'PASS' : 'FAIL');
        console.log('DAYLIGHT:', !isInRestrictedArea ? 'PASS' : 'FAIL');

        // Display results to user
        console.log('************************');
        console.log('Render results to screen');

        // Show results to user
        // Not eligible for LAANC
        if (
          !isAtOrBelow400 ||
          !isDaylight ||
          isInRestrictedArea ||
          !isAtOrBelowFM ||
          !isValidDate
        ) {
          this.setState({ resultMessage: 'Not eligible for LAANC submission' });
          if (!isAtOrBelow400) {
            resultDetails += 'Above 400 ft AGL. ';
          }
          if (!isDaylight) {
            resultDetails += 'Not during daylight hours. ';
          }
          if (isInRestrictedArea) {
            resultDetails += 'In a flight restricted zone. ';
          }
          if (!isAtOrBelowFM) {
            resultDetails += 'Above the pre-approved altitude ceiling. ';
          }
          if (!isValidDate) {
            resultDetails += 'Scheduled outside of the 90 day submission limit. ';
          }
          resultDetails += 'Check for possible waivers for your flight plan. ';
        } else {
          // Possible LAANC submission
          if (geojson.atcAirspace.length === 0) {
            this.setState({
              resultMessage: 'No submission is required'
            });
            resultDetails += 'Not in controlled airspace. ';
          }
          if (geojson.atcAirspace.length === 1) {
            this.setState({
              resultMessage: 'Eligible for LAANC submission'
            });
            resultDetails += 'In controlled airspace and must be submitted to FAA. ';
          }
          if (geojson.atcAirspace.length > 1) {
            resultDetails += `There are ${
              geojson.atcAirspace.length
            } airport authorities which require separate LAANC submissions. `;
          }
        }
        this.setState({
          resultDetails: resultDetails,
          showResults: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  sendUserPoly(feature) {
    return new Promise((resolve, reject) => {
      // Send map data to server and retrieve resulting polygons
      axios
        .post('/api/v1/faa/nearby', {
          feature
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  dateIsValid = () => {
    const { selectedDate } = this.state.formData;
    const date = moment(selectedDate);
    // console.log('selectedDate: ', selectedDate)
    // console.log('Start date:', date.format('YYYY/MM/DD HH:mm A'))
    // console.log('Allowable Date Range: ' + moment().format('YYYY/MM/DD') + ' - ' + moment().add(90, 'd').format('YYYY/MM/DD'))
    // console.log('after current time', date.isAfter(moment()))
    // console.log('same or before 90 days', date.isSameOrBefore(moment().add(90, 'd'), 'day'))
    return date.isAfter(moment()) && date.isSameOrBefore(moment().add(90, 'd'), 'day');
  };
  timeIsValid = daytime => {
    const { selectedDate, duration } = this.state.formData;
    const startTime = moment(selectedDate, 'HH:mm').format('HH:mm A');
    const endTime = moment(startTime, 'HH:mm')
      .add(duration, 'minutes')
      .format('HH:mm A');
    // console.log('start-end: ' + startTime + '-' + endTime)
    return (
      moment(startTime, 'HH:mm').isSameOrAfter(moment(daytime.dawn, 'HH:mm')) &&
      moment(endTime, 'HH:mm').isSameOrBefore(moment(daytime.dusk, 'HH:mm'))
    );
  };
  getSunriseSunset(lat, lng) {
    const { selectedDate } = this.state.formData;
    const day = moment(selectedDate).format('YYYY-MM-DD');
    return new Promise((resolve, reject) => {
      let error, data;
      axios
        .get(
          'https://api.sunrise-sunset.org/json?formatted=0&lat=' +
            lat +
            '&lng=' +
            lng +
            '&date=' +
            day
        )
        .then(response => {
          const civilDawn = moment(response.data.results.civil_twilight_begin).format('HH:mm A');
          const civilDusk = moment(response.data.results.civil_twilight_end).format('HH:mm A');
          // console.log(`Civil twilight: ${civilDawn} - ${civilDusk}`);
          data = {
            dawn: civilDawn,
            dusk: civilDusk
          };
          if (response.data.status !== 'OK') {
            error = response.data.status;
          }
          error ? reject(error) : resolve(data);
        });
    });
  }

  // GEOJSON FUNCTIONS \\
  // ***************** \\
  filterGeojsonIntersection(array, polygon) {
    let result = [];
    array.forEach(function(feature) {
      let intersection = turf.intersect(feature, polygon);
      // Only keep features that intersect with polygon
      if (!(intersection === null)) {
        // Intersection exists. Update geometry of feature with intersection details
        feature.geometry = intersection.geometry;
        result.push(feature);
      }
    });
    return result;
  }
  unionRenderedFeatures(array) {
    if (array.length === 0) {
      return array;
    }
    let results = [];
    // Loop through array and find where contains duplicate id's
    // union the duplicate objects where id's match and return resulting array
    array.forEach((element, index) => {
      let geojson = element;
      // Check if results array already contains the current element
      let exists = results.some(res => res.id === geojson.id);
      // Add all elements with matching ids to the result array as a single polygon or
      // multipolygon. Then push the single poly or multipoly to results array.
      if (!exists) {
        // loop through array finding any matching ids.
        for (let i = index + 1; i < array.length; i++) {
          // Compare current index element with i index element
          // If the current (unioned) element has same id, union their geometries
          // Note: this could create MultiPolygons
          if (geojson.id === array[i].id) {
            let union = turf.union(geojson, array[i]);
            // update current element/geojson geometry to the unioned geometry
            geojson.geometry = union.geometry;
          }
        }
        // After looping through entire array finding matches, unioning
        results.push(geojson);
      }
    });
    return results;
  }
  sortFeaturesByLayer(array) {
    let result = {
      airspace: [],
      restricted: [],
      facilityMap: []
    };
    array.forEach(function(feature) {
      let layer = feature.layer.id;
      // Only keep the geometry and properties of feature
      let feat = {
        type: 'Feature',
        geometry: feature.geometry,
        properties: feature.properties
      };
      // Add intersecting feature to the appropriate array
      switch (layer) {
        case 'class_airspace':
          result.airspace.push(feat);
          break;
        case 'frz':
        case 'pending-nsufr-uas':
          result.restricted.push(feat);
          break;
        case 'facility_map':
          result.facilityMap.push(feat);
          break;
        default:
          break;
      }
    });
    return result;
  }
  filterAirspace(array, alt) {
    const result = array.filter(
      feature =>
        !(parseInt(feature.properties.LOWER_VAL, 10) > alt) &&
        feature.properties.TYPE_CODE === 'CLASS' &&
        !(feature.properties.LOCAL_TYPE === 'MODE C') &&
        !(feature.properties.ICAO_ID === undefined)
    );
    return result;
  }
  uniqueLowestAirspace(array) {
    // Variable to store features of lowest, unique airspace features
    let result = [];
    if (array.length <= 1) {
      return array;
    }
    for (let i = 0; i < array.length; i++) {
      // MINIMIZE ARRAY TO UNIQUE SHAPES WITH THE LOWEST CEILING
      // Set up first poly if empty
      if (result.length === 0) {
        result.push(array[i]);
        continue;
      }
      let numLoop = result.length;
      // Loop through result and make sure current airspace shape isn't already added to result array
      // Eliminate any duplicate airspace polygon shapes
      for (let j = 0; j < numLoop; j++) {
        // Check if geojson geometries in result and array are the same, aka same shape
        this.isSameShape(array[i], result[j], isSame => {
          if (isSame) {
            // Completely overlapping airspace (same geometries).
            // Stop the loop's next iteration and reset index used on results array
            numLoop = 0;
            // Compare airspace ceilings to determine which to store in result
            if (
              parseInt(array[i].properties.LOWER_VAL, 10) ===
              parseInt(result[j].properties.LOWER_VAL, 10)
            ) {
              // Same ceiling. Keep the airspace that is ATC'd
              if (array[i].properties.ICAO_ID) {
                // current element is a controlled airspace. update resulting array
                result[j].properties = array[i].properties;
              }
            } else if (
              parseInt(array[i].properties.LOWER_VAL, 10) <
              parseInt(result[j].properties.LOWER_VAL, 10)
            ) {
              // Current element has a lower ceiling. Update result
              result[j].properties = array[i].properties;
            }
            // At end of results array with no match found
          } else if (j === numLoop - 1) {
            // Add the unique shape to result
            result.push(array[i]);
            // Reset counter to avoid looping over the polygon just added to result
            numLoop = 0;
          }
        }); // end isSameShape callback
      } // end result inner for loop
    } // end airspace outer for loop
    return result;
  }
  subtractIntersectingAirspace(array) {
    // SUBTRACT INTERSECTING POLYGONS
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        this.tBoolOverlap(array[i], array[j], isOverlapping => {
          if (isOverlapping) {
            let iVal = parseInt(array[i].properties.LOWER_VAL, 10);
            let jVal = parseInt(array[j].properties.LOWER_VAL, 10);
            // Airspace feature in index i is lower than index j
            if (iVal < jVal) {
              // Cut index j feature to not contain any overlap with index i
              array[j] = turf.difference(array[j], array[i]);
              // Features was completely overlapping, remove from array
              if (array[j] === null) {
                array.splice(j, 1);
              }
            } else {
              // Cut index i feature to not contain any overlap with index j
              array[i] = turf.difference(array[i], array[j]);
              // Features was completely overlapping, remove from array
              if (array[i] === null) {
                array.splice(i, 1);
              }
            }
          }
        });
      }
    }
    return array;
  }
  isSameShape(feat1, feat2, cb) {
    let result = false;
    // Only check if the features are of the same feature type, aka point, polygon, line, etc.
    if (feat1.geometry.type === feat2.geometry.type) {
      result = turf.booleanEqual(feat1.geometry, feat2.geometry);
    }

    // Callback function
    if (cb && typeof cb === 'function') {
      cb(result);
    } else {
      // No callback exists
    }
  }
  tBoolOverlap(poly1, poly2, cb) {
    let result = turf.booleanOverlap(poly1, poly2);
    // Call back function
    if (cb && typeof cb === 'function') {
      cb(result);
    }
  }

  // HELPER FUNCTIONS \\
  // **************** \\
  _pipe(f, g) {
    return (...args) => g(f(...args));
  }
  pipe(...fns) {
    return fns.reduce(this._pipe);
  }
  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  render() {
    const {
      resultMessage,
      resultDetails,
      isInteractive,
      showModal,
      duration,
      altitude,
      selectedDate
    } = this.state;

    return (
      <div>
        <div>
          {/* Draw save/edit Buttons */}
          <div id="map-btns">
            <button
              type="button"
              className="btn btn-sm btn-default"
              onClick={this.handleSavePath}
              disabled={!isInteractive}
            >
              <i className="icon icon-check" /> Save Flight Path
            </button>
            <button
              type="button"
              className="btn btn-sm btn-default"
              onClick={this.handleEditPath}
              disabled={isInteractive}
            >
              <i className="icon icon-edit" /> Edit Flight Path
            </button>
          </div>
        </div>
        {/* Map Container */}
        <div>
          <div id="map">
            <div id="menu-ui" />
            <div ref={el => (this.mapContainer = el)} className="map" />
            <div id="geocoder" className="geocoder" />
          </div>
        </div>
        {/* Buttons */}
        <div id="flight-buttons">
          {/* <!-- Button trigger modal --> */}
          <button
            onClick={this.handleModalOpen}
            type="button"
            className="btn btn-primary mr-1"
            id="btn-flight-details"
          >
            Enter Flight Details
          </button>
          <button
            onClick={this.handleValidateOp}
            type="button"
            className="btn btn-default"
            id="btn-validate-op"
            disabled={this.isDisabled()}
          >
            Validate Operation
          </button>
          <button type="button" className="btn btn-default" onClick={this.toggleVisibility}>
            Show/hide results
          </button>
        </div>
        {/* Results Card */}
        {this.state.showResults && (
          <Card id="results">
            <CardContent>
              <Typography variant="headline" component="h3">
                Results: {resultMessage}
              </Typography>
              <Typography id="message" component="p">
                Details: {resultDetails}
              </Typography>
            </CardContent>
          </Card>
        )}
        {/* <!-- Modal --> */}
        <Dialog
          aria-labelledby="flight-details-modal"
          open={showModal}
          onClose={this.handleModalClose}
          id="flight-details-modal"
        >
          <DialogTitle id="form-title">Flight Details</DialogTitle>
          <DialogContent>
            <form className="form" noValidate autoComplete="off">
              <div className="row">
                <div className="col-12">                    
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                      label="Start Date and Time"
                      value={selectedDate}
                      onChange={this.handleDateChange}
                      disablePast={true}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-12 mui-text-field">
                  <TextField
                    id="duration"
                    label="Duration"
                    helperText="Enter minutes"
                    type="number"
                    value={duration}
                    onChange={this.handleChange('duration')}
                    margin="normal"
                  />
                </div>
                <div className="col-12">
                  <TextField
                    id="altitude"
                    label="Max. Altitude"
                    helperText="Enter feet AGL"
                    type="number"
                    value={altitude}
                    onChange={this.handleChange('altitude')}
                    margin="normal"
                  />
                </div>
              </div>
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleModalCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleModalSave}
                >
                  Save changes
                </button>
              </div>
            </div>
            </form>
          </DialogContent>
        </Dialog>
        {/* {this.state.showModal && (
          <div className="modal active" id="flight-details">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Flight Details</h5>
                  <button type="button" className="close" onClick={this.closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <FlightPlanForm
                    updateFormData={this.updateFormData}
                    closeModal={this.closeModal}
                  />
                </div>
              </div>
            </div>
          </div> */}
        )}
      </div>
    );
  }
}

export default FlightPlan;
