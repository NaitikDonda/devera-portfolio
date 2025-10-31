# 🚀 QUICK START - Enable Email Sending

## ⚡ What You Need to Do (5 minutes)

Your contact form code is ready! You just need to set up Gmail to send emails.

### Option 1: Quick Terminal Setup (Recommended)

Run this command in your terminal:

```bash
cd /Users/naitikdonda/Desktop/Portfolio
cat > .env.local << 'EOF'
GMAIL_USER=dondanaitik@gmail.com
GMAIL_APP_PASSWORD=paste_your_app_password_here
EOF
```

Then edit the file to add your app password.

### Option 2: Manual Setup

1. Create a file named `.env.local` in `/Users/naitikdonda/Desktop/Portfolio/`
2. Add these lines:
   ```
   GMAIL_USER=dondanaitik@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_password
   ```

## 🔑 Get Your Gmail App Password

**IMPORTANT:** You need a special App Password, not your regular Gmail password!

### Quick Steps:

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select App: "Mail"
   - Select Device: "Other" → Type "Devera Website"
   - Click "Generate"
   - Copy the 16-character password (like: `abcd efgh ijkl mnop`)

3. **Add to .env.local**:
   ```
   GMAIL_USER=dondanaitik@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
   (Remove spaces from the password)

4. **Restart Your Dev Server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

5. **Test It!**
   - Go to http://localhost:3000
   - Fill out contact form
   - Check dondanaitik@gmail.com inbox!

## ✅ What's Already Done

- ✅ NodeMailer installed
- ✅ Email sending code implemented
- ✅ Beautiful HTML email template created
- ✅ Configured to send to: **dondanaitik@gmail.com**
- ✅ Reply-to address set automatically

## 📧 Email Preview

When someone submits the form, you'll receive a beautiful email with:
- Gradient purple header
- Sender's name and email
- Full message
- Timestamp
- One-click reply option

## 🔍 Verify It's Working

After setup, check your terminal when submitting a form. You should see:
```
✅ Email sent successfully to dondanaitik@gmail.com
```

## ❓ Need Help?

Read the detailed guide: `/Users/naitikdonda/Desktop/Portfolio/GMAIL_SETUP.md`

---

**Current Status**: 
- Contact form: ✅ Working
- Email code: ✅ Ready
- Gmail setup: ⏳ **YOU NEED TO DO THIS** (5 minutes)
