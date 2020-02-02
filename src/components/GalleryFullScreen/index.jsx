/**
 * @author Yuriy Matviyuk
 */
import cloudinary from '../../api/cloudinary'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'

/**
 * index component
 *
 * @param setFullscreenPhoto
 * @param fullscreenPhoto
 * @param photos
 *
 * @returns {*}
 * @constructor
 */
const GalleryFullScreen = ({ setFullscreenPhoto, fullscreenPhoto, photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(photos.indexOf(fullscreenPhoto))
  const showNext = () => {
    setCurrentPhotoIndex(currentPhotoIndex === photos.length - 1 ? 0 : currentPhotoIndex + 1)
  }
  const showPrev = () => {
    setCurrentPhotoIndex(currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1)
  }

  return (
    <div className='gallery fullscreen overlay'>
      <button type='button' className='action close' onClick={() => setFullscreenPhoto(null)}/>
      <div className="image-wrapper">
        <Image cloudName={cloudinary.cloudName} publicId={photos[currentPhotoIndex]}>
          <Transformation fetchFormat="auto" gravity='face' crop="fill" />
        </Image>
      </div>
      <button type='button' className='action nav prev' onClick={showPrev}/>
      <button type='button' className='action nav next' onClick={showNext}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

GalleryFullScreen.propTypes = {
  setFullscreenPhoto: PropTypes.func,
  photos: PropTypes.array,
  fullscreenPhoto: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryFullScreen)
