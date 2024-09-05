export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Aircraft: {
        Row: {
          Aircraft: string | null
          Airline: string | null
          id: number
          Registration: string | null
        }
        Insert: {
          Aircraft?: string | null
          Airline?: string | null
          id?: number
          Registration?: string | null
        }
        Update: {
          Aircraft?: string | null
          Airline?: string | null
          id?: number
          Registration?: string | null
        }
        Relationships: []
      }
      Fleet: {
        Row: {
          Airline: string | null
          ICAO: string | null
          id: number
          owner: string
          Reg: string | null
        }
        Insert: {
          Airline?: string | null
          ICAO?: string | null
          id?: number
          owner?: string
          Reg?: string | null
        }
        Update: {
          Airline?: string | null
          ICAO?: string | null
          id?: number
          owner?: string
          Reg?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string
          name: string | null
          Reg: string | null
        }
        Insert: {
          email?: string | null
          id?: string
          name?: string | null
          Reg?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string | null
          Reg?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_Reg_fkey"
            columns: ["Reg"]
            isOneToOne: true
            referencedRelation: "Aircraft"
            referencedColumns: ["Registration"]
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
