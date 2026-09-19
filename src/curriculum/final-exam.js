const FINAL_EXAM_QUESTIONS = [
  // ── MODULE 1: Scams & Social Engineering ──
  {
    module: 1, format: 'multiple',
    question: `An email arrives claiming to be from your bank's fraud team. It looks official and uses your real name. The sender address is "security@yourbank-alerts-verify.com." What should you do?`,
    options: [
      { text: 'Reply to confirm whether it\'s real - if it\'s fraud, the bank needs to know immediately.', correct: false },
      { text: 'Click the link in the email to check your account directly.', correct: false },
      { text: 'Do not click anything. Call your bank using the number on the back of your card to verify independently.', correct: true },
      { text: 'Ignore the email address - display names are what matter, not the domain.', correct: false }
    ],
    explanation: `The domain "yourbank-alerts-verify.com" is not your bank's real domain - it's a lookalike. Replying or clicking anything in the email hands the attacker access. Out-of-band verification (calling the number you already have) is correct every time.`
  },
  {
    module: 1, format: 'truefalse',
    question: `Spear phishing attacks are more dangerous than regular phishing because the attacker customizes the message using information researched specifically about you.`,
    options: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ],
    explanation: `True. Regular phishing is a mass blast - millions of identical emails. Spear phishing researches the target and crafts a message that feels personal and credible, bypassing the "this seems generic" instinct that catches regular phishing.`
  },
  {
    module: 1, format: 'multiple',
    question: `Your "employer" sends you a $2,500 check before you've done any work, asks you to keep $400 as pay, and wire the rest to a vendor for equipment. What is this?`,
    options: [
      { text: 'A legitimate onboarding process - many remote companies pay this way.', correct: false },
      { text: 'A fake job / overpayment scam - the check will bounce after you wire the money, and you\'ll lose what you sent.', correct: true },
      { text: 'A money laundering test to vet your trustworthiness.', correct: false },
      { text: 'A payroll error that happens frequently with new hires.', correct: false }
    ],
    explanation: `The check is counterfeit - it appears to clear but is reversed days later. Any money you wired is gone permanently. A legitimate employer never sends you money before work and asks you to forward it to a third party.`
  },
  {
    module: 1, format: 'multiselect',
    question: `Which of these are red flags that a payment app interaction might be a scam? Select all that apply.`,
    options: [
      { text: 'A stranger sends you money "by mistake" and urgently asks for it back.', correct: true },
      { text: 'Someone claims a time-limited emergency requiring an immediate transfer.', correct: true },
      { text: 'A "bank representative" walks you through sending money to a "secure account."', correct: true },
      { text: 'A contact you know sends you a routine payment for split expenses.', correct: false },
      { text: 'A seller accepts Venmo for a Marketplace transaction.', correct: false }
    ],
    hint: `Look for strangers, urgency, and instructions to move money in unusual ways.`,
    explanation: `The three scam patterns are: "accidental" stranger payments (the reversal scam), urgency-driven emergency transfers, and anyone posing as a bank and asking you to move funds - banks never do this. A known contact splitting expenses or a normal Venmo sale are not scam signals.`
  },
  {
    module: 1, format: 'multiple',
    question: `What is the correct order of the Social Engineering Attack Cycle?`,
    options: [
      { text: 'Hook → Research → Play → Exit', correct: false },
      { text: 'Play → Hook → Research → Exit', correct: false },
      { text: 'Research → Hook → Play → Exit', correct: true },
      { text: 'Research → Play → Exit → Hook', correct: false }
    ],
    explanation: `Research (gathering intel on the target) always comes first, then Hook (making contact and building trust), Play (executing the scam), and Exit (disappearing). The research phase is what makes social engineering feel personal.`
  },
  // ── MODULE 2: Social Media & Digital Well-being ──
  {
    module: 2, format: 'truefalse',
    question: `Most major social media platforms default to private account settings when you first sign up.`,
    options: [
      { text: 'True', correct: false },
      { text: 'False', correct: true }
    ],
    explanation: `False. Most platforms default to public - maximizing reach and engagement drives ad revenue. Protecting your privacy requires actively changing your settings.`
  },
  {
    module: 2, format: 'multiple',
    question: `An online acquaintance tells you that you have "a special connection unlike anything they've felt before," wants to move to WhatsApp, and says you're the only one they can talk to. Which grooming stage is this?`,
    options: [
      { text: 'Targeting - identifying whether you are suitable.', correct: false },
      { text: 'Filling a role and beginning isolation - creating emotional dependency and moving off a monitored platform.', correct: true },
      { text: 'Sexualization - introducing inappropriate content.', correct: false },
      { text: 'Coercion - using leverage to maintain control.', correct: false }
    ],
    explanation: `Claiming intense unique bonds, creating emotional dependency ("you're the only one"), and pushing to leave the main platform are hallmarks of filling a role and early isolation. This is the point to stop contact, block, and tell someone you trust.`
  },
  {
    module: 2, format: 'multiselect',
    question: `Which strategies help protect you from algorithmic rabbit holes? Select all that apply.`,
    options: [
      { text: 'Following accounts with diverse and opposing perspectives.', correct: true },
      { text: 'Using platform tools to reset your recommendations when they feel one-sided.', correct: true },
      { text: 'Setting screen time limits to avoid hours of passive autoplay.', correct: true },
      { text: 'Trusting the algorithm - it knows your interests better than you do.', correct: false },
      { text: 'Pausing when content provokes strong outrage or fear to ask if it\'s designed to provoke that reaction.', correct: true },
      { text: 'Switching to private/incognito mode when using social media so the algorithm can\'t build a profile on you.', correct: false }
    ],
    hint: `Think about what gives you genuine active control over your feed. Two options here either surrender that control entirely or target the wrong mechanism.`,
    explanation: `Diversifying your feed, using reset tools, limiting passive scrolling, and questioning emotionally charged content all give you agency over a system designed to keep you passive. Trusting the algorithm is the opposite — it optimizes for engagement, not your well-being. Incognito mode prevents local browser history but has no effect on platform algorithms — those track you through your logged-in account, not browser cookies.`
  },
  {
    module: 2, format: 'multiple',
    question: `You're being harassed via repeated threatening messages. Before blocking the sender, what must you do first?`,
    options: [
      { text: 'Reply once firmly telling them to stop - this creates a legal record.', correct: false },
      { text: 'Report to the platform and wait for them to act before blocking.', correct: false },
      { text: 'Delete the conversation to protect your own privacy, then block.', correct: false },
      { text: 'Screenshot all evidence - dates, times, usernames, full message content - then block.', correct: true }
    ],
    explanation: `Evidence first, always. Once you block, access to the full history may be limited. Screenshots need to capture the full thread, timestamps, and the sender's handle to show pattern and escalation. Never delete evidence before reporting.`
  },
  // ── MODULE 3: Account Security ──
  {
    module: 3, format: 'truefalse',
    question: `A strong, complex password is safe to reuse across multiple accounts as long as it passes a strength meter.`,
    options: [
      { text: 'True', correct: false },
      { text: 'False', correct: true }
    ],
    explanation: `False. Password strength only matters in isolation. If reused and one site is breached, attackers run the credentials against every other service automatically (credential stuffing). Uniqueness matters as much as complexity.`
  },
  {
    module: 3, format: 'multiple',
    question: `Why is a hardware security key (like a YubiKey) more secure than SMS-based MFA?`,
    options: [
      { text: 'Hardware keys generate longer codes that are harder to guess.', correct: false },
      { text: 'Hardware keys are free, while SMS MFA incurs carrier charges.', correct: false },
      { text: 'Hardware keys work without internet, making them faster.', correct: false },
      { text: 'Hardware keys require physical possession and cannot be intercepted remotely - SMS codes can be hijacked via SIM swapping.', correct: true }
    ],
    explanation: `SIM swapping lets criminals receive your SMS codes by convincing your carrier to transfer your number. Hardware keys use cryptographic authentication requiring physical presence - impossible to intercept remotely.`
  },
  {
    module: 3, format: 'multiselect',
    question: `Which of these are good account security practices? Select all that apply.`,
    options: [
      { text: 'Using a unique password for every account.', correct: true },
      { text: 'Using a password manager to generate and store credentials.', correct: true },
      { text: 'Incrementing your password each year - Password2024 → Password2025.', correct: false },
      { text: 'Answering security questions with random unguessable answers stored in your password manager.', correct: true },
      { text: 'Creating a dedicated secondary email used only for account recovery.', correct: true },
      { text: 'Relying on SMS text message codes as your only form of multi-factor authentication since it\'s more convenient than an authenticator app.', correct: false }
    ],
    hint: `Which practices actually break attacker patterns — and which ones only feel like they do or have well-known weaknesses?`,
    explanation: `Unique passwords prevent credential stuffing, password managers make that practical, random security answers resist social engineering, and a secret recovery email is hard to target. Incrementing a year is one of the first variations attackers' scripts try — almost no real security gain. SMS-based MFA is vulnerable to SIM-swapping, where attackers convince your carrier to transfer your number to a new device, intercepting your codes. An authenticator app or passkey is significantly more secure.`
  },
  {
    module: 3, format: 'multiple',
    question: `You lose the phone with your authenticator app. What should you have prepared in advance to recover your accounts?`,
    options: [
      { text: 'Your security question answers - the fallback for exactly this.', correct: false },
      { text: 'A backup SMS number on your carrier account.', correct: false },
      { text: 'One-time backup recovery codes generated by each service, stored securely offline or in your password manager.', correct: true },
      { text: 'Nothing - you contact each service individually and prove identity from scratch.', correct: false }
    ],
    explanation: `Most platforms let you generate one-time backup recovery codes when setting up MFA - specifically for lost-device scenarios. Store them in a locked password manager note or printed securely. Security questions are weak; SMS backup is vulnerable to SIM swapping.`
  },
  // ── MODULE 4: Reporting & Rights ──
  {
    module: 4, format: 'multiple',
    question: `When multiple accounts are compromised at once, which do you secure first and why?`,
    options: [
      { text: 'Your bank account - financial loss is the most immediate threat.', correct: false },
      { text: 'Your university portal - academic records are most sensitive.', correct: false },
      { text: 'Whichever account the attacker is actively posting from.', correct: false },
      { text: 'Your email - it\'s the master key controlling password resets for everything else.', correct: true }
    ],
    explanation: `Email controls everything. Nearly every service sends password reset links there - whoever controls your email can lock you out of every linked account within minutes. Secure email first; everything else follows.`
  },
  {
    module: 4, format: 'truefalse',
    question: `Under California's Security Breach Act, a company must notify you in plain language if your personal data is exposed in a breach.`,
    options: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ],
    explanation: `True. California's Security Breach Act requires organizations to notify affected individuals in plain language explaining what was exposed, when, and what the company is doing about it. If sensitive data like SSNs was involved, they must also provide at least 12 months of free credit monitoring.`
  },
  {
    module: 4, format: 'multiple',
    question: `Forwarding a harassing email to yourself is the best way to preserve it as legal evidence.`,
    options: [
      { text: 'True - forwarding creates a timestamped copy proving when you received it.', correct: false },
      { text: 'True - as long as you forward it to a different email address you control.', correct: false },
      { text: 'False - forwarding strips original headers containing sender IP, routing data, and authentication info investigators need.', correct: true },
      { text: 'False - emails cannot be used as evidence regardless of how they are saved.', correct: false }
    ],
    explanation: `Forwarding strips the original headers - sender IP, routing path, authentication records - that are often the most forensically valuable data. Screenshot the email in place showing the full sender address, or export the raw email file. Keep originals untouched.`
  },
  {
    module: 4, format: 'multiselect',
    question: `After receiving a data breach notification, which steps should you take? Select all that apply.`,
    options: [
      { text: 'Change your password on that site and any account using the same password.', correct: true },
      { text: 'Place a free credit freeze at the major credit bureaus.', correct: true },
      { text: 'Monitor existing accounts for unfamiliar charges over the coming months.', correct: true },
      { text: 'Be alert for targeted phishing using your breached personal details.', correct: true },
      { text: 'Accept the credit monitoring offer and consider the matter fully resolved.', correct: false }
    ],
    hint: `The monitoring offer is one tool. Think about what the breach exposed and what each piece enables.`,
    explanation: `All four active steps matter: unique passwords prevent credential stuffing, a credit freeze blocks new accounts in your name, monitoring catches fraudulent use, and awareness of targeted phishing is critical - breached data is sold to make scams more convincing. The monitoring offer addresses only one slice of the risk.`
  },
  // ── CROSS-MODULE: Applied Judgment ──
  {
    module: 0, format: 'multiple',
    question: `A call comes in from what sounds exactly like your roommate's voice saying they're abroad and in trouble - please wire $800 immediately, and don't tell anyone yet. What do you do?`,
    options: [
      { text: 'Wire the money - it sounds like them and it\'s an emergency.', correct: false },
      { text: 'Ask a personal question only your roommate would know.', correct: false },
      { text: 'Hang up and call your roommate\'s number directly from your own contacts to verify.', correct: true },
      { text: 'Call their parents first to check.', correct: false }
    ],
    explanation: `This is a deepfake voice / vishing scam. AI can clone a voice from seconds of online audio. Hang up and call back on the number you already have - out-of-band verification. "Don't tell anyone" is a deliberate isolation tactic. Real emergencies don't require wire transfers or gift cards.`
  },
  {
    module: 0, format: 'multiselect',
    question: `Which of these are reportable digital incidents? Select all that apply.`,
    options: [
      { text: 'A login alert from an unrecognized device in another country.', correct: true },
      { text: 'Repeated threatening messages that reference your home address.', correct: true },
      { text: 'A data breach notification exposing your email and home address.', correct: true },
      { text: 'A private photo of you shared without your consent.', correct: true },
      { text: 'A one-time marketing email you didn\'t sign up for.', correct: false }
    ],
    hint: `Think across all four modules: account compromise, harassment, data breaches, nonconsensual content. One option is annoying but not a digital incident.`,
    explanation: `All four affirmative options are genuine incidents requiring action. An unwanted marketing email is a nuisance and possibly a privacy issue, but doesn't rise to the level of a reportable digital incident.`
  },
  {
    module: 0, format: 'multiple',
    question: `Of the following habits, which provides the broadest protection across all the threats covered in this training?`,
    options: [
      { text: 'Using a VPN on all public Wi-Fi networks.', correct: false },
      { text: 'Keeping all your social media accounts set to private.', correct: false },
      { text: 'Pausing before acting whenever something creates urgency, asks for money, or requests personal information - and verifying through a channel you control.', correct: true },
      { text: 'Using a different browser for all sensitive activities.', correct: false }
    ],
    explanation: `Nearly every threat across all four modules relies on your immediate reaction before critical thinking kicks in. The habit of pausing + verifying independently disrupts social engineering, prevents credential hand-offs, and gives you time to recognize manipulation. It's the one meta-skill that applies everywhere - the other options address specific attack vectors but don't transfer broadly.`
  }
];
