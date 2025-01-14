import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'

const ContentfulCard = props => {
  const {
    moduleConfig: {
      description,
      title,
      image,
      link,
      newTab,
      backgroundColor,
      showArrowIcon,
      imageMargin,
      previewMode,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}

  return (
    <Card
      description={previewMode ? description : html}
      title={title}
      image={image}
      link={link}
      newTab={newTab}
      backgroundColor={backgroundColor}
      showArrowIcon={showArrowIcon}
      imageMargin={imageMargin}
    />
  )
}

export default ContentfulCard

ContentfulCard.propTypes = {
  moduleConfig: PropTypes.shape({
    description: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    link: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.object,
    newTab: PropTypes.bool,
    backgroundColor: PropTypes.string,
    showArrowIcon: PropTypes.bool,
    imageMargin: PropTypes.bool,
  }),
}
