import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {CmpModal} from './component'

import {STEPS} from '../settings'

export class CmpModalContainer extends Component {
  state = {
    consentKey: 0,
    fetchingPurposes: false,
    purposeConsents: {},
    purposes: [],
    step: STEPS.GENERAL,
    vendorConsents: {},
    vendors: []
  }

  async componentDidMount() {
    this.setState({fetchingPurposes: true})
    const {getPurposesAndVendors, retrieveConsentsFromCmp} = this.props
    const purposesAndVendors = await getPurposesAndVendors.execute({
      retrieveConsentsFromCmp
    })
    this.setState({...purposesAndVendors, fetchingPurposes: false})
  }

  _getKeyOfConsentToUpdate({isVendor}) {
    const consentToUpdate = isVendor ? 'vendor' : 'purpose'
    return `${consentToUpdate}Consents`
  }

  _handleToggleConsent = ({enabled, id, isVendor}) => {
    const key = this._getKeyOfConsentToUpdate({isVendor})

    this.setState(state => ({
      [key]: {
        ...state[key],
        [id]: enabled
      }
    }))
  }

  _handleToggleAll = ({enabled, isVendor}) => {
    const key = this._getKeyOfConsentToUpdate({isVendor})

    this.setState(state => {
      const consents = Object.keys(state[key]).reduce((acc, consentId) => {
        acc[consentId] = enabled
        return acc
      }, {})
      return {[key]: consents, consentKey: state.consentKey + 1}
    })
  }

  _handleAccept = async () => {
    const {sendConsents, onExit} = this.props
    const {purposeConsents, vendorConsents} = this.state
    await sendConsents.execute({purposeConsents, vendorConsents})
    onExit()
  }

  _handleBack = () => {
    this.setState({step: STEPS.GENERAL})
  }

  _handleOpenAdsStep = e => {
    e.preventDefault()
    this.setState({step: STEPS.ADVERTISEMENT})
  }

  render() {
    const {lang, logo, privacyUrl} = this.props
    const {
      consentKey,
      fetchingPurposes,
      purposes,
      purposeConsents,
      step,
      vendors,
      vendorConsents
    } = this.state

    return (
      <CmpModal
        consentKey={consentKey}
        fetchingPurposes={fetchingPurposes}
        lang={lang}
        logo={logo}
        onAccept={this._handleAccept}
        onBack={this._handleBack}
        onOpenAdsStep={this._handleOpenAdsStep}
        onToggleAll={this._handleToggleAll}
        onToggleConsent={this._handleToggleConsent}
        purposeConsents={purposeConsents}
        purposes={purposes}
        privacyUrl={privacyUrl}
        step={step}
        vendorConsents={vendorConsents}
        vendors={vendors}
      />
    )
  }
}

CmpModalContainer.propTypes = {
  getPurposesAndVendors: PropTypes.object,
  lang: PropTypes.string,
  logo: PropTypes.string,
  onExit: PropTypes.func,
  privacyUrl: PropTypes.string,
  retrieveConsentsFromCmp: PropTypes.bool,
  sendConsents: PropTypes.object
}
