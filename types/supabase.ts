export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      airports: {
        Row: {
          continent: string | null
          elevation_ft: string | null
          gps_code: string | null
          home_link: string | null
          iata_code: string | null
          id: number
          ident: string
          iso_country: string | null
          iso_region: string | null
          keywords: string | null
          latitude_deg: number
          local_code: string | null
          longitude_deg: number
          municipality: string | null
          name: string | null
          scheduled_service: string | null
          type: string | null
          wikipedia_link: string | null
        }
        Insert: {
          continent?: string | null
          elevation_ft?: string | null
          gps_code?: string | null
          home_link?: string | null
          iata_code?: string | null
          id: number
          ident: string
          iso_country?: string | null
          iso_region?: string | null
          keywords?: string | null
          latitude_deg: number
          local_code?: string | null
          longitude_deg: number
          municipality?: string | null
          name?: string | null
          scheduled_service?: string | null
          type?: string | null
          wikipedia_link?: string | null
        }
        Update: {
          continent?: string | null
          elevation_ft?: string | null
          gps_code?: string | null
          home_link?: string | null
          iata_code?: string | null
          id?: number
          ident?: string
          iso_country?: string | null
          iso_region?: string | null
          keywords?: string | null
          latitude_deg?: number
          local_code?: string | null
          longitude_deg?: number
          municipality?: string | null
          name?: string | null
          scheduled_service?: string | null
          type?: string | null
          wikipedia_link?: string | null
        }
        Relationships: []
      }
      airports_freq: {
        Row: {
          airport_ident: string | null
          airport_ref: number | null
          description: string | null
          frequency_mhz: number | null
          id: number
          type: string | null
        }
        Insert: {
          airport_ident?: string | null
          airport_ref?: number | null
          description?: string | null
          frequency_mhz?: number | null
          id: number
          type?: string | null
        }
        Update: {
          airport_ident?: string | null
          airport_ref?: number | null
          description?: string | null
          frequency_mhz?: number | null
          id?: number
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "airports_freq_airport_ref_fkey"
            columns: ["airport_ref"]
            isOneToOne: false
            referencedRelation: "airports"
            referencedColumns: ["id"]
          },
        ]
      }
      Fleet: {
        Row: {
          Airline: string | null
          departure: string | null
          destination: string | null
          favourite: boolean
          ICAO: string | null
          owner: string
          Reg: string
          uuid: string
        }
        Insert: {
          Airline?: string | null
          departure?: string | null
          destination?: string | null
          favourite?: boolean
          ICAO?: string | null
          owner?: string
          Reg: string
          uuid?: string
        }
        Update: {
          Airline?: string | null
          departure?: string | null
          destination?: string | null
          favourite?: boolean
          ICAO?: string | null
          owner?: string
          Reg?: string
          uuid?: string
        }
        Relationships: []
      }
      Flights: {
        Row: {
          aircraft: string | null
          arrival_time: string | null
          completed: boolean | null
          created_at: string
          date: string | null
          departure_time: string | null
          destination: string | null
          distance: string | null
          owner: string | null
          start: string | null
          uuid: string
        }
        Insert: {
          aircraft?: string | null
          arrival_time?: string | null
          completed?: boolean | null
          created_at?: string
          date?: string | null
          departure_time?: string | null
          destination?: string | null
          distance?: string | null
          owner?: string | null
          start?: string | null
          uuid?: string
        }
        Update: {
          aircraft?: string | null
          arrival_time?: string | null
          completed?: boolean | null
          created_at?: string
          date?: string | null
          departure_time?: string | null
          destination?: string | null
          distance?: string | null
          owner?: string | null
          start?: string | null
          uuid?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string
          name: string | null
        }
        Insert: {
          email?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Airline:
        | "Aegean Airlines"
        | "Aer Lingus"
        | "Aeroflot"
        | "Aerolineas Argentinas"
        | "Aeromexico"
        | "Air Arabia"
        | "Air Astana"
        | "Air Austral"
        | "Air Baltic"
        | "Air Belgium"
        | "Air Canada"
        | "Air Caraibes"
        | "Air China"
        | "Air Corsica"
        | "Air Dolomiti"
        | "Air Europa"
        | "Air France"
        | "Air India"
        | "Air India Express"
        | "Air Macau"
        | "Air Malta"
        | "Air Mauritius"
        | "Air Namibia"
        | "Air New Zealand"
        | "Air North"
        | "Air Seoul"
        | "Air Serbia"
        | "Air Tahiti Nui"
        | "Air Transat"
        | "Air Vanuatu"
        | "AirAsia"
        | "AirAsia X"
        | "Aircalin"
        | "Alaska Airlines"
        | "Alitalia"
        | "Allegiant"
        | "American Airlines"
        | "ANA"
        | "Asiana"
        | "Austrian"
        | "Azerbaijan Hava Yollary"
        | "Azores Airlines"
        | "Azul"
        | "Bamboo Airways"
        | "Bangkok Airways"
        | "British Airways"
        | "Brussels Airlines"
        | "Caribbean Airlines"
        | "Cathay Dragon"
        | "Cathay Pacific"
        | "Cayman Airways"
        | "CEBU Pacific Air"
        | "China Airlines"
        | "China Eastern"
        | "China Southern"
        | "Condor"
        | "Copa Airlines"
        | "Croatia Airlines"
        | "Czech Airlines"
        | "Delta"
        | "easyJet"
        | "Edelweiss Air"
        | "Egyptair"
        | "EL AL"
        | "Emirates"
        | "Ethiopian Airlines"
        | "Etihad"
        | "Eurowings"
        | "EVA Air"
        | "Fiji Airways"
        | "Finnair"
        | "flydubai"
        | "FlyOne"
        | "French bee"
        | "Frontier"
        | "Garuda Indonesia"
        | "Gol"
        | "Gulf Air"
        | "Hainan Airlines"
        | "Hawaiian Airlines"
        | "Helvetic Airways"
        | "HK Express"
        | "Hong Kong Airlines"
        | "Iberia"
        | "Icelandair"
        | "IndiGo Airlines"
        | "InterJet"
        | "Japan Airlines"
        | "Jeju Air"
        | "Jet2"
        | "JetBlue"
        | "Jetstar"
        | "Jin Air"
        | "Kenya Airways"
        | "KLM"
        | "Korean Air"
        | "Kulula"
        | "La Compagnie"
        | "LATAM"
        | "Lion Airlines"
        | "LOT Polish Airlines"
        | "Lufthansa"
        | "Luxair"
        | "Malaysia Airlines"
        | "Mango"
        | "Middle East Airlines"
        | "Nok Air"
        | "Nordwind Airlines"
        | "Norwegian Air International"
        | "Norwegian Air Shuttle"
        | "Norwegian Air Sweden"
        | "Norwegian Air UK"
        | "Oman Air"
        | "Pakistan International Airlines"
        | "Peach"
        | "Pegasus Airlines"
        | "Philippine Airlines"
        | "Porter"
        | "Qantas"
        | "Qatar Airways"
        | "Regional Express"
        | "Rossiya - Russian Airlines"
        | "Royal Air Maroc"
        | "Royal Brunei"
        | "Royal Jordanian"
        | "RwandAir"
        | "Ryanair"
        | "S7 Airlines"
        | "SAS"
        | "Saudia"
        | "Scoot Airlines"
        | "Shanghai Airlines"
        | "Silkair"
        | "Silver"
        | "Singapore Airlines"
        | "Skylanes"
        | "South African Airways"
        | "Southwest"
        | "SpiceJet"
        | "Spirit"
        | "Spring Airlines"
        | "Spring Japan"
        | "SriLankan Airlines"
        | "Sun Country"
        | "Sunclass Airlines"
        | "Sunwing"
        | "SWISS"
        | "Swoop"
        | "TAAG"
        | "TACA"
        | "TAP Portugal"
        | "THAI"
        | "tigerair Australia"
        | "Transavia Airlines"
        | "TUI UK"
        | "TUIfly"
        | "Tunis Air"
        | "Turkish Airlines"
        | "Ukraine International"
        | "United"
        | "Ural Airlines"
        | "UTair Aviation"
        | "Uzbekistan Airways"
        | "Vietnam Airlines"
        | "Virgin Atlantic"
        | "Virgin Australia"
        | "Vistara"
        | "Viva Aerobus"
        | "Volaris"
        | "Volotea"
        | "Vueling Airlines"
        | "WestJet"
        | "Wizzair"
        | "Xiamen Airlines"
      Reg:
        | "G-DBCA"
        | "G-DBCB"
        | "G-DBCC"
        | "G-DBCD"
        | "G-DBCE"
        | "G-DBCF"
        | "G-DBCG"
        | "G-DBCH"
        | "G-DBCJ"
        | "G-DBCK"
        | "G-EUOA"
        | "G-EUOE"
        | "G-EUOF"
        | "G-EUOG"
        | "G-EUPD"
        | "G-EUPJ"
        | "G-EUPK"
        | "G-EUPL"
        | "G-EUPN"
        | "G-EUPO"
        | "G-EUPP"
        | "G-EUPR"
        | "G-EUPS"
        | "G-EUPT"
        | "G-EUPU"
        | "G-EUPW"
        | "G-EUPY"
        | "G-EUPZ"
        | "G-EUPG"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
