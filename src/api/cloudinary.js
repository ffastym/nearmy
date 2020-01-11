import request from 'superagent'

/**
 * @author Yuriy Matviyuk
 *
 */
const cloudinary = {
  cloudName: 'ddo4y69ih',
  uploadPreset: 'unsigned',

  /**
   * Get image upload url
   *
   * @returns {string}
   */
  getUploadUrl () {
    return `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`
  },

  /**
   * Upload file to cloud
   *
   * @param file
   * @returns {Request}
   */
  upload (file) {
    return request.post(this.getUploadUrl())
      .field('upload_preset', this.uploadPreset)
      .field('tags', 'battle')
      .field('folder', 'battle')
      .field('file', file)
  }
}

export default cloudinary
