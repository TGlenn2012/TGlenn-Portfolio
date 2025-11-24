# Mobile Chatbot Troubleshooting Guide

## Common Mobile Issues and Solutions

### Issue 1: Button Not Clickable

**Symptoms:** Chatbot button doesn't respond to taps on mobile.

**Solutions:**
- ✅ Added `touch-target` class for minimum 44px touch area
- ✅ Added `active:scale-95` for visual feedback on tap
- ✅ Button positioned at `bottom-4 right-4` on mobile for better reach

**Test:** Tap the robot icon in bottom-right corner

### Issue 2: Chat Window Doesn't Open

**Symptoms:** Button works but chat window doesn't appear.

**Check:**
1. Open browser developer tools on mobile (Chrome: `chrome://inspect`)
2. Check for JavaScript errors in console
3. Verify z-index isn't being overridden

**Fixed:**
- ✅ Chat window has `z-50` to stay above other content
- ✅ Better mobile sizing: `h-[90vh]` on mobile vs `h-[80vh]` on desktop

### Issue 3: API Calls Failing on Mobile

**Symptoms:** Chat opens but messages fail to send.

**Possible Causes:**
1. **Network Issues:** Mobile network might be slower/unstable
2. **URL Resolution:** API URL might not resolve correctly
3. **CORS Issues:** Though unlikely with same-origin requests

**Fixed:**
- ✅ Using relative path `/api/chat` in production (works everywhere)
- ✅ Added `credentials: 'same-origin'` for better compatibility
- ✅ Enhanced error logging with mobile detection

**Debug:**
1. Open mobile browser console
2. Send a message in chatbot
3. Check console for error messages
4. Look for "Chat error:" log entry

### Issue 4: Input Field Not Working

**Symptoms:** Can't type in the message input on mobile.

**Fixed:**
- ✅ Added `text-base` for better mobile keyboard support
- ✅ Proper `min-h-[44px]` for touch targets
- ✅ `touch-target` class for better mobile interaction

### Issue 5: Chat Window Too Small/Large on Mobile

**Symptoms:** Chat window doesn't fit well on mobile screen.

**Fixed:**
- ✅ Mobile: `h-[90vh]` with `max-h-[90vh]`
- ✅ Desktop: `h-[80vh]` with `max-h-[600px]`
- ✅ Responsive padding: `p-2` on mobile, `p-4` on desktop
- ✅ Better spacing in input area

### Issue 6: Messages Not Scrollable

**Symptoms:** Can't scroll through chat history on mobile.

**Fixed:**
- ✅ Added `overscroll-contain` to prevent scroll issues
- ✅ Proper overflow-y-auto on messages container

## Debugging Steps

### Step 1: Check Browser Console on Mobile

**On Android (Chrome):**
1. Connect phone to computer via USB
2. Open Chrome on computer: `chrome://inspect`
3. Find your device and click "Inspect"
4. Check Console tab for errors

**On iOS (Safari):**
1. Enable "Web Inspector" in Settings → Safari → Advanced
2. Connect iPhone to Mac
3. Open Safari on Mac → Develop → [Your iPhone] → [Site]
4. Check Console for errors

### Step 2: Test API Directly

Open mobile browser and go to:
```
https://www.terrellglenn.com/api/chat
```

Should return: `{"error":"Method not allowed","method":"GET","allowed":["POST"]}`

If you get 404, the function isn't deployed correctly.

### Step 3: Check Network Tab

1. Open mobile browser developer tools
2. Go to Network tab
3. Send a message in chatbot
4. Look for `/api/chat` request
5. Check:
   - Status code (should be 200)
   - Response body
   - Request headers

### Step 4: Check if Button is Visible

The button should be visible at bottom-right. If not:
- Check if it's hidden by other elements
- Verify z-index is correct (`z-50`)
- Check if mobile viewport is correct

## Mobile-Specific Improvements Made

1. **Better Touch Targets:**
   - All interactive elements have minimum 44px height/width
   - Added `touch-target` class where needed

2. **Mobile-Optimized Sizing:**
   - Chat window: 90vh on mobile (more screen space)
   - Responsive padding and margins
   - Better button positioning

3. **Enhanced Error Handling:**
   - Mobile-specific error logging
   - Better error messages for users

4. **Improved Input:**
   - Larger text size (`text-base`)
   - Better keyboard support
   - Proper touch target size

5. **Better Scroll Handling:**
   - `overscroll-contain` to prevent scroll issues
   - Smooth scrolling for messages

## Testing Checklist

- [ ] Button is visible and clickable
- [ ] Chat window opens when button is tapped
- [ ] Can type in input field
- [ ] Can send messages
- [ ] Messages appear correctly
- [ ] Can scroll through message history
- [ ] Bot responses work
- [ ] Links in responses are clickable
- [ ] Can close chat window
- [ ] Chat works in both portrait and landscape

## Still Having Issues?

If the chatbot still doesn't work on mobile:

1. **Check Console Errors:**
   - Open developer tools on mobile
   - Look for any red error messages
   - Share the error message

2. **Check Network Request:**
   - In Network tab, find `/api/chat` request
   - Check status code and response
   - Share what you see

3. **Test on Different Mobile Browsers:**
   - Chrome (Android)
   - Safari (iOS)
   - Firefox Mobile
   - See if issue is browser-specific

4. **Check Vercel Deployment:**
   - Make sure latest code is deployed
   - Verify function logs don't show errors
   - Check that `GROQ_API_KEY` is set

5. **Try Incognito/Private Mode:**
   - Sometimes extensions or cache cause issues
   - Test in private browsing mode

## Quick Mobile Test

Open on your mobile device:
```
https://www.terrellglenn.com
```

1. Scroll to bottom of page
2. Tap the robot icon (bottom-right)
3. Try typing: "What projects has Terrell worked on?"
4. Tap Send button

If it doesn't work, check the browser console for errors and share what you find.


