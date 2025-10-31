# 📧 Gmail Email Setup - Quick Guide

Your contact form is now configured to send emails to **dondanaitik@gmail.com**!

## 🚀 Quick Setup (5 minutes)

### Step 1: Enable 2-Step Verification on Gmail

1. Go to https://myaccount.google.com/security
2. Sign in with **dondanaitik@gmail.com**
3. Scroll to "2-Step Verification"
4. Click "Get Started" and follow the instructions
5. Complete the setup (you'll need your phone)

### Step 2: Generate App Password

1. After enabling 2-Step Verification, go to: https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. In "Select app" dropdown, choose **"Mail"**
4. In "Select device" dropdown, choose **"Other (Custom name)"**
5. Type: **"Devera Portfolio Website"**
6. Click **"Generate"**
7. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Create .env.local File

1. In your `/Users/naitikdonda/Desktop/Portfolio/` folder, create a new file named `.env.local`
2. Add these two lines:

```env
GMAIL_USER=dondanaitik@gmail.com
GMAIL_APP_PASSWORD=your_16_character_password_here
```

3. Replace `your_16_character_password_here` with the password from Step 2 (remove spaces)

**Example:**
```env
GMAIL_USER=dondanaitik@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

### Step 4: Restart Dev Server

1. Stop your current dev server (press Ctrl+C in terminal)
2. Start it again:
```bash
npm run dev
```

### Step 5: Test It!

1. Go to http://localhost:3000
2. Scroll to the contact form
3. Fill it out with test data
4. Click "Send Message"
5. Check **dondanaitik@gmail.com** inbox!

## ✅ That's It!

Your contact form will now send beautiful HTML emails to **dondanaitik@gmail.com** with:
- 🎨 Professional design with gradient header
- 👤 Sender's name and email (for easy reply)
- 💬 Full message content
- 🕐 Timestamp
- 📧 Reply-to address (click reply in Gmail to respond directly)

## 🔒 Security Notes

- ✅ The `.env.local` file is already in `.gitignore` (safe)
- ✅ Never share your App Password
- ✅ Never commit `.env.local` to Git
- ✅ App Passwords are safer than your main password
- ✅ You can revoke app passwords anytime from Google Account settings

## 🐛 Troubleshooting

**Problem: "Invalid credentials" error**
- Make sure 2-Step Verification is enabled
- Generate a new App Password
- Copy it exactly (no spaces)
- Restart dev server after updating .env.local

**Problem: Email not received**
- Check spam/junk folder
- Wait a minute (sometimes there's a delay)
- Check terminal for errors
- Make sure .env.local file is in the root folder

**Problem: "Less secure app access" error**
- Don't use your regular Gmail password
- Use the 16-character App Password instead
- Make sure you generated it from https://myaccount.google.com/apppasswords

## 📝 Quick Commands

Create .env.local file (Mac/Linux):
```bash
cat > .env.local << EOF
GMAIL_USER=dondanaitik@gmail.com
GMAIL_APP_PASSWORD=your_password_here
EOF
```

Check if .env.local exists:
```bash
ls -la .env.local
```

## 🎉 Email Template Preview

Your emails will look like this:

```
┌──────────────────────────────────┐
│ 🎉 New Contact Form Submission  │
│ Someone filled out the contact   │
│ form on your Devera website!     │
├──────────────────────────────────┤
│                                  │
│ 👤 Name: John Doe                │
│                                  │
│ 📧 Email: john@example.com       │
│                                  │
│ 💬 Message:                      │
│ Hi, I'd like to discuss a       │
│ project...                       │
│                                  │
│ 🕐 Submitted at: 10/31/2025...  │
│                                  │
├──────────────────────────────────┤
│ This email was sent from your    │
│ Devera portfolio website         │
└──────────────────────────────────┘
```

Need help? Check the logs in your terminal when submitting the form!
