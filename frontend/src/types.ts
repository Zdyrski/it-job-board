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

export interface OfferDetailedInterface {
    title: string
    companyName: string
    companySize: number
    companyLogoUrl: string
    companySiteUrl: string
    experienceLevel: string
    city: string
    remote: string
    contracts: ContractInterface[]
    techStack: SkillInterface[]
    description: string
    date: string
}

export interface TechStackInterface {
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
