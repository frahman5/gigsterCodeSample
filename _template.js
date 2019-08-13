import React, { useEffect, useReducer } from 'react'
import Layout, { ScheduleContext } from '../../components/layout/layout'
import DescriptionSection from '../../components/page/enroll/description'
import SearchSection from '../../components/page/enroll/search'
import ProgramsSection from '../../components/page/enroll/programs'
import RegistrationSection from '../../components/page/enroll/registration'
import withLocation from '../../components/functionality/withLocation'

/* State for EnrollPage
- mode: one of 'selected', 'recommended', or 'searching'
- location: false || {lat: float, lng: float}
- activePgmId: int || false if no active program.
- accountDetails : false || {TK} // TODO -- fill in exactly what these would look like
*/

export const EnrollActionTypes = {
  changeMode: 'changeMode',
  successfulLogin: 'successfulLogin',
  changeActivePgmId: 'changeActivePgmId',
  changeLocation: 'changeLocation'
}

export const EnrollPageModes = {
  recommended: 'recommended',
  selected: 'selected',
  searching: 'searching'
}

function reducer (state, action) {
  switch (action.type) {
    case EnrollActionTypes.changeMode:
      return {
        ...state,
        mode: action.mode
      }
    case EnrollActionTypes.successfulLogin:
      return {
        ...state,
        accountDetails: action.accountDetails
      }
    case EnrollActionTypes.changeActivePgmId:
      return {
        ...state,
        activePgmId: action.activePgmId
      }
    case EnrollActionTypes.changeLocation:
      return {
        ...state,
        location: action.location
      }
    default:
      throw new Error()
  }
}

function EnrollTemplateNeedingSchedule ({
  search,
  descriptionText,
  headingText,
  pgmTypeId,
  learnMoreRelPath,
  schedule,
  ...props
}) {
  const getActivePgmIdInRecommendedMode = () => {
    if (schedule.recommended[pgmTypeId] === null) {
      return false
    }
    return parseInt(schedule.recommended[pgmTypeId])
  }

  //   Which mode are we in? And what's the active pgm id?
  var initialMode = 'recommended' // default to recommended
  var activePgmId = getActivePgmIdInRecommendedMode()
  // But if we're in selected, switch as appropriate
  if ('selectedPgmId' in search) {
    initialMode = 'selected'
    activePgmId = parseInt(search.selectedPgmId)
  }

  //   Initialize state and create a reducer
  const [pageState, dispatchFunc] = useReducer(reducer, {
    mode: initialMode,
    location: { lat: 0.0, lng: 0.0 },
    activePgmId: activePgmId,
    accountDetails: false
  })

  //   Use an effect to update the active pgm id when the schedule finishes loading in if in recommended mode
  useEffect(
    () => {
      if (pageState.mode === EnrollPageModes.recommended) {
        dispatchFunc({
          type: EnrollActionTypes.changeActivePgmId,
          activePgmId: getActivePgmIdInRecommendedMode()
        })
      }
    },
    [schedule]
  )

  // Use an effect to check if the url query params changed and update state accordingly.
  useEffect(
    () => {
      if ('selectedPgmId' in search) {
        if (pageState.activePgmId !== search.selectedPgmId) {
          dispatchFunc({ type: EnrollActionTypes.changeMode, mode: 'selected' })
          dispatchFunc({
            type: EnrollActionTypes.changeActivePgmId,
            activePgmId: search.selectedPgmId
          })
        }
      }
    },
    [search]
  )

  return (
    <>
      <DescriptionSection
        headingText={headingText}
        descriptionText={descriptionText}
        learnMoreRelPath={learnMoreRelPath}
      />
      <SearchSection
        pgmTypeId={pgmTypeId}
        mode={pageState.mode}
        dispatchFunc={dispatchFunc}
      />
      <ProgramsSection
        mode={pageState.mode}
        location={pageState.location}
        pgmTypeId={pgmTypeId}
        activePgmId={pageState.activePgmId}
        schedule={schedule}
        noProgramsMessage={
          'Sorry, no programs were found. Please try another location.'
        }
      />
      <RegistrationSection
        pgmId={pageState.activePgmId}
        program={schedule.programsIndexedByPgmID[activePgmId]}
        pgmTypeId={pgmTypeId}
      />
    </>
  )
}
function EnrollTemplate ({
  search,
  descriptionText,
  headingText,
  pgmTypeId,
  learnMoreRelPath,
  seoProps
}) {
  return (
    <Layout seoProps={seoProps}>
      <ScheduleContext.Consumer>
        {schedule => (
          <EnrollTemplateNeedingSchedule
            search={search}
            descriptionText={descriptionText}
            headingText={headingText}
            pgmTypeId={pgmTypeId}
            learnMoreRelPath={learnMoreRelPath}
            schedule={schedule}
          />
        )}
      </ScheduleContext.Consumer>
    </Layout>
  )
}

export default withLocation(EnrollTemplate)
