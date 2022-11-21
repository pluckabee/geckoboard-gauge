import { CurrencyCode } from './currencies'

enum GaugeDataFormat {
    'currency'
}

export interface GaugeData {
    min: number
    max: number
    value: number
    format?: GaugeDataFormat
    unit?: CurrencyCode
}

export interface GaugeDataError {
    error: string
}

export type GaugeDataResponse = GaugeData & GaugeDataError