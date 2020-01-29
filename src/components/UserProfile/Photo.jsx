/**
 * @author Yuriy Matviyuk
 */
import appActions from '../../redux/actions/app'
import cloudinary from '../../api/cloudinary'
import Loader from '../Loader'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import userActions from '../../redux/actions/user'
import userRequest from '../../api/axios/request/user'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'

/**
 * Photo component
 *
 * @param avatar
 * @param isEditable
 * @param setNotify
 * @param setAvatar
 * @param userId
 *
 * @returns {*}
 * @constructor
 */
const Photo = ({ avatar, isEditable, setNotify, setAvatar, userId }) => {
  const [isUploadProcessed, setIsUploadProcessed] = useState(false)

  const changePhoto = (e) => {
    const files = e.target.files

    if (!files.length) {
      return
    }

    setIsUploadProcessed(true)
    cloudinary.upload(files[0]).end((err, response) => {
      const photo = response.body.public_id

      if (err) {
        setNotify('imageUploadingError', 'error')
      } else if (photo) {
        userRequest.setAvatar({ photo, id: userId }).then(() => {
          setAvatar(photo)
          setNotify('photoChangedSuccessfully', 'success')
          setIsUploadProcessed(false)
        }).catch(() => {
          setNotify('imageUploadingError', 'error')
          setIsUploadProcessed(false)
        })
      }
    })
  }

  return (
    <div className="profile-photo-wrapper">
      <div className="profile-photo">
        {isEditable &&
          <label className='action edit' htmlFor='profile_photo'>
            <input id='profile_photo' type='file' className='hidden' accept='image/*' onChange={changePhoto}/>
          </label>}
        {isUploadProcessed
          ? <Loader/>
          : <Image cloudName={cloudinary.cloudName} publicId={avatar}>
            <Transformation height="200" fetchFormat="auto" width="150" gravity='face' crop="fill" />
          </Image>}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    /**
     * Set message of material UI snackbar
     *
     * @param message
     * @param type
     */
    setNotify: (message, type) => {
      dispatch(appActions.setNotify(message, type))
    },

    /**
     * Set user profile photo
     *
     * @param photo
     */
    setAvatar: photo => {
      dispatch(userActions.setAvatar(photo))
    }
  }
}

Photo.propTypes = {
  avatar: PropTypes.string,
  isEditable: PropTypes.bool,
  setAvatar: PropTypes.func,
  setNotify: PropTypes.func,
  userId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo)
