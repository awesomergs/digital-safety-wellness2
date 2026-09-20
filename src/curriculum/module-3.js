const MODULE_3 = {
  "title": "Account Security, Passwords & Authentication",
  "short": "Account Security",
  "time": "~10 min",
  "topics": [
    "Strong passwords",
    "Password managers",
    "Multi-factor authentication",
    "Account recovery"
  ],
  steps: [
    // ── INTRO LESSON ──
    {
      type: 'lesson',
      title: 'Why Account Security Matters',
      icon: '🔑',
      body: `Most people think getting hacked looks like a shadowy figure typing furiously at a keyboard, breaking through layers of code. Reality is much less dramatic - and much more avoidable.<br><br>
      Around <strong>80% of hacking-related breaches are caused by weak, stolen, or reused passwords</strong>. Attackers often don't need to "hack" anything - they just try credentials that already leaked from another site, or run automated tools that guess simple passwords in seconds. One weak password, reused across accounts, can give an intruder access to your email, bank, streaming services, and university portal all at once.`,
      cards: [
        {
          icon: '⚡',
          title: 'What Makes a Password Strong?',
          body: `Four things determine how resistant a password is to being cracked:<br><br>
          <strong>Length</strong> - at least 12–16 characters. Every extra character exponentially increases the number of combinations an attacker has to try. Short passwords (under 8 characters) can be cracked in seconds with modern tools.<br><br>
          <strong>Complexity</strong> - mix uppercase, lowercase, numbers, and symbols. A diverse character set eliminates simple patterns.<br><br>
          <strong>Unpredictability</strong> - avoid anything personal: birthdays, pet names, sports teams, your university's name. If it's easy for you to remember because it's meaningful to you, it may be guessable from your social media.<br><br>
          <strong>Uniqueness</strong> - never reuse a password across accounts. If one site is breached, attackers try those credentials everywhere else (called a <em>credential stuffing attack</em>). One reused password can cascade into losing control of every account that shares it.`
        }
      ]
    },

    // ── SCENARIO 1: The Credential Stuffing Attack ──
    {
      type: 'scenario',
      badge: 'Scenario 1 of 2',
      title: 'The Domino Effect',
      persona: 'first',
      text: `You've had the same password - <strong>Panthers2019!</strong> - since high school. It's got uppercase, lowercase, a number, and a symbol, so it always passes the strength meter. You use it (with minor tweaks like changing the year) for most of your accounts: your university email, Spotify, a gaming forum you joined years ago, and your bank's app.<br><br>
      One morning you wake up to an email: the gaming forum you forgot you even had an account on was breached - 4 million usernames and passwords exposed. You don't think much of it. It's just a gaming forum.<br><br>
      By noon, your Spotify has been taken over. By 2pm, someone has tried - and nearly succeeded - logging into your university email. Your bank sends a fraud alert.`,
      // ── IMAGE SLOT ──────────────────────────────────────────────────────────
      // To add a mock breach notification email screenshot here:
      //   image: { src: 'images/breach-notification.png', alt: 'Data breach notification email', caption: 'The email you almost ignored' }
      // ────────────────────────────────────────────────────────────────────────
      highlight: `"It's just a gaming forum." - Famous last words.`
    },
    {
      type: 'question',
      format: 'multiple',
      question: `Why were Spotify and the university email at risk when it was the gaming forum that got breached?`,
      options: [
        { text: 'The gaming forum shared user data with Spotify and the university directly.', correct: false },
        { text: 'Attackers used the leaked gaming forum credentials in a credential stuffing attack - automatically trying the same username and password across hundreds of other sites.', correct: true },
        { text: 'The breach gave attackers access to the device, which had saved passwords in the browser.', correct: false },
        { text: 'Spotify and the university were also breached at the same time - it was a coincidence.', correct: false }
      ],
      hint: `The common thread between all the affected accounts is the reused password. What do attackers do when they get a list of username/password pairs from a breach?`,
      explanation: `This is a <strong>credential stuffing attack</strong>. When a site is breached, automated scripts try those exact credentials across hundreds of other services — Gmail, banks, streaming platforms, university portals. If you reused the password, they're in. The gaming forum didn't share your data; it just provided the key that unlocked everywhere else you used the same one.`
    },
    {
      type: 'question',
      format: 'multiselect',
      question: `Which of these would have prevented or significantly limited the damage in this scenario? Select all that apply.`,
      options: [
        { text: 'Using a unique password for every account so a breach on one site doesn\'t affect others.', correct: true },
        { text: 'Using a password manager to generate and store strong, unique passwords.', correct: true },
        { text: 'Enabling multi-factor authentication on important accounts like email and banking.', correct: true },
        { text: 'Using a stronger version of the same password pattern - like Panthers2020!! instead.', correct: false },
        { text: 'Signing up with a different email address for less important sites.', correct: true },
        { text: 'Using private/incognito browsing mode when logging into sensitive accounts.', correct: false }
      ],
      hint: `Think about what actually breaks the chain - the fact that one password worked everywhere. Some options sound like security improvements but don't touch credential stuffing at all.`,
      explanation: `Three things break the credential stuffing chain: unique passwords (so one breach can't cascade), a password manager (makes unique passwords actually manageable), and MFA on critical accounts (so even a leaked password isn't enough). A different email for throwaway accounts limits exposure further. Tweaking the same password pattern doesn't help — attackers' scripts try common variations automatically. Private browsing stops your local browser from saving history, but credentials are still captured at the server side during a breach — it provides no protection against credential stuffing.`
    },
    {
      type: 'lesson',
      icon: '🗄️',
      title: 'Password Managers: The Practical Fix',
      body: `The reason most people reuse passwords is simple: human brains can't reliably remember dozens of unique, complex passwords. Password managers solve exactly this problem.`,
      cards: [
        {
          icon: '🛡️',
          title: 'How Password Managers Work',
          body: `A password manager generates, stores, and auto-fills strong passwords for every account you have. You only need to remember <strong>one master password</strong> - the manager handles everything else.<br><br>
          <strong>What you get:</strong>
          <div class="lesson-points">
            <div>
              <h4 class="lesson-point-title">Unique 16+ character passwords for every site</h4>
              <div class="lesson-body">Generated randomly - impossible to guess, and never reused across accounts.</div>
            </div>
            <div>
              <h4 class="lesson-point-title">Encrypted storage</h4>
              <div class="lesson-body">Your passwords sit in an encrypted vault. Even if the manager's servers were breached, the data is unreadable without your master password.</div>
            </div>
            <div>
              <h4 class="lesson-point-title">Auto-fill across devices</h4>
              <div class="lesson-body">Works on your phone, laptop, and browser - so there's no temptation to fall back on something simple.</div>
            </div>
            <div>
              <h4 class="lesson-point-title">Breach alerts</h4>
              <div class="lesson-body">Many managers notify you when a site you use has been compromised, so you can update that password before attackers try it elsewhere.</div>
            </div>
          </div>`
        }
      ]
    },

    // ── PASSWORD STRENGTH LAB ──
    {
      type: 'interactive',
      subtype: 'password-lab'
    },

    // ── SCENARIO 2: The MFA Moment ──
    {
      type: 'scenario',
      badge: 'Scenario 2 of 2',
      title: 'One Extra Step',
      persona: 'third',
      text: `Sam has a genuinely strong password on her university email - 18 characters, random, stored in a password manager. She's proud of it. What she hasn't set up is multi-factor authentication, mostly because she's been meaning to and it feels like one extra step.<br><br>
      A phishing email fools her into entering her credentials on a convincing fake login page. The attacker now has her password - the strong one she carefully generated. Within minutes they're in her email, and from there they trigger password resets on her linked accounts: her student financial aid portal, her university housing application, her course registration system.<br><br>
      Sam's strong password didn't fail her. The absence of a second factor did.`,
      highlight: `"It feels like one extra step." - It is. It also would have stopped this entirely.`
    },
    {
      type: 'question',
      format: 'multiple',
      question: `Sam had a strong, unique password. Why wasn't that enough to stop the attacker?`,
      options: [
        { text: 'Her password manager was hacked and exposed her credentials.', correct: false },
        { text: 'Strong passwords can always be cracked given enough time.', correct: false },
        { text: 'She was phished - she entered her password on a fake site herself, handing it to the attacker directly. MFA would have blocked access even with the correct password.', correct: true },
        { text: 'The attacker guessed her password through a dictionary attack.', correct: false }
      ],
      hint: `The password wasn't cracked - it was given away. Think about what MFA adds to the equation when a password is already compromised.`,
      explanation: `Phishing bypasses password strength entirely — it tricks you into handing over your credentials voluntarily. No matter how strong a password is, typing it into a fake login page gives the attacker the correct one. <strong>MFA is the critical second layer</strong>: even with the right password, the attacker also needs your phone or authenticator app. Microsoft and Google report MFA blocks over 99% of automated account takeover attacks.`
    },
    {
      type: 'lesson',
      icon: '🔐',
      title: 'Multi-Factor Authentication & Account Recovery',
      body: `MFA means logging in requires more than one "factor" - something you <em>know</em> (password), something you <em>have</em> (your phone or a key), or something you <em>are</em> (biometrics). Combining at least two makes an account dramatically harder to take over.`,
      cards: [
        {
          icon: '🔄',
          title: 'Securing Your Account Recovery',
          body: `Your account is only as secure as its weakest recovery option. Attackers often skip the password entirely and target the recovery process instead.<br><br>
          <strong>Use a separate recovery email</strong> - create a secondary email address used only for account recovery messages. Never use it for anything else. If no one knows it exists, it's much harder to target.<br><br>
          <strong>Keep recovery info up to date</strong> - an old phone number you no longer own could be receiving your reset codes. Remove it.<br><br>
          <strong>Don't answer security questions honestly</strong> - "What was your first pet's name?" is guessable from your social media. Treat security question answers like passwords: random, unguessable, stored in your password manager.<br><br>
          <strong>Generate and store backup codes</strong> - most major platforms (Google, Instagram, etc.) let you download one-time backup codes. Save them somewhere secure - a locked note in your password manager, or printed and physically stored. These are your lifeline if you lose access to your authenticator app.`
        }
      ]
    },
    {
      type: 'question',
      format: 'multiple',
      question: `Hardware security keys are the most secure MFA option - but they're not practical for most people's everyday accounts. For the majority of students, what's the best realistic MFA to set up today?`,
      options: [
        { text: 'SMS text message codes - they\'re built into your phone and require no extra setup.', correct: false },
        { text: 'Security questions - they work even without a phone.', correct: false },
        { text: 'An authenticator app (like Google Authenticator or Authy) - nearly as secure as a hardware key, free, and works on any smartphone.', correct: true },
        { text: 'Email magic links - if your email is secure, everything linked to it is too.', correct: false }
      ],
      hint: `Think about what's both genuinely secure AND something most students would actually use. The best security tool is the one you'll actually set up.`,
      explanation: `<strong>Authenticator apps</strong> are the practical gold standard. They generate codes locally on your device — codes never travel over the phone network, so they can't be intercepted via SIM swapping the way SMS codes can. Hardware keys (like YubiKey) are technically more secure but cost money and require a physical key on hand. SMS is better than nothing but weakest of the real MFA options. Security questions are not MFA — just a second password with predictable answers.`
    },

    // ── MINI TEST ──
    {
      type: 'minitest',
      title: `Let's see what stuck`,
      subtitle: `Module 3 · 8 questions · Need 80% to pass`,
      questions: [
        {
          format: 'multiple',
          question: `You're hesitant to use a password manager - isn't storing all your passwords in one place dangerous if it gets breached? What actually keeps them safe?`,
          options: [
            { text: 'Nothing really - it is a genuine risk, so you should still memorize your most important passwords yourself.', correct: false },
            { text: 'Your passwords sit in an encrypted vault that is unreadable without your master password - so even if the company\'s servers were breached, the stolen data is scrambled.', correct: true },
            { text: 'The password manager company manually reviews every login attempt and blocks anything suspicious.', correct: false },
            { text: 'Each password is emailed to you so the manager never has to store it on its servers.', correct: false }
          ],
          explanation: `Password managers store your credentials in an <strong>encrypted vault</strong>. The data is mathematically scrambled and can only be unlocked with your master password — which the company never stores. Even if their servers were breached, attackers would get unreadable ciphertext, not your passwords. That's why a manager is far safer than reusing a handful of memorable passwords everywhere.`
        },
        {
          format: 'truefalse',
          question: `A password like "Panthers2019!" that passes a strength meter is safe to reuse across multiple accounts.`,
          options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
          ],
          explanation: `Passing a strength meter means the password is hard to guess in isolation. But if it's reused and one site leaks it, complexity becomes irrelevant — attackers already have it in plaintext. Uniqueness matters as much as complexity. A password manager is the solution.`
        },
        {
          format: 'multiple',
          question: `You're setting up MFA on your university email. The options are: a text message code, an authenticator app, or a hardware key. You don't own a hardware key. Which should you choose?`,
          options: [
            { text: 'Text message code — it\'s the simplest and your phone is always with you.', correct: false },
            { text: 'An authenticator app like Google Authenticator or Authy — it\'s more secure than SMS and free to set up.', correct: true },
            { text: 'Skip MFA for now — your password is already strong.', correct: false },
            { text: 'Wait until you can get a hardware key before setting anything up.', correct: false }
          ],
          explanation: `An authenticator app is the best realistic option here — it generates codes locally on your device rather than sending them over the phone network, making them much harder to intercept than SMS codes. Setting it up now beats waiting for a hardware key you may never get. A strong password alone isn't enough if it's ever phished.`
        },
        {
          format: 'multiselect',
          question: `Which of the following are good password practices? Select all that apply.`,
          options: [
            { text: 'Using a unique password for every account.', correct: true },
            { text: 'Making passwords at least 12–16 characters long.', correct: true },
            { text: 'Using your dog\'s name plus your birth year - easy to remember and personal.', correct: false },
            { text: 'Using a password manager to generate and store credentials.', correct: true },
            { text: 'Changing your password slightly each time you update it (e.g., Panthers2019 → Panthers2020).', correct: false }
          ],
          hint: `Think about what actually makes a password resistant: uniqueness, length, unpredictability. Which options address those, and which ones just feel like they do?`,
          explanation: `Good practices: uniqueness (prevents credential stuffing), length (slows brute force), and a password manager (makes both practical). Personal info makes passwords guessable from social media. Incremental changes — Panthers2019 → Panthers2020 — are one of the first variations attackers' scripts try; it provides almost no additional security.`
        },
        {
          format: 'multiple',
          question: `You're trying to create a new password for your bank account. Which of these is the strongest choice?`,
          options: [
            { text: 'Panthers2019! — uppercase, lowercase, number, and symbol.', correct: false },
            { text: 'Your childhood street name plus your birth year.', correct: false },
            { text: 'A random 18-character string generated by your password manager, like "xQ7#mL2vPk9!nRj4Ws".', correct: true },
            { text: 'A word you\'ll remember easily, with an exclamation mark at the end.', correct: false }
          ],
          explanation: `The password manager's randomly generated string wins on every front: long, no personal information, no predictable patterns, and stored for you so you never have to remember it. The others might pass a strength meter but are either guessable from personal info or follow patterns attackers routinely try.`
        },
        {
          format: 'truefalse',
          question: `Security questions like "What was your mother's maiden name?" are a strong form of account protection.`,
          options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
          ],
          explanation: `Security questions are one of the weakest forms of account protection. Answers are often findable through social media, public records, or social engineering. They're essentially a second password - but one with a limited set of predictable answers. If a service requires them, treat the answers like passwords: use random, unguessable responses and store them in your password manager.`
        },
        {
          format: 'multiple',
          question: `You need a password you'll have to type by hand, so it has to be memorable. Which approach is genuinely the strongest?`,
          options: [
            { text: 'A short word with letters swapped for symbols, like "P@ssw0rd".', correct: false },
            { text: 'A passphrase of several unrelated words with a number or symbol mixed in, like "Correct!Horse#Battery99".', correct: true },
            { text: 'A favorite word followed by the current year, like "Sunshine2026".', correct: false },
            { text: 'A complex but short 8-character string like "X7!q2#Lp".', correct: false }
          ],
          explanation: `A <strong>passphrase</strong> of unrelated words is long, hard to brute-force, and easy to remember — length does most of the work. Obvious character swaps like "P@ssw0rd" are accounted for by cracking tools and already sit in breach databases. A word plus the year is guessable and follows a pattern attackers try first. And a short 8-character string, even a complex one, has less entropy than a long passphrase. Length beats complexity.`
        },
        {
          format: 'multiple',
          question: `Sam has a strong unique password but no MFA. An attacker phishes her login and gets in. Which of these would have prevented account access even after the phishing attack succeeded?`,
          options: [
            { text: 'A longer password - 24 characters instead of 18.', correct: false },
            { text: 'Multi-factor authentication - the attacker would need a second factor (phone, key) they don\'t have.', correct: true },
            { text: 'A different password manager - some are more phishing-resistant.', correct: false },
            { text: 'Reporting the phishing email to her university IT department first.', correct: false }
          ],
          explanation: `Password length and complexity don't matter once a password is phished — the attacker already has the correct credentials. MFA is the layer that protects you even when a password is compromised: they'd also need physical access to your second factor (phone, hardware key). This is why MFA on email, banking, and your university account is non-negotiable.`
        }
      ]
    }
  ]
};
