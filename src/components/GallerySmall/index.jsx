/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Preview from './Preview'

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
  const gallery = user.photos.map(photo => <Preview key={photo} photo={photo} isEditable={isEditable} />)

  if (isEditable) {
    gallery.push(<Preview key='empty' empty />)
  }

  return (
    <div className='gallery-small'>
      {gallery}
    </div>
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
