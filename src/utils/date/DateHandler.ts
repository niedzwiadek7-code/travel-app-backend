import { Dayjs, ManipulateType, UnitType } from 'dayjs'
import dayjs = require('dayjs')
import isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
import timezone = require('dayjs/plugin/timezone')
import utc = require('dayjs/plugin/utc')
import { DateType } from './types'

dayjs.extend(isSameOrAfter)
dayjs.extend(utc)
dayjs.extend(timezone)

export class DateHandler {
  private currentDate: Dayjs

  constructor(date: DateType = new Date()) {
    this.currentDate = dayjs(date).utc(true)

    if (!this.currentDate.isValid()) {
      const dateStr = `01-01-1970 ${date}`
      this.currentDate = dayjs(dateStr)
    }
  }

  static compareDates(
    date1: DateType,
    date2: DateType,
  ) {
    if (dayjs(date1).isSame(date2)) return 0
    return dayjs(date1).isSameOrAfter(date2) ? 1 : -1
  }

  add(count: number, unit: ManipulateType) {
    this.currentDate = this.currentDate.add(count, unit)
    return this
  }

  subtract(count: number, unit: ManipulateType) {
    this.currentDate = this.currentDate.subtract(count, unit)
    return this
  }

  set(unit: UnitType, value: number) {
    this.currentDate = this.currentDate.set(unit, value)
    return this
  }

  get(unit: UnitType) {
    return this.currentDate.get(unit)
  }

  format(mask: string) {
    return this.currentDate.format(mask)
  }

  toISOString() {
    return this.currentDate.toISOString()
  }
}
