
var map, featureList;

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);



$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(hgmwet.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});


function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}


$("#sidebar").hide();

function sidebarClick(id) {
  var layer = hgmwet.getLayer(id);
  map.fitBounds(layer.getBounds());
  layer.setStyle({
    weight: 2,
    color: "#222222",
    fillOpacity: 0.8,
    dashArray: '10, 5'
  });
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}



function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();

  hgmwet.eachLayer(function (layer) {
    if (map.hasLayer(hgmwetLayer)) {
      if (map.getBounds().contains(layer.getBounds().getCenter())) {
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getBounds().getCenter().lat + '" lng="' + layer.getBounds().getCenter().lng + '"><td class="logo" style="vertical-align: middle;"><img width="16" height="18" src="assets/img/legend/' + layer.feature.properties.PICID + '.png"></td><td class="feature-name"><b>(' + layer.feature.properties.OBJECTID + ') ' + layer.feature.properties.SUBCLASS + '</b></td>' + '<td class="chevron" style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td>'
        + '<td class="feature-protection" style="vertical-align: middle;">Protected? ' + layer.feature.properties.restrict + '</td>'
        + '<td class="feature-area" style="vertical-align: middle;">Area: ' + layer.feature.properties.acreage + ' acres</td>'
        + '<td class="special-row" style="vertical-align: middle;">Priority Ranking Score: ' + layer.feature.properties.PSCORE + '</td>'
        + '<td class="special-row" style="vertical-align: middle;">Priority Ranking ID#: ' + layer.feature.properties.PID + '</td></tr>'
        
        
       
        );   
      }
    }
  });

  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}


/* Basemap Layers */
var mapquestOSM = L.tileLayer("https://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1-s", "otile2-s", "otile3-s", "otile4-s"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="https://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
var mapquestOAM = L.tileLayer("https://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["otile1-s", "otile2-s", "otile3-s", "otile4-s"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});
var imagerySet = "AerialWithLabels"; // AerialWithLabels | Birdseye | BirdseyeWithLabels | Road
var bing = new L.BingLayer("LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc", {
  type: imagerySet, 
  maxNativeZoom:18, 
  maxZoom:22,
  attribution: 'something about bing'
});
var terrain = L.tileLayer('http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
  maxNativeZoom:18, 
  maxZoom:22
}); 
var imagerySet2 = "Aerial"; // AerialWithLabels | Birdseye | BirdseyeWithLabels | Road
var bing2 = new L.BingLayer("LfO3DMI9S6GnXD7d0WGs~bq2DRVkmIAzSOFdodzZLvw~Arx8dclDxmZA0Y38tHIJlJfnMbGq5GXeYmrGOUIbS2VLFzRKCK0Yv_bAl6oe-DOc", {
  type: imagerySet2, 
  maxNativeZoom:18, 
  maxZoom:22
});       
var mapquestHYB = L.layerGroup([L.tileLayer("https://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["otile1-s", "otile2-s", "otile3-s", "otile4-s"]
}), L.tileLayer("https://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1-s", "otile2-s", "otile3-s", "otile4-s"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="https://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);
var topo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}', {
  'attribution': 'National Geographic Society, i-cubed',
  'minZoom': 1,
  'maxZoom': 16,
  'maxNativeZoom': 15,
  'opacity': 0.9,
});



/**** Overlay Layers ****/
var highlight = L.geoJson(null);
var highlightStyle = {
  color: "#7CFC00"
};


var citylimitsLayer = L.geoJson(null);
var citylimits = L.geoJson(null, {



style: function (feature) {
  return {
    weight: 3,
    opacity: 1,
    color: '#F2F3F4',
    fillColor: 'black',
    fillOpacity: 0.2
  };
},
    

});
$.getJSON("data/citylimits.js", function (data) {
  citylimits.addData(data);
});

/* WOB Watershed */
var watershedLayer = L.geoJson(null);
var watershed = L.geoJson(null, {



style: function (feature) {
  return {
    weight: 6,
    opacity: 1,
    color: '#F38400',
    fillColor: 'black',
    fillOpacity: 0.2
  };
},
    

});
$.getJSON("data/watershed.js", function (data) {
  watershed.addData(data);
});

