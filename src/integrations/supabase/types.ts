export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      anniversary_checkins: {
        Row: {
          checked_in_at: string
          checked_in_by: string | null
          day: number
          id: string
          registration_id: string
        }
        Insert: {
          checked_in_at?: string
          checked_in_by?: string | null
          day: number
          id?: string
          registration_id: string
        }
        Update: {
          checked_in_at?: string
          checked_in_by?: string | null
          day?: number
          id?: string
          registration_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "anniversary_checkins_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "anniversary_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      anniversary_registrations: {
        Row: {
          category: string
          consent: boolean
          country: string | null
          created_at: string
          days_attending: string[]
          email: string
          email_sent_at: string | null
          full_name: string
          id: string
          job_title: string | null
          meta: Json | null
          nice_reg_no: string | null
          organization: string | null
          phone: string
          state: string | null
          status: string
          ticket_code: string
        }
        Insert: {
          category: string
          consent?: boolean
          country?: string | null
          created_at?: string
          days_attending?: string[]
          email: string
          email_sent_at?: string | null
          full_name: string
          id?: string
          job_title?: string | null
          meta?: Json | null
          nice_reg_no?: string | null
          organization?: string | null
          phone: string
          state?: string | null
          status?: string
          ticket_code: string
        }
        Update: {
          category?: string
          consent?: boolean
          country?: string | null
          created_at?: string
          days_attending?: string[]
          email?: string
          email_sent_at?: string | null
          full_name?: string
          id?: string
          job_title?: string | null
          meta?: Json | null
          nice_reg_no?: string | null
          organization?: string | null
          phone?: string
          state?: string | null
          status?: string
          ticket_code?: string
        }
        Relationships: []
      }
      anniversary_sponsorships: {
        Row: {
          addons: Json | null
          address: string | null
          application_no: string
          application_type: string
          booth_type: string | null
          confirmation_email_sent_at: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_title: string | null
          created_at: string
          currency: string
          id: string
          industry: string | null
          meta: Json | null
          notes: string | null
          org_name: string
          package: string | null
          paid_at: string | null
          payment_status: string
          remita_order_id: string | null
          remita_payment_url: string | null
          remita_rrr: string | null
          total_amount: number
          updated_at: string
          website: string | null
        }
        Insert: {
          addons?: Json | null
          address?: string | null
          application_no: string
          application_type: string
          booth_type?: string | null
          confirmation_email_sent_at?: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_title?: string | null
          created_at?: string
          currency?: string
          id?: string
          industry?: string | null
          meta?: Json | null
          notes?: string | null
          org_name: string
          package?: string | null
          paid_at?: string | null
          payment_status?: string
          remita_order_id?: string | null
          remita_payment_url?: string | null
          remita_rrr?: string | null
          total_amount?: number
          updated_at?: string
          website?: string | null
        }
        Update: {
          addons?: Json | null
          address?: string | null
          application_no?: string
          application_type?: string
          booth_type?: string | null
          confirmation_email_sent_at?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          contact_title?: string | null
          created_at?: string
          currency?: string
          id?: string
          industry?: string | null
          meta?: Json | null
          notes?: string | null
          org_name?: string
          package?: string | null
          paid_at?: string | null
          payment_status?: string
          remita_order_id?: string | null
          remita_payment_url?: string | null
          remita_rrr?: string | null
          total_amount?: number
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          admin_notes: string | null
          application_no: string | null
          application_type: string | null
          documents: Json | null
          id: string
          intended_grade: string | null
          payment_reference: string | null
          reviewed_at: string | null
          status: string | null
          submitted_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          application_no?: string | null
          application_type?: string | null
          documents?: Json | null
          id?: string
          intended_grade?: string | null
          payment_reference?: string | null
          reviewed_at?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          application_no?: string | null
          application_type?: string | null
          documents?: Json | null
          id?: string
          intended_grade?: string | null
          payment_reference?: string | null
          reviewed_at?: string | null
          status?: string | null
          submitted_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string | null
          actor_id: string | null
          created_at: string | null
          data: Json | null
          id: string
          target_id: string | null
          target_table: string | null
        }
        Insert: {
          action?: string | null
          actor_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          target_id?: string | null
          target_table?: string | null
        }
        Update: {
          action?: string | null
          actor_id?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          target_id?: string | null
          target_table?: string | null
        }
        Relationships: []
      }
      certificate_recipients: {
        Row: {
          certificate_id: string
          created_at: string | null
          id: string
          recipient_email: string
          recipient_name: string
          sent_at: string | null
        }
        Insert: {
          certificate_id: string
          created_at?: string | null
          id?: string
          recipient_email: string
          recipient_name: string
          sent_at?: string | null
        }
        Update: {
          certificate_id?: string
          created_at?: string | null
          id?: string
          recipient_email?: string
          recipient_name?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificate_recipients_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificate_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      certificate_templates: {
        Row: {
          certificate_template_url: string | null
          created_at: string | null
          date_placeholder: string | null
          event_name: string
          id: string
          name_placeholder: string | null
        }
        Insert: {
          certificate_template_url?: string | null
          created_at?: string | null
          date_placeholder?: string | null
          event_name: string
          id?: string
          name_placeholder?: string | null
        }
        Update: {
          certificate_template_url?: string | null
          created_at?: string | null
          date_placeholder?: string | null
          event_name?: string
          id?: string
          name_placeholder?: string | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_url: string | null
          event_id: string | null
          id: string
          issued_at: string | null
          issued_by: string | null
          user_id: string
        }
        Insert: {
          certificate_url?: string | null
          event_id?: string | null
          id?: string
          issued_at?: string | null
          issued_by?: string | null
          user_id: string
        }
        Update: {
          certificate_url?: string | null
          event_id?: string | null
          id?: string
          issued_at?: string | null
          issued_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_issued_by_fkey"
            columns: ["issued_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_bank_accounts: {
        Row: {
          account_number: string
          bank_code: string
          bank_name: string | null
          beneficiary_name: string
          chapter_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
        }
        Insert: {
          account_number: string
          bank_code: string
          bank_name?: string | null
          beneficiary_name: string
          chapter_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
        }
        Update: {
          account_number?: string
          bank_code?: string
          bank_name?: string | null
          beneficiary_name?: string
          chapter_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      chapter_excos: {
        Row: {
          chapter_id: string
          created_at: string | null
          full_name: string
          id: string
          position: string
          title_suffix: string | null
        }
        Insert: {
          chapter_id: string
          created_at?: string | null
          full_name: string
          id?: string
          position: string
          title_suffix?: string | null
        }
        Update: {
          chapter_id?: string
          created_at?: string | null
          full_name?: string
          id?: string
          position?: string
          title_suffix?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_excos_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_programs: {
        Row: {
          chapter_id: string
          created_at: string | null
          format: string | null
          id: string
          program_name: string
          schedule: string | null
        }
        Insert: {
          chapter_id: string
          created_at?: string | null
          format?: string | null
          id?: string
          program_name: string
          schedule?: string | null
        }
        Update: {
          chapter_id?: string
          created_at?: string | null
          format?: string | null
          id?: string
          program_name?: string
          schedule?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapter_programs_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          address: string | null
          contact_numbers: string[] | null
          created_at: string | null
          description: string | null
          email: string | null
          featured_image_url: string | null
          id: string
          name: string
          slug: string
          social_links: Json | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          contact_numbers?: string[] | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured_image_url?: string | null
          id?: string
          name: string
          slug: string
          social_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          contact_numbers?: string[] | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured_image_url?: string | null
          id?: string
          name?: string
          slug?: string
          social_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      conference_registrations: {
        Row: {
          address: string | null
          admin_note: string | null
          amount: number
          category: string
          chapter: string | null
          comments: string | null
          created_at: string
          dietary: string | null
          early_bird_applied: boolean
          email: string
          full_name: string
          id: string
          institution: string | null
          membership_status: string | null
          payment_method: Database["public"]["Enums"]["conf_payment_method"]
          payment_status: Database["public"]["Enums"]["conf_payment_status"]
          phone: string
          position: string | null
          receipt_path: string | null
          remita_reference: string | null
          remita_rrr: string | null
          updated_at: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          address?: string | null
          admin_note?: string | null
          amount?: number
          category: string
          chapter?: string | null
          comments?: string | null
          created_at?: string
          dietary?: string | null
          early_bird_applied?: boolean
          email: string
          full_name: string
          id?: string
          institution?: string | null
          membership_status?: string | null
          payment_method: Database["public"]["Enums"]["conf_payment_method"]
          payment_status?: Database["public"]["Enums"]["conf_payment_status"]
          phone: string
          position?: string | null
          receipt_path?: string | null
          remita_reference?: string | null
          remita_rrr?: string | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          address?: string | null
          admin_note?: string | null
          amount?: number
          category?: string
          chapter?: string | null
          comments?: string | null
          created_at?: string
          dietary?: string | null
          early_bird_applied?: boolean
          email?: string
          full_name?: string
          id?: string
          institution?: string | null
          membership_status?: string | null
          payment_method?: Database["public"]["Enums"]["conf_payment_method"]
          payment_status?: Database["public"]["Enums"]["conf_payment_status"]
          phone?: string
          position?: string | null
          receipt_path?: string | null
          remita_reference?: string | null
          remita_rrr?: string | null
          updated_at?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          ip_address: string | null
          message: string
          phone: string | null
          status: string | null
          subject: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          ip_address?: string | null
          message: string
          phone?: string | null
          status?: string | null
          subject?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          ip_address?: string | null
          message?: string
          phone?: string | null
          status?: string | null
          subject?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          id: string
          meta: Json | null
          storage_path: string | null
          type: string | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          meta?: Json | null
          storage_path?: string | null
          type?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          meta?: Json | null
          storage_path?: string | null
          type?: string | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attendance_status: string | null
          created_at: string | null
          event_id: string
          id: string
          payment_id: string | null
          user_id: string
        }
        Insert: {
          attendance_status?: string | null
          created_at?: string | null
          event_id: string
          id?: string
          payment_id?: string | null
          user_id: string
        }
        Update: {
          attendance_status?: string | null
          created_at?: string | null
          event_id?: string
          id?: string
          payment_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number | null
          category: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          featured_flyer_url: string | null
          id: string
          is_featured: boolean
          participation_mode: string | null
          registration_fee: number | null
          registration_form_url: string | null
          slug: string | null
          start_date: string | null
          title: string | null
          updated_at: string | null
          venue: string | null
          zoom_link: string | null
        }
        Insert: {
          capacity?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          featured_flyer_url?: string | null
          id?: string
          is_featured?: boolean
          participation_mode?: string | null
          registration_fee?: number | null
          registration_form_url?: string | null
          slug?: string | null
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
          venue?: string | null
          zoom_link?: string | null
        }
        Update: {
          capacity?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          featured_flyer_url?: string | null
          id?: string
          is_featured?: boolean
          participation_mode?: string | null
          registration_fee?: number | null
          registration_form_url?: string | null
          slug?: string | null
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
          venue?: string | null
          zoom_link?: string | null
        }
        Relationships: []
      }
      generated_letters: {
        Row: {
          created_at: string | null
          generated_pdf_url: string | null
          id: string
          recipient_id: string
          sent_at: string | null
          sent_status: string | null
          template_id: string
        }
        Insert: {
          created_at?: string | null
          generated_pdf_url?: string | null
          id?: string
          recipient_id: string
          sent_at?: string | null
          sent_status?: string | null
          template_id: string
        }
        Update: {
          created_at?: string | null
          generated_pdf_url?: string | null
          id?: string
          recipient_id?: string
          sent_at?: string | null
          sent_status?: string | null
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_letters_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_letters_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "letter_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      hq_construction_stages: {
        Row: {
          created_at: string | null
          date_label: string | null
          description: string | null
          id: string
          image_url: string | null
          stage_order: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          date_label?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          stage_order?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          date_label?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          stage_order?: number | null
          title?: string
        }
        Relationships: []
      }
      hq_contributors: {
        Row: {
          contribution_type: string | null
          created_at: string | null
          display_order: number | null
          full_name: string
          id: string
          photo_url: string | null
          role: string | null
        }
        Insert: {
          contribution_type?: string | null
          created_at?: string | null
          display_order?: number | null
          full_name: string
          id?: string
          photo_url?: string | null
          role?: string | null
        }
        Update: {
          contribution_type?: string | null
          created_at?: string | null
          display_order?: number | null
          full_name?: string
          id?: string
          photo_url?: string | null
          role?: string | null
        }
        Relationships: []
      }
      hq_gallery_images: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_type: string | null
          image_url: string
          is_featured: boolean | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_type?: string | null
          image_url: string
          is_featured?: boolean | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_type?: string | null
          image_url?: string
          is_featured?: boolean | null
        }
        Relationships: []
      }
      legacy_members: {
        Row: {
          application_date: string | null
          email: string | null
          firstname: string | null
          grade: string | null
          member_uid: string
          nse_no: string | null
          othername: string | null
          phone: string | null
          portal_user_id: string | null
          reg_no: string | null
          sn: number | null
          surname: string | null
        }
        Insert: {
          application_date?: string | null
          email?: string | null
          firstname?: string | null
          grade?: string | null
          member_uid: string
          nse_no?: string | null
          othername?: string | null
          phone?: string | null
          portal_user_id?: string | null
          reg_no?: string | null
          sn?: number | null
          surname?: string | null
        }
        Update: {
          application_date?: string | null
          email?: string | null
          firstname?: string | null
          grade?: string | null
          member_uid?: string
          nse_no?: string | null
          othername?: string | null
          phone?: string | null
          portal_user_id?: string | null
          reg_no?: string | null
          sn?: number | null
          surname?: string | null
        }
        Relationships: []
      }
      legacy_payments: {
        Row: {
          firstname: string | null
          grade: string | null
          id: number
          othername: string | null
          outstanding_balance: number
          reg_no: string | null
          sn: number | null
          surname: string | null
        }
        Insert: {
          firstname?: string | null
          grade?: string | null
          id?: never
          othername?: string | null
          outstanding_balance?: number
          reg_no?: string | null
          sn?: number | null
          surname?: string | null
        }
        Update: {
          firstname?: string | null
          grade?: string | null
          id?: never
          othername?: string | null
          outstanding_balance?: number
          reg_no?: string | null
          sn?: number | null
          surname?: string | null
        }
        Relationships: []
      }
      letter_templates: {
        Row: {
          content_template: string
          created_at: string | null
          created_by: string | null
          id: string
          title: string
        }
        Insert: {
          content_template: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          title: string
        }
        Update: {
          content_template?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "letter_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_profiles: {
        Row: {
          address: string | null
          chapter: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_joined: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          id: string
          is_approved: boolean | null
          last_name: string | null
          member_grade: string | null
          membership_category: string | null
          metadata: Json | null
          middle_name: string | null
          name_credentials: string | null
          name_prefix: string | null
          nice_reg_no: string | null
          nse_reg_no: string | null
          other_phone: string | null
          primary_phone: string | null
          profile_photo_url: string | null
          role: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          chapter?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_joined?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          is_approved?: boolean | null
          last_name?: string | null
          member_grade?: string | null
          membership_category?: string | null
          metadata?: Json | null
          middle_name?: string | null
          name_credentials?: string | null
          name_prefix?: string | null
          nice_reg_no?: string | null
          nse_reg_no?: string | null
          other_phone?: string | null
          primary_phone?: string | null
          profile_photo_url?: string | null
          role?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          chapter?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_joined?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_approved?: boolean | null
          last_name?: string | null
          member_grade?: string | null
          membership_category?: string | null
          metadata?: Json | null
          middle_name?: string | null
          name_credentials?: string | null
          name_prefix?: string | null
          nice_reg_no?: string | null
          nse_reg_no?: string | null
          other_phone?: string | null
          primary_phone?: string | null
          profile_photo_url?: string | null
          role?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      membership_claims: {
        Row: {
          admin_notes: string | null
          claim_statement: string
          conferences_attended: string | null
          date_joined: string | null
          documents: Json | null
          first_name: string
          id: string
          last_name: string
          member_grade: string
          membership_number: string | null
          other_names: string | null
          payment_id: string | null
          reviewed_at: string | null
          status: string
          submitted_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          claim_statement: string
          conferences_attended?: string | null
          date_joined?: string | null
          documents?: Json | null
          first_name: string
          id?: string
          last_name: string
          member_grade: string
          membership_number?: string | null
          other_names?: string | null
          payment_id?: string | null
          reviewed_at?: string | null
          status?: string
          submitted_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          claim_statement?: string
          conferences_attended?: string | null
          date_joined?: string | null
          documents?: Json | null
          first_name?: string
          id?: string
          last_name?: string
          member_grade?: string
          membership_number?: string | null
          other_names?: string | null
          payment_id?: string | null
          reviewed_at?: string | null
          status?: string
          submitted_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "membership_claims_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      news_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      notification_reads: {
        Row: {
          id: string
          notification_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          id?: string
          notification_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          id?: string
          notification_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_reads_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          sender_id: string | null
          target_audience: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          sender_id?: string | null
          target_audience?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          sender_id?: string | null
          target_audience?: string
          title?: string
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      payment_categories: {
        Row: {
          base_amount: number | null
          category_type: string
          created_at: string | null
          created_by: string | null
          currency: string | null
          description: string | null
          display_order: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          requires_membership: boolean | null
          slug: string
          start_date: string | null
          target_bank: string | null
          updated_at: string | null
          variants: Json | null
        }
        Insert: {
          base_amount?: number | null
          category_type?: string
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          requires_membership?: boolean | null
          slug: string
          start_date?: string | null
          target_bank?: string | null
          updated_at?: string | null
          variants?: Json | null
        }
        Update: {
          base_amount?: number | null
          category_type?: string
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          requires_membership?: boolean | null
          slug?: string
          start_date?: string | null
          target_bank?: string | null
          updated_at?: string | null
          variants?: Json | null
        }
        Relationships: []
      }
      payment_items: {
        Row: {
          amount: number
          created_at: string
          id: string
          item_name: string
          item_type: string
          payment_id: string | null
          quantity: number
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          item_name: string
          item_type: string
          payment_id?: string | null
          quantity?: number
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          item_name?: string
          item_type?: string
          payment_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "payment_items_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number | null
          chapter_fee_included: boolean | null
          created_at: string | null
          currency: string | null
          early_bird_applied: boolean | null
          gateway: string | null
          gateway_reference: string | null
          id: string
          membership_grade: string | null
          meta: Json | null
          payment_category: string | null
          payment_type: string | null
          status: string | null
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          amount?: number | null
          chapter_fee_included?: boolean | null
          created_at?: string | null
          currency?: string | null
          early_bird_applied?: boolean | null
          gateway?: string | null
          gateway_reference?: string | null
          id?: string
          membership_grade?: string | null
          meta?: Json | null
          payment_category?: string | null
          payment_type?: string | null
          status?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          amount?: number | null
          chapter_fee_included?: boolean | null
          created_at?: string | null
          currency?: string | null
          early_bird_applied?: boolean | null
          gateway?: string | null
          gateway_reference?: string | null
          id?: string
          membership_grade?: string | null
          meta?: Json | null
          payment_category?: string | null
          payment_type?: string | null
          status?: string | null
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_images: {
        Row: {
          created_at: string | null
          display_order: number
          id: string
          image_url: string
          post_id: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number
          id?: string
          image_url: string
          post_id: string
        }
        Update: {
          created_at?: string | null
          display_order?: number
          id?: string
          image_url?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_images_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          categories: string[] | null
          category_id: string | null
          content: string | null
          created_at: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string | null
          status: string | null
          summary: string | null
          tags: string[] | null
          title: string | null
          type: Database["public"]["Enums"]["content_type"] | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          categories?: string[] | null
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string | null
          status?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["content_type"] | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          categories?: string[] | null
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string | null
          status?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string | null
          type?: Database["public"]["Enums"]["content_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_profiles_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "news_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          role: string
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
      program_editions: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          gallery: Json | null
          id: string
          location: string | null
          series_id: string
          start_date: string | null
          title: string
          updated_at: string | null
          year: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          gallery?: Json | null
          id?: string
          location?: string | null
          series_id: string
          start_date?: string | null
          title: string
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          gallery?: Json | null
          id?: string
          location?: string | null
          series_id?: string
          start_date?: string | null
          title?: string
          updated_at?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_editions_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "program_series"
            referencedColumns: ["id"]
          },
        ]
      }
      program_series: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_flagship: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_flagship?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_flagship?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      publications: {
        Row: {
          authors: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          id: string
          is_featured: boolean
          pdf_url: string | null
          published_at: string | null
          slug: string | null
          title: string
          type: string
        }
        Insert: {
          authors?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean
          pdf_url?: string | null
          published_at?: string | null
          slug?: string | null
          title: string
          type: string
        }
        Update: {
          authors?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean
          pdf_url?: string | null
          published_at?: string | null
          slug?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          feature_on_success_stories: boolean | null
          id: string
          is_approved: boolean | null
          member_id: string
          rating: number | null
          review_text: string
        }
        Insert: {
          created_at?: string | null
          feature_on_success_stories?: boolean | null
          id?: string
          is_approved?: boolean | null
          member_id: string
          rating?: number | null
          review_text: string
        }
        Update: {
          created_at?: string | null
          feature_on_success_stories?: boolean | null
          id?: string
          is_approved?: boolean | null
          member_id?: string
          rating?: number | null
          review_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: true
            referencedRelation: "member_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      spotlights: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          featured_image: string | null
          id: string
          is_active: boolean
          slug: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          featured_image?: string | null
          id?: string
          is_active?: boolean
          slug: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          featured_image?: string | null
          id?: string
          is_active?: boolean
          slug?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      static_pages: {
        Row: {
          content: string | null
          created_at: string
          featured_image: string | null
          id: string
          is_published: boolean
          page_type: string | null
          related_pages: string[] | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          featured_image?: string | null
          id?: string
          is_published?: boolean
          page_type?: string | null
          related_pages?: string[] | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          featured_image?: string | null
          id?: string
          is_published?: boolean
          page_type?: string | null
          related_pages?: string[] | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          content: string | null
          created_at: string
          designation: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          is_featured: boolean
          member_name: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          designation?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean
          member_name?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          designation?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean
          member_name?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      training_modules: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          module_order: number | null
          title: string
          training_id: string
          youtube_video_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          module_order?: number | null
          title: string
          training_id: string
          youtube_video_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          module_order?: number | null
          title?: string
          training_id?: string
          youtube_video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_modules_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      training_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          module_id: string | null
          progress_percent: number | null
          started_at: string | null
          training_id: string | null
          user_identifier: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string | null
          progress_percent?: number | null
          started_at?: string | null
          training_id?: string | null
          user_identifier: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          module_id?: string | null
          progress_percent?: number | null
          started_at?: string | null
          training_id?: string | null
          user_identifier?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "training_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_progress_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      trainings: {
        Row: {
          assessment_url: string | null
          category_id: string | null
          completion_count: number | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          display_order: number | null
          duration_minutes: number | null
          id: string
          is_published: boolean | null
          slug: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          view_count: number | null
          youtube_video_id: string
        }
        Insert: {
          assessment_url?: string | null
          category_id?: string | null
          completion_count?: number | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          display_order?: number | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          slug?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
          youtube_video_id: string
        }
        Update: {
          assessment_url?: string | null
          category_id?: string | null
          completion_count?: number | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          display_order?: number | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          slug?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
          youtube_video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trainings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "training_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          chapter_id: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_delete_member: { Args: { _user_id: string }; Returns: Json }
      admin_set_outstanding_balance: {
        Args: { _amount: number; _member_uid: string }
        Returns: Json
      }
      admin_sync_member_from_legacy: {
        Args: { _user_id: string }
        Returns: Json
      }
      admin_update_legacy_member_link: {
        Args: { _member_uid: string; _portal_user_id?: string }
        Returns: Json
      }
      checkin_anniversary_ticket: {
        Args: { _day: number; _ticket_code: string }
        Returns: Json
      }
      claim_legacy_membership: {
        Args: { _member_uid: string; _user_id: string }
        Returns: Json
      }
      find_duplicate_legacy_members: {
        Args: never
        Returns: {
          duplicate_count: number
          firstname: string
          grade: string
          member_uids: string[]
          surname: string
        }[]
      }
      find_legacy_member: {
        Args: {
          _email?: string
          _firstname?: string
          _grade?: string
          _othername?: string
          _reg_no?: string
          _surname?: string
        }
        Returns: {
          application_date: string | null
          email: string | null
          firstname: string | null
          grade: string | null
          member_uid: string
          nse_no: string | null
          othername: string | null
          phone: string | null
          portal_user_id: string | null
          reg_no: string | null
          sn: number | null
          surname: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "legacy_members"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_admin_chapter: { Args: { _user_id: string }; Returns: string }
      get_member_applications: {
        Args: { _user_id: string }
        Returns: {
          application_no: string
          application_type: string
          documents: Json
          id: string
          intended_grade: string
          payment_reference: string
          reviewed_at: string
          status: string
          submitted_at: string
          user_id: string
        }[]
      }
      get_member_outstanding_balance: {
        Args: {
          _firstname?: string
          _grade?: string
          _othername?: string
          _reg_no?: string
          _surname?: string
        }
        Returns: number
      }
      get_total_revenue: { Args: never; Returns: number }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_role: { Args: { _user_id: string }; Returns: boolean }
      is_anniversary_staff: { Args: { _user_id: string }; Returns: boolean }
      is_national_level_admin: { Args: { _user_id: string }; Returns: boolean }
      search_members_public: {
        Args: { _search?: string }
        Returns: {
          chapter: string
          full_name: string
          member_grade: string
          membership_id: string
          profile_photo_url: string
          status: string
        }[]
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "moderator"
        | "member"
        | "super_admin"
        | "secretariat"
        | "creator"
        | "national_admin"
        | "chapter_admin"
        | "finance"
        | "training_manager"
        | "chapter_chairman"
        | "anniversary_steward"
      conf_payment_method:
        | "nice_portal_receipt"
        | "bank_transfer_receipt"
        | "remita"
      conf_payment_status:
        | "pending"
        | "submitted"
        | "verified"
        | "rejected"
        | "paid"
      content_type: "news" | "blog" | "journal" | "newsletter"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "moderator",
        "member",
        "super_admin",
        "secretariat",
        "creator",
        "national_admin",
        "chapter_admin",
        "finance",
        "training_manager",
        "chapter_chairman",
        "anniversary_steward",
      ],
      conf_payment_method: [
        "nice_portal_receipt",
        "bank_transfer_receipt",
        "remita",
      ],
      conf_payment_status: [
        "pending",
        "submitted",
        "verified",
        "rejected",
        "paid",
      ],
      content_type: ["news", "blog", "journal", "newsletter"],
    },
  },
} as const
