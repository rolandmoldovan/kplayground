# Manual QA & Exploratory Testing
## Login & Portfolio Value

30 Jul 2026 · Chrome 149 · macOS 26.3

AI Prompt(s) used: Re-create the file I gave your to be good looking .md file, don't change the text but show me any mistyping issue.

**Result: 4 passed · 1 failed** — whitespace not trimmed on login input

---

## Test Cases

### 1. Successful login with 2FA — PASS
**Precondition:** Valid account credentials; 2FA device available

**Steps:**
- Enter valid username/email and correct password
- Submit, then enter valid 2FA code

**Expected:** Credentials and 2FA accepted; user lands on authenticated portfolio view with no errors.

### 2. Invalid credentials — PASS
**Precondition:** Logged out

**Steps:**
- Enter valid email with an incorrect password
- Submit

**Expected:** Login rejected with a generic email/password error; field can be retried; repeated failures trigger throttling.

### 3. Empty & malformed input validation — FAIL
**Precondition:** Logged out

**Steps:**
- Submit with both fields empty
- Submit with only email filled
- Enter malformed emails (test@, test.com, whitespace)
- Enter email with leading/trailing spaces + correct password

**Expected:** Validation blocks submission and flags the specific field with a readable message. Leading/trailing whitespace is trimmed rather than causing a failed login.

**Actual:** Email/username with leading or trailing whitespace causes a failed login. Input should be trimmed instead.

### 4. Portfolio value (non-zero balance) — PASS
**Precondition:** Logged in with a non-zero-balance portfolio

**Steps:**
- Open the portfolio view
- Observe total value and holdings list

**Expected:** Total equals the sum of holdings within expected rounding; currency symbol and decimals consistent between total and line items; values persist across refresh, with a skeleton shown while loading.

### 5. Session timeout & expiry handling — PASS
**Precondition:** Logged in

**Steps:**
- Leave portfolio idle past the session timeout, then act
- Separately: log out in a second tab and interact with the first

**Expected:** Expired session redirects cleanly to login with a message (no stale data). Logout in one tab invalidates all tabs; browser back does not restore a cached portfolio view.

---

## Exploratory Notes

### Potential risks
- **Financial accuracy** — a rounding or summation bug in the portfolio total is high severity, since users make decisions on that number.
- **Stale data** — if the total doesn't refresh with live prices, a user may act on an outdated figure.
- **Auth error verbosity** — messages that distinguish "no such account" from "wrong password" enable account enumeration.
- **Empty/loading states showing 0.00** — briefly indistinguishable from a genuinely empty portfolio, alarming to a funded user.

### Edge cases considered
- Very large balances — formatting with separators vs. container overflow.
- Very small fractional holdings — decimals shown, and whether the total rounds to zero.
- Changing display fiat currency — correct and consistent conversion.
- Multiple tabs with different sub-accounts selected.
- Slow/interrupted network (3G throttle) behaviour.
- Browser back button after logout.

### Questions for product / engineering
- What is the intended session timeout, and is it documented for users?
- How often should the portfolio total refresh — live stream, poll, or on load?
- What is the specified rounding behaviour for the total vs. line items?
- What is the intended empty-state copy and CTA for a zero-balance account?
- Which viewport widths and browsers are officially supported?

---

## Responsive / Mobile Check

**Method:** Opening the website on a mobile device / Manual resize down.

### Checked
- Whether the email field triggers the correct mobile keyboard type.
- Whether the on-screen keyboard obscures the submit button or 2FA input.
- Portfolio view — table reflow, horizontal scroll, or clipping.
- Total portfolio value stays untruncated.
- Website view on landscape orientation.

### Scope
*Limited to normal UI interaction on my own account. No load testing, no security probing, and no attempts to access other accounts.*

