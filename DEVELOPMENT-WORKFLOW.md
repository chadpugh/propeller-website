# 🚀 Propeller VC Website - Development Workflow Guide

## 📋 Project Overview

**Repository**: https://github.com/chadpugh/propeller-website  
**Live Site**: https://propellervc.com/propeller-vc  
**HubSpot Theme Path**: `/PRO-HubUI-CHAD EDIT/`  
**HubSpot Portal ID**: 20619041

This is a comprehensive HubSpot theme for Propeller VC featuring:
- ✅ Working p5.js background particle animation
- ✅ Ocean water video background with logo overlay
- ✅ Dynamic portfolio logo grid with click-to-edit interface
- ✅ Responsive design working across all devices
- ✅ Complete repository organization as "propeller-website"

## 🛠️ Development Workflow

### 1. Making Changes

**Edit files in the `hubspot-theme/` directory:**

**Most Common Files:**
- `hubspot-theme/css/propeller-styles.css` - Main styling (typography, layout, colors)
- `hubspot-theme/css/theme-overrides.css` - Theme overrides and fixes
- `hubspot-theme/templates/propeller-homepage.html` - Homepage structure
- `hubspot-theme/modules/Portfolio/Portfolio.module/` - Portfolio logo system
- `hubspot-theme/globals/Header/Header.module/` - Header module
- `hubspot-theme/globals/Footer/Footer.module/` - Footer module

### 2. Deploy to HubSpot

```bash
# Navigate to theme directory
cd hubspot-theme

# Upload specific changes
hs upload css/ "/PRO-HubUI-CHAD EDIT/css/"                    # CSS changes
hs upload templates/ "/PRO-HubUI-CHAD EDIT/templates/"        # Template changes  
hs upload modules/Portfolio/ "/PRO-HubUI-CHAD EDIT/modules/Portfolio/"  # Portfolio module changes

# Upload everything
hs upload . "/PRO-HubUI-CHAD EDIT/"
```

### 3. Save to Version Control

```bash
# Add changes
git add .

# Commit with descriptive message
git commit -m "fix: Description of changes made"

# Push to remote repository  
git push origin main
```

## 📁 Key Directory Structure

```
hubspot-theme/
├── css/
│   ├── propeller-styles.css          # Main custom styles
│   ├── theme-overrides.css           # Theme fixes and overrides
│   ├── elements/_typography.css      # Theme typography settings
│   └── tools/_config.css             # Theme configuration variables
├── templates/
│   ├── propeller-homepage.html       # Homepage template
│   └── layouts/base.html             # Base layout
├── modules/
│   └── Portfolio/Portfolio.module/   # Portfolio logo grid system
├── globals/
│   ├── Header/Header.module/         # Site header
│   └── Footer/Footer.module/         # Site footer
└── js/
    ├── propeller-scripts.js          # Main JavaScript
    └── propeller-background-animation.js  # p5.js animation
```

## 🎯 Common Development Tasks

### CSS/Styling Changes
```bash
# Edit styles
nano hubspot-theme/css/propeller-styles.css

# Deploy CSS
cd hubspot-theme && hs upload css/ "/PRO-HubUI-CHAD EDIT/css/"

# Test on live site: https://propellervc.com/propeller-vc
```

### Homepage Template Updates  
```bash  
# Edit homepage
nano hubspot-theme/templates/propeller-homepage.html

# Deploy templates
cd hubspot-theme && hs upload templates/ "/PRO-HubUI-CHAD EDIT/templates/"
```

### Portfolio Logo Management
```bash
# Edit portfolio module
nano hubspot-theme/modules/Portfolio/Portfolio.module/module.html

# Deploy module  
cd hubspot-theme && hs upload modules/Portfolio/ "/PRO-HubUI-CHAD EDIT/modules/Portfolio/"
```

## 🐛 Known Issues & Fixes

### Typography Issue: Unwanted Heading Margins
**Problem**: H1-H6 elements had unwanted 25px margin-top  
**Root Cause**: Theme's `textSpacing` configuration in `css/tools/_config.css` set to "25px"  
**Solution**: Added override in `css/theme-overrides.css`:

```css
/* Remove unwanted top margins from headings */
h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
    margin-top: 0 !important;
}
```

## 🔧 HubSpot CLI Setup

### Installation & Authentication
```bash
# Install HubSpot CLI (if not installed)
npm install -g @hubspot/cli

# Check version  
hs --version

# Authentication is pre-configured in hubspot.config.yml
# Portal: chad_cli (ID: 20619041)
```

### Security Note
⚠️ The `hubspot.config.yml` file contains authentication credentials. Consider:
- Moving config to home directory: `/Users/chadpugh/`
- Adding to `.gitignore` if not already tracked
- Ensure credentials haven't been pushed to public repositories

## 📝 File Naming Conventions

- **CSS Files**: Use kebab-case (`propeller-styles.css`)
- **Templates**: Use kebab-case (`propeller-homepage.html`)  
- **Modules**: Use PascalCase for directories (`Portfolio/`)
- **JavaScript**: Use kebab-case (`propeller-scripts.js`)

## 🚨 Important Notes for LLMs

1. **Always check current working directory**: Should be `/Users/chadpugh/Build/propeller`

2. **HubSpot theme path**: All uploads go to `/PRO-HubUI-CHAD EDIT/` with escaped spaces

3. **CSS specificity**: Use `!important` sparingly, but necessary for theme overrides

4. **File structure**: Never modify `original-production-theme/` - this is backup only

5. **Testing**: Always verify changes on live site after deployment

6. **Commit messages**: Follow conventional commit format (`fix:`, `feat:`, `chore:`, etc.)

## 🔄 Complete Development Cycle Example

```bash
# 1. Make changes to CSS
nano hubspot-theme/css/propeller-styles.css

# 2. Deploy to HubSpot  
cd hubspot-theme && hs upload css/ "/PRO-HubUI-CHAD EDIT/css/"

# 3. Test on live site
# Visit: https://propellervc.com/propeller-vc

# 4. Save to version control
cd .. && git add . && git commit -m "feat: Add new styling for hero section" && git push origin main
```

## 📚 Additional Resources

- **HubSpot Theme Documentation**: https://developers.hubspot.com/docs/cms/developer-reference/themes
- **HubSpot CLI Commands**: `hs --help` for full command reference
- **Live Site**: https://propellervc.com/propeller-vc
- **HubSpot Theme Previewer**: https://app.hubspot.com/theme-previewer/20619041/edit/hubspot-theme

---

*Last Updated: October 2025*  
*This guide ensures smooth development workflow for all future contexts working on the Propeller VC website.*
