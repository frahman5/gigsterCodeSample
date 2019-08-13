import React from 'react'
import EnrollTemplate from './_template.js'
import { IEProgramType } from '../../api/programsAPI'
import socialImage from '../../images/social/IEO_social-share1200x630_iec.jpg'

export default function CompletionPage (props) {
  const descriptionText = (
    <>
      {`Available to those who have completed Inner Engineering Online, 
      this program is an opportunity to deepen your experience of the online course by learning `}
      <span style={{ fontStyle: 'italic' }}>{`Shambhavi Mahamudra Kriya`}</span>
      {`, a powerful and purifying energy technique which incorporates the breath,
       along with a set of preparatory, rejuvenating, and invigorating asanas.`}
      <br />
      <br />
      <strong>Prerequisite: Inner Engineering Online</strong>
      <br />
      <br />
    </>
  )

  return (
    <EnrollTemplate
      headingText='Inner Engineering Completion'
      descriptionText={descriptionText}
      pgmTypeId={IEProgramType.IEC}
      learnMoreRelPath='/completion'
      seoProps={{
        title: 'Enroll in Inner Engineering Completion',
        description:
          'Available to those who have completed Inner Engineering Online, this program is an opportunity to deepen your experience of the online course by learning Shambhavi Mahamudra Kriya.',
        image: socialImage
      }}
    />
  )
}
