import React from 'react'
import EnrollTemplate from './_template.js'
import { IEProgramType } from '../../api/programsAPI'
import ieTotalSocialImage from '../../images/social/IEO_social-share1200x630_iet.jpg'

export default function TotalPage (props) {
  const descriptionText = (
    <>
      {`This program combines the components of Inner Engineering Online and live transmission of `}
      <span style={{ fontStyle: 'italic' }}>{`Shambhavi Mahamudra Kriya`}</span>
      {`, a powerful yogic practice of immeasurable transformative power.`}
      <br />
      <br />
    </>
  )
  return (
    <EnrollTemplate
      headingText='Inner Engineering Total'
      descriptionText={descriptionText}
      pgmTypeId={IEProgramType.IET}
      learnMoreRelPath='/total'
      seoProps={{
        title: 'Enroll in Inner Engineering Total',
        description:
          'This program combines the components of Inner Engineering Online and live transmission of Shambhavi Mahamudra Kriya, a powerful yogic practice of immeasurable transformative power.',
        image: ieTotalSocialImage
      }}
    />
  )
}
