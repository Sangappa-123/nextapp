import React from 'react'
import DashboardStyle from './dashboard.module.scss'

export default function DashboardComponent (): any {
  return (
    <div className={DashboardStyle.container}>
      <div>Welcome to dashboard</div>
    </div>
  )
}
