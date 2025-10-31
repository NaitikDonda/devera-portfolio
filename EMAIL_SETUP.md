# Email Integration Setup Guide

All contact form submissions are configured to send to: **dondanaitik@gmail.com**

## Current Status

✅ Email destination configured  
✅ Form submissions logged to console  
⏳ Actual email sending needs to be implemented

## Quick Setup Options

### Option 1: Using Resend (Recommended - Free tier available)

1. **Install Resend:**
   ```bash
   npm install resend
   ```

2. **Get API Key:**
   - Sign up at [resend.com](https://resend.com)
   - Get your API key from dashboard

3. **Add to `.env.local`:**
   ```env
   RESEND_API_KEY=yre_b1GtS6sM_HiSFuCZLe8K2tjGYn67NufDF
   ```

4. **Update `/app/api/contact/route.ts`:**
   ```typescript
   import { Resend } from 'resend'
   
   const resend = new Resend(process.env.RESEND_API_KEY)
   
   // Inside the POST function, replace the TODO section with:
   const { data, error } = await resend.emails.send({
     from: 'Devera Website <noreply@yourdomain.com>',
     to: 'dondanaitik@gmail.com',
     replyTo: email,
     subject: `New Contact: ${name}`,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>From:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Message:</strong></p>
       <p>${message}</p>
       <hr>
       <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
     `
   })
   
   if (error) {
     throw new Error('Failed to send email')
   }
   ```

### Option 2: Using NodeMailer (Gmail SMTP)

1. **Install NodeMailer:**
   ```bash
   npm install nodemailer
   ```

2. **Enable "App Passwords" in Gmail:**
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - App Passwords → Generate new password

3. **Add to `.env.local`:**
   ```env
   GMAIL_USER=dondanaitik@gmail.com
   GMAIL_APP_PASSWORD=qipz kwwn comv ntxk
   ```

4. **Update `/app/api/contact/route.ts`:**
   ```typescript
   import nodemailer from 'nodemailer'
   
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: process.env.GMAIL_USER,
       pass: process.env.GMAIL_APP_PASSWORD
     }
   })
   
   // Inside the POST function:
   await transporter.sendMail({
     from: process.env.GMAIL_USER,
     to: 'dondanaitik@gmail.com',
     replyTo: email,
     subject: `New Contact: ${name}`,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>From:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Message:</strong></p>
       <p>${message}</p>
       <hr>
       <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
     `
   })
   ```

### Option 3: Using SendGrid

1. **Install SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Get API Key:**
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Get API key from dashboard

3. **Add to `.env.local`:**
   ```env
   SENDGRID_API_KEY=your_api_key_here
   ```

4. **Update `/app/api/contact/route.ts`:**
   ```typescript
   import sgMail from '@sendgrid/mail'
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
   
   // Inside the POST function:
   await sgMail.send({
     to: 'dondanaitik@gmail.com',
     from: 'noreply@yourdomain.com', // Must be verified in SendGrid
     replyTo: email,
     subject: `New Contact: ${name}`,
     html: `
       <h2>New Contact Form Submission</h2>
       <p><strong>From:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Message:</strong></p>
       <p>${message}</p>
       <hr>
       <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
     `
   })
   ```

## Testing

After implementing any option above:

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Fill out the contact form on the website

3. Check:
   - Terminal for logs
   - Your email inbox at dondanaitik@gmail.com

## Current Behavior

Right now, all submissions are:
- ✅ Validated
- ✅ Logged to console with email details
- ✅ Showing success message to user
- ⏳ Ready for email service integration

## Email Template

Current email format includes:
- Sender's name
- Sender's email (for reply)
- Message content
- Timestamp
- All sent to: **dondanaitik@gmail.com**

## Production Deployment

Before deploying:
1. Choose an email service
2. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
3. Test email sending in production
4. Consider adding rate limiting
5. Add spam protection (like reCAPTCHA)

## Recommended: Resend

Resend is recommended because:
- ✅ Modern API
- ✅ Generous free tier (100 emails/day)
- ✅ Easy setup
- ✅ Good deliverability
- ✅ Built for Next.js

Choose the option that best fits your needs!
