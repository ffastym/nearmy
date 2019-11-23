/**
 * @author Yuriy Matviyuk
 */

/* global google */

/**
 * Google maps API
 */
const maps = {
  /**
   * Initialize map property
   */
  map: null,

  /**
   * Map container element id
   */
  containerId: 'map',

  /**
   * User position marker
   */
  marker: null,

  /**
   * Search radius circle
   */
  circle: null,

  /**
   * Map position coordinates
   */
  position: {
    lat: 50.431782,
    lng: 30.516382
  },

  /**
   * Create map
   *
   * @returns {number}
   * @private
   */
  _create () {
    const container = document.getElementById(this.containerId)

    return new google.maps.Map(container, {
      center: this.position,
      zoom: 11
    })
  },

  /**
   * Set circle radius
   *
   * @param radius
   */
  setCircleRadius (radius) {
    let map = this.getMap()

    if (radius === 5) {
      map.setZoom(12)
    } else if (radius === 10) {
      map.setZoom(10)
    } else if (radius === 25) {
      map.setZoom(9)
    } else if (radius === 50) {
      map.setZoom(8)
    }

    this.circle.setRadius(radius * 1000)
  },

  /**
   * Initialize google map
   */
  init (success, fail) {
    let map = this.getMap()

    map.addListener('click', (e) => {
      this.subscribeForClick(e.latLng, success)
    })

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        success(this.position)
        map.setCenter(this.position)
        this.circle = new google.maps.Circle({
          strokeWeight: 0.5,
          fillOpacity: 0.1,
          strokeColor: '#333',
          map,
          center: this.position,
          radius: 10000
        })

        this.circle.addListener('click', (e) => {
          this.subscribeForClick(e.latLng, success)
        })
      }, error => {
        fail(true, error)
      })
    } else {
      fail(false)
    }
  },

  /**
   * Subscribe for click on the map
   *
   * @param latLng
   * @param success
   */
  subscribeForClick (latLng, success) {
    if (this.marker) {
      this.marker.setMap(null)
    }

    if (this.circle) {
      this.circle.setMap(null)
    }

    this.position = {
      lat: latLng.lat(),
      lng: latLng.lng()
    }
    this.getMap().panTo(this.position)

    success(this.position)
  },

  /**
   * Add marker to the map
   *
   * @param position
   * @param title
   */
  addMarker (position, title = '') {
    let map = this.getMap()

    if (this.marker) {
      this.marker.setMap(map)
      this.marker.setPosition(position)
    } else {
      this.marker = new google.maps.Marker({ map, position, title })
    }

    if (this.circle) {
      this.circle.setMap(map)
      this.circle.setCenter(position)
    }
  },

  /**
   * Get map
   *
   * @return null|map
   */
  getMap () {
    if (!this.map) {
      this.map = this._create()
    }

    return this.map
  },

  /**
   * Get Google Places service
   *
   * @returns {google.maps.places.PlacesService}
   */
  getPlacesService () {
    return new google.maps.places.PlacesService(this.getMap())
  },

  /**
   * Get google geocoder
   *
   * @returns {google.maps.Geocoder}
   */
  getGeocoder () {
    return new google.maps.Geocoder()
  },

  /**
   * Get location name by coordinates
   *
   * @param location
   * @param res
   */
  getLocationByCoordinates (location, res) {
    this.getGeocoder().geocode({ location }, (results, status) => {
      if (status === 'OK') {
        res({ success: true, address: results[0] })
      } else {
        res({ success: false })
      }
    })
  },

  /**
   * Get Google places from query
   *
   * @param req
   * @param res
   */
  getPlaces (req, res) {
    this.getPlacesService().findPlaceFromQuery(req, (results, status) => {
      res({
        success: status === google.maps.places.PlacesServiceStatus.OK,
        results
      })
    })
  }
}

export default maps
