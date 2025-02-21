import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import Loadable from '@loadable/component'
import Popup from './Popup'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { Section, SectionTitle } from './StyledGeneral'

const LogoAnimation = Loadable(() => import('./LogoAnimation/'))

const FullWidthCta = props => {
  const {
    cta,
    description,
    showLogoAnimation,
    backgroundColor,
    headline,
    hubSpotForm,
    marginBottom,
    logoType,
    sectionPadding,
  } = props

  const [showPopup, setShowPopup] = React.useState(false)
  const togglePopup = () => {
    setShowPopup(!showPopup)
  }
  const onClosePopup = () => {
    setShowPopup(false)
  }
  return (
    <Container
      sectionPadding={sectionPadding}
      backgroundColor={backgroundColor}
    >
      <ContentWrapper>
        <FullWidthCtaWrapper showLogoAnimation={showLogoAnimation}>
          {showLogoAnimation ? <LogoAnimation logoType={logoType} /> : null}
          <FullWidthCtaInner
            marginBottom={marginBottom}
            backgroundColor={backgroundColor}
          >
            {headline ? (
              <Headline
                backgroundColor={backgroundColor}
                showLogoAnimation={showLogoAnimation}
                hasDescription={!!description}
              >
                {headline}
              </Headline>
            ) : null}
            {description ? (
              <Description>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </Description>
            ) : null}
            {cta ? (
              <CTAWrapper>
                {contentfulModuleToComponent({
                  ...cta,
                  link: hubSpotForm ? '' : cta.ctaLink,
                  customClick: hubSpotForm ? () => togglePopup() : null,
                })}
              </CTAWrapper>
            ) : null}
            {hubSpotForm ? (
              <Popup showPopup={showPopup} onClosePopup={onClosePopup}>
                {contentfulModuleToComponent({
                  ...hubSpotForm,
                })}
              </Popup>
            ) : null}
          </FullWidthCtaInner>
        </FullWidthCtaWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(FullWidthCta)

FullWidthCta.propTypes = {
  image: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.object.isRequired),
  sectionPadding: PropTypes.string,
}

const Container = styled(Section)`
  ${({ backgroundColor, theme }) =>
    backgroundColor === 'dark'
      ? `
  background: ${theme.dark};
  `
      : `
  background: ${theme.white};
  `}
`

const FullWidthCtaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${({ showLogoAnimation, theme }) =>
    showLogoAnimation
      ? `
      @media (max-width: ${theme.device.mobileMediaMax}) {
        width: 100%;
        align-items: stretch;
      }
  `
      : ``}
`

const Headline = styled(SectionTitle)`
  ${({ backgroundColor, theme }) =>
    backgroundColor === 'dark'
      ? `
  color: ${theme.white};
  `
      : `
  color: ${theme.black};
  `}

  ${({ showLogoAnimation }) => (showLogoAnimation ? 'padding-top: 0;' : '')}

  ${({ hasDescription }) =>
    hasDescription ? 'font-size: 32px !important;' : ''}
`

const FullWidthCtaInner = styled.div`
  display: block;
  color: #fff;
  ${({ backgroundColor, theme }) =>
    backgroundColor === 'dark'
      ? `
    color: ${theme.white};
  `
      : `
    color: ${theme.black};
  `}
  
  ${({ marginBottom }) =>
    marginBottom
      ? `
    margin-bottom: ${marginBottom};
  `
      : ''}

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    margin-bottom: 0;
  }
`
const CTAWrapper = styled.div`
  margin-top: 32px;
  ${({ showLogoAnimation, theme }) =>
    showLogoAnimation
      ? `
      @media (max-width: ${theme.device.mobileMediaMax}) {
        width: 100%;
      }
  `
      : ``}

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}){
    .button {
      width: 100%;
    }
  }
`

const Description = styled.div`
  display: block;
  margin-top: 8px;
  & + ${CTAWrapper} {
    margin-top: 24px;
  }
`
