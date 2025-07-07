# Security Policy

## Supported Versions

We actively maintain security updates for the following versions of Anzii:

| Version | Supported          | Notes                       |
| ------- | ------------------ | --------------------------- |
| 0.1.x   | :white_check_mark: | Current development version |
| main    | :white_check_mark: | Latest development branch   |

## Reporting a Vulnerability

We take the security of Anzii seriously. If you discover a security vulnerability, please follow responsible disclosure practices.

### 🚨 How to Report

**DO NOT** report security vulnerabilities through public GitHub issues.

**Instead, please email us directly:**

- **Email**: security@anzii.space
- **Subject**: [SECURITY] Brief description of the issue

### 📋 What to Include

Please provide as much information as possible:

- **Description**: Clear explanation of the vulnerability
- **Impact**: Potential consequences and affected components
- **Reproduction**: Step-by-step instructions to reproduce
- **Evidence**: Screenshots, logs, or proof-of-concept (if safe)
- **Affected versions**: Which versions are impacted
- **Suggested fix**: If you have ideas for remediation

### 🛡️ Security Scope

Areas we're particularly interested in:

- **Authentication & Authorization**: User access controls
- **Data Protection**: Personal learning data and study materials
- **AI Integration**: Gemini API key handling and data processing
- **Database Security**: SQL injection and data exposure
- **File Upload**: Malicious file processing (PDFs, text, markdown)
- **Cross-Site Scripting (XSS)**: Client-side security
- **Cross-Site Request Forgery (CSRF)**: State-changing operations

### ⏱️ Response Timeline

- **Acknowledgment**: Within 24 hours of report
- **Initial Assessment**: Within 3 business days
- **Regular Updates**: Weekly status updates during investigation
- **Resolution**: Varies by complexity, typically 2-4 weeks
- **Disclosure**: Coordinated disclosure after fix is deployed

### 🏆 Recognition

We believe in recognizing security researchers who help make Anzii safer:

- **Hall of Fame**: Public recognition on our website (with permission)
- **Special Thanks**: Acknowledgment in release notes
- **Direct Communication**: Direct line to our development team
- **Early Access**: Preview of security improvements

## Security Measures

### Current Protections

- **Data Encryption**: All data encrypted in transit and at rest
- **Authentication**: Secure user authentication via Stack Auth
- **Database Security**: Parameterized queries preventing SQL injection
- **API Security**: Rate limiting and input validation
- **Content Security**: File upload validation and scanning
- **Environment Variables**: Secure handling of API keys and secrets

### Ongoing Security Practices

- **Dependency Scanning**: Automated vulnerability detection
- **Code Reviews**: Security-focused peer reviews
- **Regular Updates**: Prompt application of security patches
- **Access Controls**: Principle of least privilege
- **Monitoring**: Automated security monitoring and alerting

## Data Privacy

Anzii processes educational content and learning data. We are committed to:

- **Minimal Data Collection**: Only necessary information
- **Purpose Limitation**: Data used only for intended learning features
- **User Control**: Easy data export and deletion
- **Transparency**: Clear privacy policy and data handling practices

## Third-Party Integrations

Security considerations for our integrations:

- **Google Gemini AI**: API key rotation and secure transmission
- **Neon Database**: Encrypted connections and access controls
- **Vercel Deployment**: Secure environment variable handling
- **Analytics**: Privacy-focused telemetry with user consent

## Security Updates

Stay informed about security updates:

- **Watch this repository** for security advisories
- **Follow our releases** for security patch notes
- **Subscribe to notifications** for critical updates

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

For any security-related questions or concerns:

- We will acknowledge receipt within 48 hours
- We will provide a detailed response within 5 business days
- We will keep you updated on our progress

Thank you for helping keep Anzii and our learning community secure!
