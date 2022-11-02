/* eslint-disable no-unused-vars */
import { MouseEventHandler } from 'react';

export interface OfferTaglineInterface {
    companyName: string
    location: string
    remote: string
    mainTags: string[]
}

export interface MoneyRangeInterface {
    min: number
    max: number
    currency: string
}

export interface CompanyInterface {
    name: string
    logoSrc: string
}

export interface OfferInterface {
    offerId: string
    city: string;
    companyLogoUrl: string
    companyName: string
    date : string
    remote: string
    salary: string
    tags: string[]
    title: string
}

export interface OffersListInterface {
    data: OfferInterface[]
}

export interface SkillInterface {
    skillName: string
    level: number
}

export interface contractInterface {
    name: string
    salaryUndisclosed: boolean
    minMoney: number
    maxMoney: number
}

export interface AlertsComponentInterface {
    openError: boolean
    openSuccess: boolean
    errorMessage: string
    successMessage: string
}
