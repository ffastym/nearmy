/**
 * @author Yuriy Matviyuk
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Preview from './Preview'
import GalleryFullScreen from '../GalleryFullScreen'

/**
 * index component
 *
 * @param user
 * @param isEditable
 *
 * @returns {*}
 * @constructor
 */
const GallerySmall = ({ isEditable, user }) => {
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null)
  const gallery = user.photos.map(
    photo => <Preview key={photo} photo={photo} setFullscreenPhoto={setFullscreenPhoto} isEditable={isEditable} />
  )

  if (isEditable) {
    gallery.push(<Preview key='empty' empty />)
  }

  return (
    <>
      { fullscreenPhoto &&
        <GalleryFullScreen setFullscreenPhoto={setFullscreenPhoto}
          photos={user.photos}
          fullscreenPhoto={fullscreenPhoto}/> }
      <div className='gallery-small'>
        {gallery}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

GallerySmall.propTypes = {
  photos: PropTypes.array,
  isEditable: PropTypes.bool,
  user: PropTypes.object

}

export default connect(mapStateToProps, mapDispatchToProps)(GallerySmall)
