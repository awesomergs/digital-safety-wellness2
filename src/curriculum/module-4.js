const MODULE_4 = {
  "title": "Reporting & Student Rights",
  "short": "Reporting & Rights",
  "time": "~12 min",
  "topics": [
    "What counts as an incident",
    "Containment steps",
    "Evidence preservation",
    "California privacy rights"
  ],
  steps: [
    // ── INTRO LESSON ──
    {
      type: 'lesson',
      title: 'What Counts as a Digital Incident?',
      icon: '⚖️',
      body: `A lot of people don't report digital incidents because they're not sure it "counts" - that it was serious enough, or that anyone can actually help. That uncertainty is exactly what bad actors count on.<br><br>
      Here's the reality: <strong>you have more rights and more options than you probably know about</strong> - especially as a student in California. This module covers what qualifies as a digital incident, what to do immediately when one happens, how to preserve evidence, and exactly who you can turn to.`,
      cards: [
        {
          icon: '📋',
          title: 'Five Types of Digital Incidents',
          body: `<strong>Account Compromise</strong> - someone gains unauthorized access to your email, social media, or university account. Signs include: password reset emails you didn't request, login notifications from unknown locations, contacts telling you they received strange messages from you.<br><br>
          <strong>Nonconsensual Image Sharing</strong> - private photos or videos shared without your consent (also called "revenge porn"). This is illegal in California and constitutes sexual harassment.<br><br>
          <strong>Harassment, Stalking, or Threats</strong> - repeated unwanted messages that threaten, intimidate, or humiliate. California law defines cyberbullying as anyone who sends communications to deliberately frighten, embarrass, harass, or target another person.<br><br>
          <strong>Doxxing or Data Exposure</strong> - your private personal information (address, phone, financial or medical details) is published online to expose or harm you.<br><br>
          <strong>Device or Malware Compromise</strong> - your computer or phone is infected with software that lets an attacker read your files, record your screen, or access your accounts remotely.`
        }
      ]
    },

    // ── SCENARIO 1: Account Takeover ──
    {
      type: 'scenario',
      badge: 'Scenario 1 of 3',
      title: 'Locked Out',
      persona: 'first',
      text: `You wake up Saturday morning to a string of notifications. Three people have texted asking if you're okay. Your Instagram is sending DMs to people you barely know. Your email has a "your password was changed" notification - but you didn't change it.<br><br>
      Someone got into your email first - and from there, used it to take over your linked Instagram and lock you out of both. Your phone number is still connected to the Instagram account, but when you try to use it to recover access, the code goes to an email address you don't recognize - one the attacker added before locking you out.<br><br>
      It's 7am on a Saturday. You feel panicked and don't know where to start.`,
      // ── IMAGE SLOT ──────────────────────────────────────────────────────────
      // To add a mock screenshot of suspicious login notifications or the compromised account here:
      //   image: { src: 'images/account-takeover-notifications.png', alt: 'Screenshots of suspicious account activity notifications', caption: 'What you woke up to' }
      // ────────────────────────────────────────────────────────────────────────
      highlight: `Three texts asking if you're okay. An email you didn't send. A password you didn't change.`
    },
    {
      type: 'question',
      format: 'multiple',
      question: `Your Instagram and email are both compromised. What's the single most important first thing to do?`,
      options: [
        { text: 'Post on another social media platform to warn your followers that you\'ve been hacked.', correct: false },
        { text: 'Secure your email account first - it\'s the master key that controls password resets for everything else.', correct: true },
        { text: 'Call Instagram support immediately to report the hack.', correct: false },
        { text: 'Change your phone\'s passcode so the attacker can\'t access your device.', correct: false }
      ],
      hint: `Think about which account gives an attacker the most leverage over everything else. Password resets for almost every service - Instagram, Spotify, banking - all get sent to one place.`,
      explanation: `Your email is the master key to your digital life — nearly every password reset and recovery link gets sent there. If an attacker controls your email, they can lock you out of every account linked to it. Securing email first limits the blast radius before the attacker can pivot to other accounts.`
    },
    {
      type: 'question',
      format: 'multiselect',
      question: `Once you've regained access to your accounts, which of these steps should you take? Select all that apply.`,
      options: [
        { text: 'Change passwords on all affected and linked accounts immediately - use unique, strong passwords.', correct: true },
        { text: 'Enable or reset multi-factor authentication on every recovered account.', correct: true },
        { text: 'Review account activity logs for unknown IP addresses or locations and screenshot them as evidence.', correct: true },
        { text: 'Log out of all active sessions to kick the attacker off any devices they\'re still using.', correct: true },
        { text: 'Delete the accounts entirely to prevent future attacks.', correct: false },
        { text: 'Notify your contacts that messages from your account during the compromise were not from you.', correct: true }
      ],
      hint: `Think about what a thorough recovery looks like: locking the attacker out, documenting what happened, and cleaning up any damage they caused. One of these options is an overreaction.`,
      explanation: `All five positive steps are part of a proper recovery: new unique passwords block re-entry, MFA adds the layer that was missing, screenshotting activity logs preserves evidence, logging out of all sessions kicks the attacker off, and notifying contacts protects them from acting on fraudulent messages. Deleting accounts is an overreaction — it destroys your presence and evidence without preventing future attacks.`
    },
    {
      type: 'lesson',
      icon: '📸',
      title: 'Preserving Evidence: Do This Before You Do Anything Else',
      body: `Before you block, delete, or report anything - <strong>screenshot first</strong>. Evidence that's gone before it's documented can't help you later, whether you're reporting to a platform, your campus, or law enforcement.`,
      cards: [
        {
          icon: '🗂️',
          title: 'How to Preserve Evidence Correctly',
          body: `<strong>Capture the right details:</strong> Screenshots should include the date, time, username/handle, and the full content of the message or post. Don't crop out context - show the full conversation thread where possible.<br><br>
          <strong>Save originals - don't just forward:</strong> Forwarding an email strips out the original headers (sender IP, routing info, timestamps) that investigators need. Save the email in place or export it; take a screenshot showing the sender address and full subject line.<br><br>
          <strong>Preserve metadata:</strong> Original digital files contain metadata - timestamps, sender info, IP addresses - that can be crucial evidence. Keep an unaltered master copy of everything and work from duplicates if you need to share.<br><br>
          <strong>Organize and document:</strong> Put everything in one secure folder. Keep a simple log: <em>"On [date] at [time] I received [description] from [username/number]."</em> This chain of custody note matters if the evidence is ever used officially.<br><br>
          <strong>Back it up:</strong> Save copies in at least two places - your device and cloud storage, or a USB drive. If the attacker tries to delete content, your copy survives.`
        }
      ]
    },

    // ── SCENARIO 2: Harassment ──
    {
      type: 'scenario',
      badge: 'Scenario 2 of 3',
      title: 'Does This Count?',
      persona: 'third',
      text: `Riley has been getting DMs from someone she went on two dates with three months ago. At first they were just awkward - asking to get back together. But over the past two weeks they've gotten more frequent and more hostile. He knows what time she leaves for class. One message said "I know where you live." Another sent a photo of the outside of her apartment building.<br><br>
      Riley hasn't responded to any of them. She hasn't blocked him yet because she's scared it'll make things worse. She's been telling herself it's probably nothing, that she's overreacting, that it doesn't "count" as something worth reporting because no one's actually done anything physical.<br><br>
      Her roommate finally convinces her to look into her options.`,
      // ── IMAGE SLOT ──────────────────────────────────────────────────────────
      // To add a mock DM conversation showing escalating harassment here:
      //   image: { src: 'images/harassment-dms.png', alt: 'Screenshot of escalating threatening messages', caption: 'The messages Riley received over two weeks' }
      // ────────────────────────────────────────────────────────────────────────
      highlight: `"I know where you live." - This counts. This has always counted.`
    },
    {
      type: 'question',
      format: 'multiselect',
      question: `Which of these reporting pathways are available to Riley? Select all that apply.`,
      options: [
        { text: 'Report the account through Instagram\'s in-app reporting tools.', correct: true },
        { text: 'Report to her university\'s Title IX office or Student Conduct office, especially if the person is a fellow student.', correct: true },
        { text: 'Contact campus safety or police - "I know where you live" combined with surveillance photos constitutes a credible threat.', correct: true },
        { text: 'File a report with the FBI\'s Internet Crime Complaint Center (IC3) for online threats.', correct: true },
        { text: 'Nothing - she needs to wait until something physical happens before any of these options apply.', correct: false },
        { text: 'Post publicly about the harassment to warn others and pressure the platform to act faster.', correct: false }
      ],
      hint: `Think about who has jurisdiction here: the platform, the campus, local law enforcement, and federal resources for online crime. Riley has multiple simultaneous pathways — but one option here would actively undermine her case.`,
      explanation: `Riley has four active reporting pathways — and can use all of them at once. Platform reporting creates an official record and can remove the account. Title IX or Student Conduct applies if he's campus-affiliated. Campus safety or police are appropriate because "I know where you live" plus a photo of her building is a credible threat — no physical contact required. IC3 handles internet-based crimes. Waiting for a physical incident is never required. Posting publicly about active harassment, however, can tip off the harasser, compromise an ongoing investigation, and undermine a potential legal case — document and report through official channels instead.`
    },
    {
      type: 'question',
      format: 'branching',
      question: `Riley is worried that blocking him will make things worse. What's the right call?`,
      options: [
        { text: 'Don\'t block yet - keep the channel open so you can monitor what he says and respond if needed.', correct: false },
        { text: 'Screenshot all existing evidence first, then block on every platform. Blocking doesn\'t escalate - it removes his access to you and creates a clear boundary on record.', correct: true },
        { text: 'Send one final message telling him to stop, then block.', correct: false },
        { text: 'Block immediately without documenting anything - the priority is cutting off contact.', correct: false }
      ],
      hint: `Two things need to happen: preserve what already exists, and cut off future access. Which option does both, in the right order?`,
      explanation: `Evidence first, then block — always in that order. Screenshots of messages, timestamps, and his username need to be preserved before blocking because access may be limited afterward. Blocking doesn't escalate harassment in the vast majority of cases — it removes his direct line to you and establishes a documented boundary. Sending a final message is strongly discouraged: any response signals you're reachable and can be used to claim contact was mutual.`
    },

    // ── SCENARIO 3: Breach Notification ──
    {
      type: 'scenario',
      badge: 'Scenario 3 of 3',
      title: 'You Have Rights',
      persona: 'first',
      text: `You get an email from a company you used to order textbooks from two years ago. The subject line reads: <em>"Important Security Notice Regarding Your Account."</em><br><br>
      The email says the company experienced a data breach. Your name, email address, home address, and the last four digits of your credit card were exposed. They're offering you 12 months of free credit monitoring. They say they've "fixed the issue" and apologize for the inconvenience.<br><br>
      You're not sure what any of this means for you practically, or whether you have to do anything beyond accepting the monitoring offer.`,
      highlight: `Name. Email. Home address. Last four digits of your card. That's enough to start a lot of damage.`
    },
    {
      type: 'question',
      format: 'multiple',
      question: `Under California law, what is the company legally required to have done when they discovered this breach?`,
      options: [
        { text: 'Nothing - companies have no legal obligation to notify users about breaches.', correct: false },
        { text: 'Notify users only if financial information like full credit card numbers were exposed.', correct: false },
        { text: 'Notify affected individuals in plain language explaining what data was exposed, when it happened, and what they\'re doing about it - and provide free credit monitoring if sensitive data like SSNs were involved.', correct: true },
        { text: 'Notify the government but not individual users - it\'s up to the government to inform people.', correct: false }
      ],
      hint: `Think about what California's Security Breach Act actually requires - notification, transparency, and what happens when especially sensitive data is involved.`,
      explanation: `Under California's Security Breach Act, companies must notify affected individuals when their unencrypted personal data is breached — in plain language, explaining what was exposed, when, and what's being done. If especially sensitive data (SSNs, driver's license, financial account info) was involved, they must also provide at least 12 months of free credit monitoring. This is a legal right, not a courtesy.`
    },
    {
      type: 'question',
      format: 'multiselect',
      question: `Beyond accepting the credit monitoring offer, what concrete steps should you take after receiving this breach notice? Select all that apply.`,
      options: [
        { text: 'Change your password on that site and any other accounts that used the same password.', correct: true },
        { text: 'Consider placing a credit freeze with the major credit bureaus - it\'s free and prevents new accounts being opened in your name.', correct: true },
        { text: 'Monitor your existing bank and credit card accounts for unfamiliar charges over the next several months.', correct: true },
        { text: 'Be on high alert for follow-up phishing attempts that reference your name and address - attackers use breach data to make phishing more convincing.', correct: true },
        { text: 'Do nothing beyond accepting the monitoring - the company has taken care of everything.', correct: false }
      ],
      hint: `A breach notification is the start of your response, not the end. Think about what's now exposed and what that enables attackers to do.`,
      explanation: `The company fulfilled their legal obligation — but your response is just starting. Change passwords to address credential exposure. A credit freeze (free at Equifax, Experian, and TransUnion) blocks anyone from opening new credit in your name — one of the most powerful protections against identity theft. Monitor existing accounts for fraudulent charges. Stay alert to targeted phishing: attackers buy breach data specifically to make follow-up emails more convincing. The credit monitoring offer is valuable but not sufficient on its own.`
    },
    {
      type: 'lesson',
      icon: '🏛️',
      title: 'Your Rights & Recovery Resources',
      body: `Knowing your rights changes how you respond. California gives students some of the strongest digital privacy protections in the country - and your campus has more resources than most students realize.`,
      cards: [
        {
          icon: '📜',
          title: 'California Privacy Protections & Campus Resources',
          body: `
          <div class="resource-section">
            <h4 class="lesson-point-title">California Security Breach Act</h4>
            <div class="lesson-body">Any organization that holds your personal data must notify you if that data is breached - in plain language, explaining what was exposed and what they're doing about it. If sensitive data like your SSN was involved, they owe you 12 months of free credit monitoring.</div>
          </div>

          <div class="resource-section">
            <h4 class="lesson-point-title">California Consumer Privacy Act (CCPA)</h4>
            <div class="lesson-body">You can request that any business disclose what personal data they hold on you, and in many cases demand it be deleted. This applies to companies - not just social media platforms.</div>
          </div>

          <div class="resource-section">
            <h4 class="lesson-point-title">Campus Resources - Use Them</h4>
            <ul class="lesson-list">
              <li><strong>IT Help Desk</strong> - account compromises, device malware, anything technical</li>
              <li><strong>Title IX / Student Conduct</strong> - harassment, stalking, nonconsensual image sharing involving students</li>
              <li><strong>CARE Office / Counseling</strong> - confidential support for digital incidents that have an emotional impact; you are not required to file a formal report to access support</li>
              <li><strong>Campus Safety / Police</strong> - credible threats, stalking, extortion</li>
            </ul>
          </div>

          <div class="lesson-section">
            <h4 class="lesson-point-title">Technical Recovery Checklist</h4>
            <ul class="lesson-list">
              <li>Change all affected passwords - use unique ones for each account</li>
              <li>Enable MFA on every account that offers it</li>
              <li>Restore hijacked accounts through official recovery processes</li>
              <li>Clean or reinstall compromised devices with IT help</li>
              <li>Monitor for follow-on phishing - attackers often try again after a breach</li>
            </ul>
            <div class="support-note">
              💬 Emotional recovery matters too. Stress, shame, and fear after a digital incident are normal responses. You are not at fault for being targeted.
            </div>
          </div>`
        }
      ]
    },

    // ── MINI TEST ──
    {
      type: 'minitest',
      title: `Let's see what stuck`,
      subtitle: `Module 4 · 8 questions · Need 80% to pass`,
      questions: [
        {
          format: 'multiple',
          question: `When your accounts are compromised, why should you prioritize securing your email account first?`,
          options: [
            { text: 'Email accounts store the most personal photos and files.', correct: false },
            { text: 'Email is the master key - password resets for nearly every other account get sent there, so whoever controls your email controls access to everything else.', correct: true },
            { text: 'Email providers have the best customer support and can recover your account fastest.', correct: false },
            { text: 'Your email password is usually the strongest, so fixing it fixes everything downstream.', correct: false }
          ],
          explanation: `Nearly every service sends password reset links to your email. An attacker who controls it can lock you out of every connected account, one reset at a time. Email is the single highest-priority account to secure in any compromise.`
        },
        {
          format: 'truefalse',
          question: `In California, a company that experiences a data breach is legally required to notify affected users in plain language about what data was exposed.`,
          options: [
            { text: 'True', correct: true },
            { text: 'False', correct: false }
          ],
          explanation: `True — California's Security Breach Act requires organizations to notify affected individuals when their unencrypted personal data is breached, in plain language explaining what was exposed and what's being done. If sensitive data like SSNs was involved, they must also offer at least 12 months of free credit monitoring.`
        },
        {
          format: 'multiple',
          question: `Riley is being harassed via DMs - escalating messages including "I know where you live" and a photo of her building. She hasn't been physically contacted. Can she report this now?`,
          options: [
            { text: 'No - she needs to wait until something physical happens before law enforcement can act.', correct: false },
            { text: 'Only to the platform - police don\'t handle online harassment.', correct: false },
            { text: 'Yes - the behavior already meets the legal definition of harassment and constitutes a credible threat. She can report to the platform, campus, and law enforcement simultaneously.', correct: true },
            { text: 'Only if she can prove the person\'s real identity first.', correct: false }
          ],
          explanation: `California law doesn't require physical contact before harassment can be reported. Repeated unwanted contact plus "I know where you live" and surveillance photos is a credible threat. Riley can report to the platform, Title IX or Student Conduct (if campus-affiliated), campus safety or local police, and IC3 — all at the same time. She doesn't have to choose.`
        },
        {
          format: 'multiple',
          question: `You need to preserve evidence of harassment before blocking the person. What's the most important thing to capture in your screenshots?`,
          options: [
            { text: 'Just the worst messages - the others aren\'t relevant.', correct: false },
            { text: 'The full conversation thread including dates, times, the sender\'s username, and the message content - showing context and pattern, not just isolated messages.', correct: true },
            { text: 'A photo of your screen taken with another phone - this preserves the most metadata.', correct: false },
            { text: 'Only the most recent messages - older ones are less legally useful.', correct: false }
          ],
          explanation: `Evidence needs to show pattern and context, not just isolated worst moments. Capture the sender's username, timestamps, and the full thread showing escalation. A photo of your screen with another phone loses quality and metadata. The full thread — not cherry-picked messages — is what demonstrates a pattern to investigators or campus officials.`
        },
        {
          format: 'truefalse',
          question: `Forwarding a suspicious email to yourself is the best way to preserve it as evidence.`,
          options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
          ],
          explanation: `Forwarding strips the original email headers — the metadata containing sender IP addresses, routing info, and authentication data that investigators need. Instead, screenshot the email in place (showing the full sender address and subject line), or export the raw file. Always preserve the original untouched.`
        },
        {
          format: 'multiselect',
          question: `After receiving a data breach notification, which of these steps are appropriate responses? Select all that apply.`,
          options: [
            { text: 'Change your password on that site and anywhere else you reused it.', correct: true },
            { text: 'Place a free credit freeze at the major credit bureaus to prevent new accounts being opened in your name.', correct: true },
            { text: 'Monitor existing accounts for unfamiliar transactions over the following months.', correct: true },
            { text: 'Be alert for targeted phishing that uses your breached details to appear credible.', correct: true },
            { text: 'Accept the credit monitoring offer and consider the matter fully handled.', correct: false }
          ],
          hint: `The monitoring offer is one tool, not the whole solution. Think about what's now exposed and what each exposure enables attackers to do.`,
          explanation: `All four positive steps matter: changing passwords addresses credential exposure, a credit freeze prevents new accounts being opened in your name, monitoring catches fraudulent use of existing accounts, and phishing awareness is critical because attackers buy breach data to craft more convincing scam messages. The monitoring offer covers only one slice of the risk.`
        },
        {
          format: 'multiple',
          question: `You've documented harassment and want to report it through multiple channels at once. Which combination gives you the broadest coverage?`,
          options: [
            { text: 'Platform report only - third-party services can\'t act on digital harassment.', correct: false },
            { text: 'Platform report (removes content), campus reporting if the person is affiliated, and law enforcement if there\'s a credible threat - these channels are independent and can all be used simultaneously.', correct: true },
            { text: 'Law enforcement only - platform reports are ineffective.', correct: false },
            { text: 'Wait for the harassment to stop before reporting - premature reports may not be taken seriously.', correct: false }
          ],
          explanation: `Reporting channels are independent — using more than one strengthens your case, it doesn't complicate it. Platform reporting removes the content and creates a record. Campus reporting applies if the harasser is a student or staff. Law enforcement is appropriate when there's a credible threat, stalking, or extortion. You never have to choose just one.`
        },
        {
          format: 'multiple',
          question: `What does "doxxing" mean, and why is it considered a digital incident worth reporting?`,
          options: [
            { text: 'Doxxing is hacking into someone\'s device - it\'s reportable because it\'s a federal crime.', correct: false },
            { text: 'Doxxing is publicly revealing someone\'s private personal information to expose or harm them - it\'s reportable because it can enable real-world harm and is illegal in California.', correct: true },
            { text: 'Doxxing is making false statements about someone online - it\'s a form of defamation.', correct: false },
            { text: 'Doxxing is blocking someone and reporting them to a platform - it\'s only reportable if done falsely.', correct: false }
          ],
          explanation: `Doxxing is publicly revealing someone's private identifying information — home address, phone, workplace, real name — typically to invite harassment from others. Once your address is public, anyone wanting to intimidate or harm you physically knows where to find you. In California, doxxing combined with threats is a criminal act. Document everything and report to campus safety and law enforcement, not just the platform.`
        }
      ]
    }
  ]
};
