import React from 'react'
import Button from '../../components/button'

// PLAIN:
export function PrimaryButton (props) {
  return <Button {...props} type="primary" />
}

export function RegularButton (props) {
  return <Button {...props} type="regular" />
}

export const SecondaryButton = RegularButton

export function TertiaryButton (props) {
  return <Button {...props} type="tertiary" />
}

export function TextButton (props) {
  return <Button {...props} type="text" />
}

// CORE:
export function CoreButton (props) {
  return <Button {...props} theme="core" />
}

export function PrimaryCoreButton (props) {
  return <CoreButton {...props} type="primary" />
}

export function RegularCoreButton (props) {
  return <CoreButton {...props} type="regular" />
}

export const SecondaryCoreButton = RegularCoreButton

export function TertiaryCoreButton (props) {
  return <CoreButton {...props} type="tertiary" />
}

export function TextCoreButton (props) {
  return <CoreButton {...props} type="text" />
}