/* Parcel Information */
var parcelsLayer = L.geoJson(null);
var parcels = L.geoJson(null, {
  

style: function (feature) {
  return {
    weight: 1,
    opacity: 1,
    color: '#F3C300',
    fillColor: 'black',
    fillOpacity: 0.2
  };
},
    

  
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var parcelsContent = "<table class='table table-striped table-bordered table-condensed'>" + 
                "<tr><th>Owner Name</th><td>" + feature.properties.ow_name + "</td></tr>" 
                + "<tr><th>Owner Source Date</th><td>" + feature.properties.ow_src_dat + "</td></tr>" 
                + "<tr><th>Parcel ID</th><td>" + feature.properties.parcel_id + "</td></tr>" 
                + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html('Parcel Info');
          $("#feature-info").html(parcelsContent);
          $("#featureModal").modal("show");
        }
      });

    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          fillOpacity: 0.8,
          dashArray: '10, 5'
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        parcels.resetStyle(e.target);
      }
    });    
  }
});
$.getJSON("data/parcels_filter.js", function (data) {
  parcels.addData(data);
});

/* Wetlands */
var hgmwetLayer = L.geoJson(null);
var hgmwet = L.geoJson(null, {
  

  style: function (feature) {
    switch (feature.properties.SUBCLASS) {
        case 'Backwater':
          return {
            weight: '0.0',
            fillColor: '#be0032',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '0.7',
          };
          break;
        case 'Connected Depression':
          return {
            weight: '0.0',
            fillColor: '#dcd300',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '0.7',
          };
          break;
        case 'Flats':
          return {
            weight: '0.0',
            fillColor: '#8db600',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '0.7',
          };
          break;
        case 'Impounded Riverine':
          return {
            weight: '0.0',
            fillColor: '#0067a5',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '0.7',
          };
          break;
        case 'Overbank':
          return {
            weight: '0.0',
            fillColor: '#875692',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '0.7',
          };
          break;
        case 'River Swamp':
          return {
            weight: '0.0',
            fillColor: '#a1caf1',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '0.7',
          };
          break;
      }
  },
  
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + 
                "<tr><th>Protected?</th><td>" + feature.properties.restrict + "</td></tr>" +
                "<tr><th>Area</th><td>" + feature.properties.acreage + " acres</td></tr>" +
                "<tr><th>Priority Ranking Score</th><td>" + feature.properties.PSCORE + "</td></tr>" + 
                "<tr><th>Priority Ranking ID</th><td>" + feature.properties.PID + "</td></tr>" + 
                "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("(" + feature.properties.OBJECTID + ") " + feature.properties.SUBCLASS );
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          map.fitBounds(e.target.getBounds());
        }
      });

      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getBounds().getCenter().lat + '" lng="' + layer.getBounds().getCenter().lng + '"><td class="logo" style="vertical-align: middle;"><img width="16" height="18" src="assets/img/legend/' + layer.feature.properties.PICID + '.png"></td><td class="feature-name"><b>(' + layer.feature.properties.OBJECTID + ') ' + layer.feature.properties.SUBCLASS + '</b></td>' + '<td class="chevron" style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td>'
        + '<td class="feature-protection" style="vertical-align: middle;">Protected? ' + layer.feature.properties.restrict + '</td>'
        + '<td class="feature-area" style="vertical-align: middle;">Area: ' + layer.feature.properties.acreage + ' acres</td>'
        + '<td class="special-row" style="vertical-align: middle;">Priority Ranking Score: ' + layer.feature.properties.PSCORE + '</td>'
        + '<td class="special-row" style="vertical-align: middle;">Priority Ranking ID#: ' + layer.feature.properties.PID + '</td></tr>'
        
        
        
        );
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "#7CFC00",
          fillOpacity: 0.8,
          dashArray: '10, 5'
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
        info.update(layer.feature.properties);
      },
      mouseout: function (e) {
        hgmwet.resetStyle(e.target);
        info.update();
      }
    });    
  }
});
$.getJSON("data/hgmwet.js", function (data) {
  hgmwet.addData(data);
});

