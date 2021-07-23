import React ,{ useEffect, useState } from 'react';

import{Link}from'react-router-dom';
import{FiPlus,FiArrowRight}from'react-icons/fi';
import { Map,TileLayer,Marker, Popup} from 'react-leaflet';


import'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/map-marker.svg';
import MapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage{
  id:number,
  latitude:number,
  longitude:number,
  name:string
}

function OrphanagesMap(){

  const [orphanages, setOrphanage] = useState<Orphanage[]>([]);

  useEffect(() =>{
    api.get('orphanages').then(response=>{
      setOrphanage(response.data);
    });
  },[]);

  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estao esperando sua visita :D</p>
        </header>

        <footer>
          <strong>Ponta Grossa</strong>
          <span>Paraná</span>
        </footer>
      </aside>

      <Map
        center={[-25.0948657,-50.1673365]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
          <TileLayer
            url={
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />
          
        {orphanages.map(orphanage =>{
          return(
            <Marker
            key={orphanage.id}
            icon={MapIcon}
            position={[orphanage.latitude,orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={35} color="#FFF"/>
              </Link>
            </Popup>
          </Marker>
          )
        })}
        </Map>
      
      <Link to="/orphanages/create" className="create-orphanage"> 
        <FiPlus size={32} color="#fff"/>
      </Link>
    </div>
  )
}

export default OrphanagesMap;