# AI Spacing Rulebook (Version 1.0)
*Project Layout & Spacing Constitution for Lumina Dental UI*

---

## 01 / PROFILE SPECIFICATION FOR THIS PRODUCT
- **Primary Layout Profile**: Desktop Comfortable (1440px base, max 1200px content width) / Mobile Comfortable (390px base, 320px reflow).
- **Units**: CSS Pixels (1x layout).
- **Target Touch Policy**: Minimum 44 × 44 px for standalone interactive controls (`INT-01`).

---

## 02 / TOKEN SCALE & SEMANTIC ROLES
| Token | Value | Semantic Mapping | Typical Role |
|---|---|---|---|
| `space.0` | 0px | `gap-0` | Intentionally joined elements |
| `space.1` | 4px | `gap-1`, `p-1`, `mb-1` | Helper text, error labels, metadata |
| `space.2` | 8px | `gap-2`, `p-2`, `space-y-2` | Icon-to-label, title-to-description, chip gap |
| `space.3` | 12px | `gap-3`, `p-3` | Heading-content gap (compact), action button spacing |
| `space.4` | 16px | `gap-4`, `p-4`, `p-mobile` | Mobile card padding, mobile gutters, component spacing |
| `space.5` | 24px | `gap-6`, `p-6`, `p-desktop` | Desktop card padding, desktop gutters, field group spacing |
| `space.6` | 32px | `gap-8`, `p-8`, `mb-8` | Mobile sections, desktop page insets, field sections |
| `space.7` | 48px | `gap-12`, `py-12` | Desktop major sections, large group separation |
| `space.8` | 64px | `gap-16`, `py-16` | Hero spacing, spacious editorial separation |

---

## 03 / CRITICAL ENFORCEMENT RULES
1. **REL-01 (Proximity Rule)**: Within any section, headings MUST sit closer to their own content than to the preceding section (**32px before / 12–16px after**).
2. **LAY-01 & LAY-02 (Alignment & Max Width)**: Centered **1200px max content width** (`max-w-7xl mx-auto`). Shared left/right alignment rails across all sections.
3. **CMP-01 & CMP-02 (Button & Control Geometry)**:
   - Primary and secondary buttons: **16px horizontal padding (`px-4`), 12px vertical padding (`py-3`)**.
   - Minimum standalone hit-area: **44px height (`min-h-[44px]`)**.
   - Button icon-to-label gap: **8px (`gap-2`)**.
4. **FRM-01 & FRM-02 (Forms & Feedback)**:
   - Label to input: **8px (`mb-2`)**.
   - Input to helper/error: **4px (`mt-1`)**.
   - Field group to next group: **24px (`space-y-6`)**.
   - Radio / checkbox shape to label: **8px (`gap-2`)** with shared hit area.
5. **INT-03 & INT-04 (Fixed Elements & Modals)**:
   - Fixed top navbar height: **80px (`h-20`)**. Content top padding: **`pt-20`**.
   - Dialog overlay padding: **24px (`p-6`)** desktop, **16px (`p-4`)** mobile. Max modal height: **`max-h-[85vh]`** with internal scroll.
6. **REP-01 & REP-04 (Grids & Tables)**:
   - Card grids: 16px mobile gutters (`gap-4`), 24px desktop gutters (`gap-6`).
   - Table rows: 16px horizontal cell padding, 12px vertical cell padding.

