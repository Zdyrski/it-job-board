/* eslint-disable no-unused-vars */
import { MouseEventHandler } from 'react';

export interface OfferTaglineInterface {
    companyName: string
    location: string
    remote: string
    mainTags: Array<string>
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
    companyInfo: CompanyInterface
    offerName: string
    salary : MoneyRangeInterface
    tagline: OfferTaglineInterface
    id: number
}

export interface OffersListInterface {
    data: OfferInterface[]
}

export interface SkillInterface {
    skillName: string
    level: number
}
