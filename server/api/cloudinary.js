import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: 'ddo4y69ih',
  api_key: '455722984412913',
  api_secret: 'UF37Q5WmYJYA5cOqOablrmOUKEA'
})

export default {
  /**
   * Get image
   *
   * @param publicId
   * @returns {*}
   */
  getImageUrl (publicId) {
    return cloudinary.url(publicId)
  }
}
