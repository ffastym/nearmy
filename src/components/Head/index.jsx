/**
 * @author Yuriy Matviyuk
 */
import React from 'react'
/**
 * Head component
 *
 * @returns {*}
 * @constructor
 */

const Head = () => {
  let title = 'PhotoBattle | Фотобатл - битва селфі'
  let description = 'Поборися за право називати себе королем/королевою селфі. Викликай противників на батл ' +
    'та займи перші сходинки в рейтингу'
  let keywords = 'фотобатл, селфі, шукаю тебе, тз, шт, зізнання, типове зізнання, підслухано, батлб король селфі'

  return (
    <React.Fragment>
      <title>{title}</title>
      <meta name='description' content={description}/>
      <meta name='keywords' content={keywords}/>
    </React.Fragment>
  )
}

export default Head
