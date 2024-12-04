# Style Guide for Community Support Tracker

This style guide ensures a consistent design across all components of the **Community Support Tracker**, including the Donation Tracker, Volunteer Hours Tracker, and Event Signup.

---

## Fonts and Text
- **Font Family**: Use `'Roboto', sans-serif` for all text.
- **Text Colors**:
  - Regular text: `#333` (dark grey).
  - Headings: `#004aad` (blue).
- **Font Sizes**:
  - Page titles (e.g., `<h1>`): `1.8rem`.
  - Section titles (e.g., `<h2>`): `1.5rem`.
  - Regular text: `1rem`.
- **Text Alignment**:
  - Center all page titles and section titles.
  - Regular text and forms should be left-aligned.

---

## Colors Used

- **Primary Background**: `#e9f5ff`  
  *Used for the light blue page background.*

- **Section Background**: `#ffffff`  
  *Used for white backgrounds in forms and summaries.*

- **Button Background**: `#004aad`  
  *Blue color used for primary buttons.*

- **Button Hover Background**: `#002e6d`  
  *Darker blue displayed when buttons are hovered over.*

- **Delete Button Background**: `#e74c3c`  
  *Red color for delete buttons.*

- **Text (Default)**: `#333`  
  *Dark grey used for readable text.*

- **Success Message**: `#d4edda`  
  *Green color displayed for success feedback.*

- **Error Message**: `#f8d7da`  
  *Red color displayed for error feedback.*

## Buttons
1. **Default Buttons**:
   - Background: Gradient from `#004aad` to `#002e6d`.
   - Text: White.
   - Border Radius: `8px`.
   - Padding: `10px 20px`.
   - Hover: Change color and slightly grow.
2. **Delete Buttons**:
   - Background: Red (`#e74c3c`).
   - Hover Background: Darker red (`#c0392b`).
   - Text: White.
3. **Button Placement**:
   - Center buttons below forms.
   - Place delete buttons next to log entries.

---

## Forms
1. **Field Styles**:
   - All input fields:
     - Border: `1px solid #ccc`.
     - Border Radius: `8px`.
     - Padding: `12px`.
   - Focus Style:
     - Border: `1px solid #004aad`.
     - Shadow: `0 0 8px rgba(0, 74, 173, 0.5)` on focus.
2. **Spacing**:
   - Leave `20px` between each field.
   - Add `30px` padding around the form.

---

## Feedback Messages
1. **Success**:
   - Background: `#d4edda`.
   - Border: `1px solid #c3e6cb`.
   - Text: `#155724`.
2. **Error**:
   - Background: `#f8d7da`.
   - Border: `1px solid #f5c6cb`.
   - Text: `#721c24`.

---

## Summary Section
- **Background**: Gradient: `linear-gradient(to bottom, #eef4ff, #dbeaff)`.
- **Log Items**:
  - Background: White (`#ffffff`).
  - Padding: `15px`.
  - Border Radius: `8px`.
  - Shadow: `0 2px 8px rgba(0, 0, 0, 0.1)`.
- **Alignment**:
  - Use `space-between` to position text and delete buttons.

---

## Navigation
- **Link Style**:
  - Text: White.
  - Hover: Blue background (`#004aad`) and slightly larger.
  - Padding: `10px 15px`.

---

## Accessibility
1. **Focus States**:
   - All interactive elements (inputs, buttons, links) should show a visible focus state (e.g., blue border or shadow).
2. **Color Contrast**:
   - Ensure readable contrast between text and background colors.
3. **Button Sizes**:
   - Buttons should be large enough to click easily, especially on mobile.

---

## Responsive Design
1. **Breakpoints**:
   - Adjust layout for screens smaller than `600px`.
   - Use vertical stacks for navigation on smaller screens.
2. **Flexible Widths**:
   - Use percentages (`%`) for input and button widths.