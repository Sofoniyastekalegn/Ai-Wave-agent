import { supbase } from "@/lib/supabase"
import { emailService } from "../../server/src/lib/email-service"
import { supabase } from "../../server/src/lib/customSupabaseClient"

export class ContactService {
    async submitContactForm(formData) {

        try {
            // save to supabse
            const { data, error: dbError } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    phone: formData.phone || null,
                    company: formData.phone || null,
                    created_at: new Date().toISOString(),
                    ip_address: '',
                    status: 'new',
                },
            ])
            .select()
            .single()
            
            if (dbError) {
                console.error('Database error:', dbError)
                throw new Error(`failed to save contatct from: ${dbError.message}`)
            }

            // 2 send email notification to admin

            const emailResult = await emailService.sendContactNotification(formData)
            // send auto-reply to user 
            await emailService.sendAutoReply(formData)

            return {
                sucess: true,
                data: {
                    submission: data,
                    email: emailResult,
                },
                message: 'contact form submitedd sucessfully',
            }
        } catch (error) {
            console.error('contact form submission error:', error)

            // log error to supabse error table 
            await this.logError(error, formData)
            throw error 

        }

    }
    async logError(error, formData) {
        try {
            await supabase.from('contact_form_errors').insert([
                {
                    error_message: error.message,
                    error_stack: error.stack,
                    form_data: formData,
                    created_at: new Date().toISOString(),
                }
            }
        }
      
        async getSubmissions(limit = 50, status) {
          try {
            let query = supabase
              .from('contact_submissions')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(limit)
      
            if (status) {
              query = query.eq('status', status)
            }
      
            const { data, error } = await query
      
            if (error) throw error
      
            return { success: true, data }
          } catch (error) {
            console.error('Error fetching submissions:', error)
            throw error
          }
        }
      
        async updateSubmissionStatus(id, status, notes) {
          try {
            const { data, error } = await supabase
              .from('contact_submissions')
              .update({
                status,
                notes: notes || null,
                updated_at: new Date().toISOString(),
              })
              .eq('id', id)
              .select()
              .single()
      
            if (error) throw error
      
            return { success: true, data }
          } catch (error) {
            console.error('Error updating submission:', error)
            throw error
          }
        }
      }
      
      export const contactService = new ContactService()