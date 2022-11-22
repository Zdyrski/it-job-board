export interface AddressDataInterface {
    country: string
    city: string
    street: string
}

export interface OfferTaglineInterface {
    companyName: string
    addressData: AddressDataInterface
    remoteStatus: string
    mainTags: string[]
}

export interface MoneyRangeInterface {
    min: number
    max: number
    currency: string
}

export interface CompanyInterface {
    logoSrc: string
}

export interface OfferInterface {
    offerId: string
    addressData: AddressDataInterface;
    companyLogoUrl: string
    companyName: string
    date : string
    remoteStatus: string
    salary: string
    tags: string[]
    title: string
    approvalStatus?: number
    archived?: boolean
}

export interface AdminOfferInterface extends OfferInterface {
    approvalStatus: number
    archived: boolean
}

export interface OffersListInterface {
    link: string
    params?: URLSearchParams
}

export interface SkillInterface {
    skillName: string
    level: number
}

export interface ContractInterface {
    name: string
    undisclosed: boolean
    minMoney: number
    maxMoney: number
}

export interface AlertsComponentInterface {
    openError: boolean
    openSuccess: boolean
    errorMessage: string
    successMessage: string
}

export interface OfferDetailedInterface {
    title: string
    companyName: string
    companySize: number
    companyLogoUrl: string
    companySiteUrl: string
    experienceLevel: string
    addressData: AddressDataInterface
    remote: string
    contracts: ContractInterface[]
    techStack: SkillInterface[]
    description: string
    date: string
}

export interface OfferAndCompanyShortInterface {
    title: string
    companyName: string
    companySize: number
    companyLogoUrl: string
    companySiteUrl: string
    experienceLevel: string
    addressData: AddressDataInterface
    remoteStatus: string
    contracts: ContractInterface[]
    date: string
}

export interface TechStackInterface {
    errorsState: boolean
    techStack: SkillInterface[]
    setTechStack: React.Dispatch<React.SetStateAction<any>>
}

export interface OfferDetailedMainInterface {
    data: OfferDetailedInterface
}

export interface ProtectedRouteInterface {
    role?: string
    authority: string
    children: React.ReactNode
}

export interface AdminUserInterface {
    id: string
    email: string
    role: string
    joinDate: string
    locked: boolean
    active: boolean
}

export interface FilterDrawerInterface {
    open: boolean
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>
}
