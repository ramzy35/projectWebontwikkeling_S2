export interface dataset_Fabrikanten {
    id: number;
    naam: string;
    land: string;
    opgericht: number;
    logo: string;
}

export interface dataset_autos {
    id: number;
    naam: string;
    beschrijving: string;
    prijs: number;
    beschikbaar: boolean;
    bouwjaar: string;
    afbeelding: string;
    brandstof: "Elektrisch" | "Benzine" | "Diesel" | "Hybride";
    kenmerken: string[];
    fabrikant: dataset_Fabrikanten;
}