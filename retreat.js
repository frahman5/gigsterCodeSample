import React from 'react'
import EnrollTemplate from './_template.js'
import { IEProgramType } from '../../api/programsAPI'
import socialImage from '../../images/social/IEO_social-share1200x630_ier.jpg'

export default function RetreatPage () {
  const descriptionText = (
    <>
      {`Offered at the Isha Institute of Inner-sciences in Tennessee, this residential retreat includes the content of Inner Engineering Online, live transmission of `}
      <span style={{ fontStyle: 'italic' }}>{`Shambhavi Mahamudra Kriya`}</span>
      {`, hikes in forested trails and other highlights for an immersive and rejuvenating experience.`}
      <br />
      <br />
    </>
  )
  return (
    <EnrollTemplate
      headingText='Inner Engineering Retreat'
      descriptionText={descriptionText}
      pgmTypeId={IEProgramType.IER}
      learnMoreRelPath='/retreat'
      seoProps={{
        title: 'Enroll in Inner Engineering Retreat',
        description:
          'Offered at the Isha Institute of Inner-sciences in Tennessee, this residential retreat includes the content of Inner Engineering Online, live transmission of Shambhavi Mahamudra Kriya, hikes in forested trails and other highlights for an immersive and rejuvenating experience.',
        image: socialImage
      }}
    />
  )
}