/* Wetland Priority Layer */
var hgmwetPriorityLayer = L.geoJson(null);
var hgmwetPriority = L.geoJson(null, {
  

style: function (feature) {

if (feature.properties.PSCORE >= 7.0 &&
        feature.properties.PSCORE <= 11.0) {
    return {
        weight: '0.0',
        fillColor: '#ffcccc',
        color: '#000000',
        weight: '0.0',
        dashArray: '',
        opacity: '1.0',
        fillOpacity: '0.7',
    }

}
if (feature.properties.PSCORE >= 12.0 &&
        feature.properties.PSCORE <= 16.0) {
    return {
        color: '#000000',
        weight: '0.0',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        fillColor: '#fa725a',
        opacity: '1.0',
        fillOpacity: '0.7',
    }
}
if (feature.properties.PSCORE >= 17.0 &&
        feature.properties.PSCORE <= 21.0) {
    return {
        color: '#000000',
        weight: '0.0',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        fillColor: '#db0000',
        opacity: '1.0',
        fillOpacity: '0.7',
    }
}
},


  
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + 
                "<tr><th>Protected?</th><td>" + feature.properties.restrict + "</td></tr>" +
                "<tr><th>Area</th><td>" + feature.properties.acreage + " acres</td></tr>" +
                "<tr><th>Priority Ranking Score</th><td>" + feature.properties.PSCORE + "</td></tr>" + 
                "<tr><th>Priority Ranking ID</th><td>" + feature.properties.PID + "</td></tr>" + 
                "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html("(" + feature.properties.OBJECTID + ") " + feature.properties.SUBCLASS );
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          map.fitBounds(e.target.getBounds());
        }
      });

      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getBounds().getCenter().lat + '" lng="' + layer.getBounds().getCenter().lng + '"><td class="logo" style="vertical-align: middle;"><img width="16" height="18" src="assets/img/legend/' + layer.feature.properties.PICID + '.png"></td><td class="feature-name"><b>(' + layer.feature.properties.OBJECTID + ') ' + layer.feature.properties.SUBCLASS + '</b></td>' + '<td class="chevron" style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td>'
        + '<td class="feature-protection" style="vertical-align: middle;">Protected? ' + layer.feature.properties.restrict + '</td>'
        + '<td class="feature-area" style="vertical-align: middle;">Area: ' + layer.feature.properties.acreage + ' acres</td>'
        + '<td class="special-row" style="vertical-align: middle;">Priority Ranking Score: ' + layer.feature.properties.PSCORE + '</td>'
        + '<td class="special-row" style="vertical-align: middle;">Priority Ranking ID#: ' + layer.feature.properties.PID + '</td></tr>'
        
        
        
        );
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "#222222",
          fillOpacity: 0.8,
          dashArray: '10, 5'
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
        info.update(layer.feature.properties);
      },
      mouseout: function (e) {
        hgmwetPriority.resetStyle(e.target);
        info.update();
      }
    });    
  }
});
$.getJSON("data/hgmwetPriority.js", function (data) {
  hgmwetPriority.addData(data);
});


var customstripes = new L.StripePattern({
    patternContentUnits: 0.5,
    patternUnits: 0.5,
    weight: 0.1,
    spaceWeight: 0.1,
    height: 0.2,
    angle: 45,
    fillOpacity: 1.0,
    opacity: 1.0,
    
});




var protectedwetLayer = L.geoJson(null);
var protectedwet = L.geoJson(null, {



style: function (feature) {
  return {
    weight: 4,
    opacity: 1,
    color: 'black',
    //fillColor: '#222222',
    fillPattern: customstripes,
    dashArray: '10,5',
    fillOpacity: 0.6,
    //fill : 'url(/static/wob/img/image2.png)'
  };
},
    

});
$.getJSON("data/protected.js", function (data) {
  protectedwet.addData(data);
});




/* ALL Hydrogeomorphic Subclasses */
var hgm_subclassesLayer = L.geoJson(null);
var hgm_subclasses = L.geoJson(null, {
  

  style: function (feature) {
    switch (feature.properties.SUBCLASS) {
        case 'Low-gradient Riverine Overbank':
          return {
            weight: '0.0',
            fillColor: '#be0032',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '1.0',
          };
          break;
        case 'Connected Depression':
          return {
            weight: '0.0',
            fillColor: '#dcd300',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '1.0',
          };
          break;
        case 'Flat':
          return {
            weight: '0.0',
            fillColor: '#8db600',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '1.0',
          };
          break;
        case 'Impounded Riverine':
          return {
            weight: '0.0',
            fillColor: '#0067a5',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '1.0',
          };
          break;
        case 'Low-gradient Riverine Overbank':
          return {
            weight: '0.0',
            fillColor: '#875692',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '1.0',
          };
          break;
        case 'River Swamp':
          return {
            weight: '0.0',
            fillColor: '#a1caf1',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '1.0',
          };
          break;
          break;
        case 'High-gradient Riverine':
          return {
            weight: '0.0',
            fillColor: '#008856',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '1.0',
          };
          break;
        case 'Mid-gradient Riverine':
          return {
            weight: '0.0',
            fillColor: '#F3C300',
            color: '#000000',
            weight: '0.0',
            dashArray: '',
            opacity: '1.0',
            fillOpacity: '1.0',
          };
          break;
      }
  },
  
  onEachFeature: function (feature, layer) {
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: "#7CFC00",
          fillOpacity: 0.8,
          dashArray: '10, 5'
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        hgmwet.resetStyle(e.target);
      }
    });    
  }
});
$.getJSON("data/hgm_subclasses.js", function (data) {
  hgm_subclasses.addData(data);
});



