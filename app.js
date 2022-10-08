import * as React from 'react';
import {render} from 'react-dom';
import Map, {Marker, Popup, Source, Layer} from 'react-map-gl';
import geoJson from "./geo.json";
import 'mapbox-gl/dist/mapbox-gl.css';
import './app.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNrNXk3dXh6NzAwbncza3A1eHlpY2J2bmoifQ.JRy79QqtwUTYHK7dFUYy5g'; // Set your mapbox token here

function Root() {
  const [viewState, setViewState] = React.useState({
    longitude: -87.65,
    latitude: 41.940403,
    zoom: 9
  });
  const [hoverInfo, setHoverInfo] = React.useState(null);
  
  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': [
        'match',
        ['get', 'title'],
        'area1',
        '#fbb03b',
        'area2',
        '#223b53',
        'area3',
        '#e55e5e',
        'area4',
        '#3bb2d0',
        'area5',
        '#ff0000',
        'area6',
        '#00ff00',
        'area7',
        '#0000ff',
        /* other */ '#ccc'
      ]
    }
  };

  const onHover = React.useCallback(event => {
    const {
      features,
      point: {x, y}
    } = event;

    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);
  
  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: 1300, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      interactiveLayerIds={['point']}
      onMouseMove={onHover}
    >
      <Source id="my-data" type="geojson" data={geoJson}>
        <Layer {...layerStyle} />
      </Source>
      {hoverInfo && (
          <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
            <div>Title: {hoverInfo.feature.properties.title}</div>
            <div>Description: {hoverInfo.feature.properties.description}</div>
          </div>
        )}
    </Map>
  );
}

render(<Root />, document.body.appendChild(document.createElement('div')));