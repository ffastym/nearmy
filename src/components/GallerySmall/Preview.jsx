/**
 * @author Yuriy Matviyuk
 */
import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cloudinary from '../../api/cloudinary'
import {Image, Transformation} from 'cloudinary-react'
import Loader from '../Loader'
import userRequest from '../../api/axios/request/user'
import appActions from '../../redux/actions/app'
import userActions from '../../redux/actions/user'
import {useTranslation} from 'react-i18next'

/**
 * Preview component
 *
 * @param photo
 * @param empty
 * @param setNotify
 * @param userId
 * @param addPhoto
 * @param removePhoto
 * @param isEditable
 *
 * @returns {*}
 * @constructor
 */
const Preview = ({ photo, empty = false, setNotify, userId, addPhoto, removePhoto, isEditable }) => {
  const [isUploadProcessed, setIsUploadProcessed] = useState(false)
  const { t } = useTranslation()

  const uploadPhoto = async files => {
    if (!files.length) {
      return
    }

    setIsUploadProcessed(true)

    cloudinary.upload(files[0]).end(async (err, response) => {
      const photo = response.body.public_id

      if (err || !photo) {
        return setNotify('imageUploadingError', 'error')
      }

      try {
        const { data } = await userRequest.addPhoto({ photo, id: userId })
        if (data.success) {
          addPhoto(data.photo)
          setNotify('photoAddedSuccessfully', 'success')
        } else {
          setNotify('imageUploadingError', 'error')
        }
        setIsUploadProcessed(false)
      } catch (e) {
        setNotify('imageUploadingError', 'error')
        setIsUploadProcessed(false)
      }
    })
  }

  /**
   * Remove image from gallery
   *
   * @returns {Promise<void>}
   */
  const removeImage = async () => {
    try {
      const { data } = await userRequest.removePhoto({ photo, id: userId })

      if (data.success) {
        removePhoto(data.photo)
        setNotify('photoRemovedSuccessfully', 'success')
      } else {
        setNotify('photoRemovingError', 'error')
      }
    } catch (e) {
      setNotify('photoRemovingError', 'error')
    }
  }

  return (
    <div className='photo-preview-wrapper'>
      <div className='photo-preview'>
        {empty
          ? <label className={`add-photo ${isUploadProcessed ? 'processed' : ''}`}
            htmlFor='upload_photo' title={t('uploadPhoto')}>
            {isUploadProcessed
              ? <Loader/>
              : <input type='file'
                className='hidden'
                name='upload_photo'
                id='upload_photo'
                accept='image/*'
                onChange={e => uploadPhoto(e.target.files)}
              />}
          </label>
          : <Fragment>
            {isEditable && <span className="action remove" onClick={removeImage}/>}
            <Image cloudName={cloudinary.cloudName} publicId={photo}>
              <Transformation height="60" fetchFormat="auto" width="60" gravity='face' crop="fill" />
            </Image>
          </Fragment>}
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
     * Set notify message
     *
     * @param message
     * @param type
     */
    setNotify: (message, type) => {
      dispatch(appActions.setNotify(message, type))
    },

    /**
     * Add new photo
     *
     * @param photo
     * @returns {*}
     */
    addPhoto: photo => dispatch(userActions.addPhoto(photo)),

    /**
     * Remove user photo
     *
     * @param photo
     * @returns {*}
     */
    removePhoto: photo => dispatch(userActions.removePhoto(photo))
  }
}

Preview.propTypes = {
  addPhoto: PropTypes.func,
  empty: PropTypes.bool,
  isEditable: PropTypes.bool,
  photo: PropTypes.string,
  removePhoto: PropTypes.func,
  setNotify: PropTypes.func,
  userId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