/* Streams */
var streamsLayer = L.geoJson(null);
var streams = L.geoJson(null, {



style: function (feature) {
  return {
    weight: 1.5,
    opacity: 0.8,
    color: '#A1CAF1',
    fillColor: 'black',
    fillOpacity: 0.2,
    dashArray: '10, 2'
  };
},
    

});
$.getJSON("data/streams.js", function (data) {
  streams.addData(data);
});





map = L.map("map", {
  zoom: 10,
  layers: [bing, hgmwet, hgmwetLayer],
  zoomControl: false,
  attributionControl: false
}).fitBounds([[34.7904422722,-92.482751701],[34.8957010045,-92.2342986907]]);



/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "topleft",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

L.control.zoom({
     position:'topleft'
}).addTo(map);
var measureControl = new L.Control.Measure({
    position: 'topleft',
    icon: "fa fa-location-arrow",
});
measureControl.addTo(map);



/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});



/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://gbmcassoc.com'>GBM<sup>c</sup> &amp; Associates</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);





/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  "Aerial": bing2,
  "Alternate Aerial ": mapquestHYB,
  "Terrain" : terrain,
  "Topographic" : topo,
  "Street Map": mapquestOSM,
  
  
  "Aerial (with labels)": bing
  
};

var groupedOverlays = {
  "Wetlands": {
    "Style by HGM Subclass" : hgmwet,
    "Style by Priority Ranking" : hgmwetPriority
  },
  "Reference Layers": {
    "All Hydrogeomorphic Subclasses</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : hgm_subclasses,
    "Maumelle City Limits</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='assets/img/legend/citylimits.png' width='12' height='12'>" : citylimits,
    "Parcels</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='assets/img/legend/parcels.png' width='12' height='12'>" : parcels,
    "Protected Wetlands</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='assets/img/legend/protected.png' width='12' height='12'>" : protectedwet,
    "Streams</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><font color='A1CAF1' > — —  </font></b>" : streams,
    "White Oak Bayou Watershed</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='assets/img/legend/watershed.png' width='12' height='12'>" : watershed
  }
};

var option = {
  exclusiveGroups: ["Wetlands"],
  collapsed: isCollapsed,
  position: 'topright'
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, option);
map.addControl(layerControl);

// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
  .disableClickPropagation(container)
  .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
//info pane 
var info = L.control({options:{position:'topright'}});
/* Hide sidebar and go to the map on small screens */



info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4><center>Wetland Info</center></h4>' +  (props ?
        '<table class="table table-bordered table-condensed"><th><b>(' + props.OBJECTID + ') ' + props.SUBCLASS 
        + '</b></th>' + '<tr class="info-row">'
        + '<td class="special-row" style="vertical-align: middle;">' + props.PCLASS + ' Priority</td>'
        + '<td class="special-row" style="vertical-align: middle;"><i>Protected?</i> ' + props.restrict + '</td>'
        + '<td class="special-row" style="vertical-align: middle;"><i>Area:</i> ' + props.acreage + ' acres</td>'
        + '<td class="special-row" style="vertical-align: middle;"><i>Priority Ranking Score:</i> ' + props.PSCORE + '</td>'
        + '<td class="special-row" style="vertical-align: middle;"><i>Priority Ranking ID#:</i> ' + props.PID + '</td></tr><table>'
        : '<br>&nbsp;Hover over a wetland area... <br>&nbsp;<br>&nbsp;<br>&nbsp;');
};


if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  info.addTo(map);
}

L.control.scale({options: {position: 'left',maxWidth: 100,metric: true,imperial: false,updateWhenIdle: false}}).addTo(map);
