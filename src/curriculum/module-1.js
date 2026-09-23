const MODULE_1 = {
  "title": "Scams, Social Engineering & Digital Exploitation",
  "short": "Scams & Social Engineering",
  "time": "~15 min",
  "topics": [
    "Phishing & smishing",
    "Fake job scams",
    "Romance & sextortion",
    "Deepfake scams"
  ],
  steps: [
    // INTRO LESSON
    {
      type: 'lesson',
      title: 'What is Cybersecurity?',
      icon: '🔐',
      body: `Cybersecurity is the practice of protecting computers, networks, and data from unauthorized access or harm. But here's the thing most people miss: <strong>attackers don't usually hack systems - they hack people.</strong><br><br>
      Studies show that around 99% of cyberattacks rely on some form of human interaction or error to succeed. Sending a convincing scam message is far easier than breaking through a well-secured system. That's why understanding the human side of security matters just as much as having a strong password.`,
      cards: [
        {
          icon: '⚡',
          title: 'Threat vs. Vulnerability vs. Attack',
          body: `These three words get used interchangeably, but they mean different things:<br><br>
          <strong>Threat:</strong> A potential danger - like someone trying to break into your email.<br>
          <strong>Vulnerability:</strong> A weakness they can exploit - like a weak password or leaving your laptop unlocked.<br>
          <strong>Attack:</strong> When the threat acts on the vulnerability - the actual unauthorized access or harm.<br><br>
          In this module, we focus mostly on <em>social engineering attacks</em> - ones that target your judgment, not your software.`
        }
      ]
    },

    // SCENARIO 1: Fake Job Scam
    {
      type: 'scenario',
      badge: 'Scenario 1 of 4',
      title: 'The Dream Job Email',
      persona: 'third',
      text: `Maya is a sophomore looking for a summer internship. One afternoon, she gets an email that looks like it's from her University's Career Center with the subject line: <em>"Paid Remote Internship - $25/hr, Flexible Hours, Apply Now."</em>
      <br><br>The email mentions her by name, uses the University's logo, and says she's been pre-selected based on her GPA. All she has to do is reply with her interest and they'll send her the onboarding paperwork.
      <br><br>Maya notices the sender's email is <strong>careers@university-jobs-support.com</strong> instead of her school's usual .edu address - but the rest of the email looks totally legit.`,
      highlight: `"Hi Maya - Congratulations! You've been pre-selected for a paid remote position. Reply now - only 3 spots remain."`
    },
    {
      type: 'question',
      format: 'branching',
      question: `Maya is excited but that email address is nagging at her. What should she do?`,
      options: [
        { text: 'Reply to the email - it looks legit enough and the opportunity is too good to pass up.', correct: false },
        { text: 'Go to her university\'s official website and look up the Career Center\'s real contact info to verify.', correct: true },
        { text: 'Forward the email to a friend to see what they think.', correct: false },
        { text: 'Search for the company\'s account on on Instagram or Twitter.', correct: false }
      ],
      hint: `When an email urges you to act fast and something feels slightly off, that's a signal to slow down - not speed up. Where should Maya go to find the Career Center's real address?`,
      explanation: `<strong>Out-of-band verification</strong> means confirming through a channel the sender can't control. Going to the university's official website to find the real Career Center contact cuts the scammer out entirely. Googling the company or asking a friend won't tell her whether <em>this specific email</em> is real.`
    },

    {
      type: 'lesson',
      icon: '🔄',
      title: 'The Social Engineering Attack Cycle',
      body: `Every scam — phishing emails, romance scams, fake job offers — follows the same four-phase pattern. Knowing the cycle lets you spot which stage you're in and interrupt it before real damage is done.`,
      cards: [
        {
          icon: '🔄',
          title: 'The Social Engineering Attack Cycle',
          body: `Every social engineering attack - whether it's a phishing email, a romance scam, or a fake job offer - follows the same basic pattern:<br><br>
          <strong>1. Research</strong> - the attacker gathers information on the target first. They check your LinkedIn, social media, university website, or data breach records to build a believable approach. This is why personalized emails feel credible.<br><br>
          <strong>2. Hook</strong> - they make contact and build initial trust. A convincing email, a friend request, a job offer, a "wrong number" text. The hook is designed to get your attention without triggering suspicion.<br><br>
          <strong>3. Play</strong> - the actual scam executes. Now they ask for what they want: credentials, money, a wire transfer, personal information. This is where the psychological levers get applied hardest.<br><br>
          <strong>4. Exit</strong> - once they have what they came for, they disappear. Fake profiles vanish, emails stop, accounts close. If the play failed, they exit quickly and move to the next target.<br><br>
          Recognizing which phase you're in gives you a chance to interrupt it - especially during the Hook, before the Play begins.`
        }
      ]
    },

    {
      type: 'lesson',
      icon: '🧠',
      title: 'The Five Psychological Levers Scammers Pull',
      body: `Understanding <em>why</em> scams work is just as important as spotting them. Attackers don't rely on victims being careless — they deliberately exploit normal human psychology.`,
      cards: [
        {
          icon: '🧠',
          title: 'The Five Psychological Levers Scammers Pull',
          body: `Social engineering works not because people are stupid - but because attackers deliberately exploit normal human tendencies. These five triggers appear across almost every scam:<br><br>
          <strong>Authority</strong> - impersonating a boss, bank, IT department, or government agency. We're conditioned to comply with authority figures.<br><br>
          <strong>Urgency</strong> - "Act now or your account is closed!" Rushing you cuts off rational thinking and prevents you from consulting anyone.<br><br>
          <strong>Fear</strong> - threatening arrest, account loss, embarrassment, or harm to someone you love. Panic is the goal.<br><br>
          <strong>Scarcity</strong> - "Only 3 spots left." Fear of missing out (FOMO) pushes snap decisions.<br><br>
          <strong>Liking (Affinity)</strong> - building rapport, flattery, or pretending to share interests so you lower your guard. Romance scammers spend weeks on this step alone.<br><br>
          Scammers rarely use just one - they stack them. An email that's "from your boss" (authority), arriving on a Friday afternoon (urgency), asking you to buy gift cards "before the client finds out" (fear + secrecy) is using three at once.`
        }
      ]
    },

    {
      type: 'lesson',
      icon: '🎣',
      title: 'The Anatomy of a Phishing Email',
      body: `Phishing is when fraudsters send emails posing as trusted sources - banks, universities, companies - to get you to click, share info, or send money. Here's what to look for:`,
      cards: [
        {
          icon: '🔍',
          title: 'How to Spot a Phishing Attempt',
          body: `
          <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px">
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Check the actual email domain</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">Not just the display name. <em>careers@university-jobs-support.com</em> is not the same as <em>careers@university.edu</em> - anyone can register a lookalike domain.</div>
            </div>
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Urgency + scarcity</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">"Only 3 spots remain!" is a pressure tactic. It's designed to stop you from thinking clearly or consulting anyone else before acting.</div>
            </div>
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Unsolicited personalization</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">Using your name or GPA doesn't mean the email is real - that data is often publicly available (e.g. on LinkedIn) for scammers to harvest.</div>
            </div>
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Know what's public about you</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">Before assuming an email is legitimate because it mentions personal details, ask yourself: could a stranger have found this on my social media or LinkedIn profile?</div>
            </div>
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Out-of-band verification</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">Always confirm via an official channel you found yourself - not a link, number, or address provided in the suspicious email.</div>
            </div>
          </div>`
        },
        {
          icon: '🎯',
          title: 'Regular Phishing vs. Spear Phishing',
          body: `Not all phishing is equally dangerous - the <em>targeted</em> kind is the hardest to catch.<br><br>
          <strong>Regular phishing</strong> is a mass blast: millions of identical, generic emails ("Dear Customer...") sent out in the hope that a small fraction of people click. Because it's generic, it usually triggers the "this feels mass-produced" instinct that helps you spot it.<br><br>
          <strong>Spear phishing</strong> targets <em>you</em> specifically. The attacker researches you first - your name, university, major, a recent post, your advisor or employer - and crafts a message that feels personal and credible. An email referencing your actual course or department is far harder to dismiss as a scam.<br><br>
          <strong>Why it's more dangerous:</strong> spear phishing defeats the exact instinct that protects you from generic scams. It looks like it came from someone who knows you, so you're more likely to trust it and act. This is the "Research" phase of the attack cycle in action - the more an attacker knows about you, the more convincing the hook. Personalization is never proof an email is genuine; always verify out-of-band.`
        }
      ]
    },

    // DOMAIN QUIZ
    {
      type: 'interactive',
      subtype: 'domain-quiz',
      items: [
    {
      address:  'no-reply@amazon.com',
      verdict:  'real',
      blurb:    'This is Amazon\'s legitimate notification address. The domain is exactly amazon.com - no extra words, no hyphens, no lookalike characters. "no-reply" as a prefix is standard for automated emails from large companies.',
      flags:    []
    },
    {
      address:  'security-alert@paypal-secure-login.com',
      verdict:  'fake',
      blurb:    'PayPal\'s real domain is paypal.com. This address adds "secure-login" after it to look trustworthy - but "paypal-secure-login.com" is a completely separate domain that anyone can register. The word "secure" in a domain name is a common scammer trick.',
      flags:    ['paypal-secure-login.com is not paypal.com', '"secure" added to sound trustworthy']
    },
    {
      address:  'support@apple.com',
      verdict:  'real',
      blurb:    'Apple does send support emails from apple.com. The domain is clean and exact. Always check that it\'s apple.com and not something like apple-support.com, apples.com, or app1e.com - all of which have been used in real phishing campaigns.',
      flags:    []
    },
    {
      address:  'noreply@university-student-portal.net',
      verdict:  'fake',
      blurb:    'Real university emails almost always use the school\'s official .edu domain (e.g. usc.edu, ucla.edu). A generic .net domain with "university-student-portal" is a red flag - it\'s designed to look institutional without being tied to any real school. The .net TLD for a university is also unusual.',
      flags:    ['Generic .net instead of a real .edu domain', 'No actual university name - could target any student']
    },
    {
      address:  'billing@netflix-help-center.com',
      verdict:  'fake',
      blurb:    'Netflix sends billing emails from netflix.com - not netflix-help-center.com. "Help center" appended to a brand name is a classic lookalike domain pattern. If you ever receive a billing email, go directly to netflix.com in your browser rather than clicking anything in the email.',
      flags:    ['netflix-help-center.com ≠ netflix.com', 'Brand name + "help center" is a known lookalike pattern']
    },
    {
      address:  'careers@linkedin.com',
      verdict:  'real',
      blurb:    'LinkedIn legitimately sends job alert and recruiter emails from linkedin.com. The domain is exact. Be aware that scammers do spoof LinkedIn heavily - always check the full domain, not just the display name which might say "LinkedIn Jobs."',
      flags:    []
    },
    {
      address:  'alert@wellsfarg0.com',
      verdict:  'fake',
      blurb:    'Look closely - that\'s a zero (0), not the letter O. "wellsfarg0.com" is a homograph attack: replacing a letter with a visually identical character to register a lookalike domain. This is one of the hardest fakes to catch at a glance, which is exactly why attackers use it. The real domain is wellsfargo.com.',
      flags:    ['Zero (0) replacing the letter O in "fargo"', 'Homograph attack - visually identical to the real domain']
    },
    {
      address:  'no-reply@accounts.google.com',
      verdict:  'real',
      blurb:    'This one looks legitimate because accounts.google.com is a subdomain of google.com, which is the registrable domain. When checking a URL, look at the domain immediately before the public suffix—for example, google.com in accounts.google.com. Be cautious of lookalike URLs such as google.com.accounts-verify.net, where the actual domain is accounts-verify.net, not google.com.',
      flags:    []
    }
  ]
    },

    // SCENARIO 2: Payment App Scam
    {
      type: 'scenario',
      badge: 'Scenario 2 of 4',
      title: 'The Accidental Venmo',
      persona: 'first',
      text: `You're eating lunch when your phone buzzes - someone named "Alex R." just sent you $250 on Venmo with the memo "rent - oops wrong person."
      <br><br>A few minutes later you get a message from the same account: <em>"Hey! So embarrassed - I meant to send that to my roommate. My rent is due tonight and if I don't pay it my landlord will lock me out 😭. Can you send it back? I can send you $20 for the trouble."</em>
      <br><br>The $250 is already showing in your Venmo balance. You feel bad for them - it seems like an honest mistake.`,

    },
    {
      type: 'question',
      format: 'multiple',
      question: `What is most likely happening here?`,
      options: [
        { text: 'An honest mistake - people accidentally send money to wrong numbers all the time.', correct: false },
        { text: 'A scam where the initial $250 was sent from a stolen card or hacked account, and will be reversed by the platform later - leaving you out $250.', correct: true },
        { text: 'A test by Venmo to see if users act honestly.', correct: false },
        { text: 'A phishing attempt to steal your Venmo login.', correct: false }
      ],
      hint: `Think about what happens to your balance if the original $250 payment gets reversed by the bank - and what would happen to any money you sent back in the meantime.`,
      explanation: `This is the <strong>accidental payment scam</strong>. The $250 was likely sent from a stolen card or hacked account — once the real owner disputes it, the platform reverses the transfer and the money disappears from your balance. But any money <em>you</em> already sent back is gone for good. Never send money back to a stranger through payment apps like Venmo, Zelle, or Cash App. Instead, contact the app's support team and let them handle it.`
    },
    {
      type: 'question',
      format: 'multiselect',
      question: `Which of these were red flags in this scenario? Select all that apply.`,
      options: [
        { text: 'The sender was a stranger you\'ve never interacted with before.', correct: true },
        { text: 'There was extreme urgency - "my landlord is locking me out tonight."', correct: true },
        { text: 'They offered you $20 extra to send it back.', correct: true },
        { text: 'The Venmo balance showed $250 immediately.', correct: false },
        { text: 'The request came with a sad emoji.', correct: false }
      ],
      hint: `Think about the psychological levers we mentioned: urgency, unexpected gifts, strangers. Which of these apply?`,
      explanation: `Strangers sending unsolicited money, manufactured urgency, and a small "bonus" are all classic manipulation tactics. The balance showing immediately is normal for Venmo — it doesn't confirm the payment is legitimate. The emoji is emotional pressure, not a red flag on its own.`
    },

    // ROMANCE SCAM DEFINITION LESSON
    {
      type: 'lesson',
      icon: '💔',
      title: 'What Is a Romance Scam?',
      body: `A <strong>romance scam</strong> is when an attacker builds a fake emotional relationship with someone - often over weeks or months - specifically to exploit their trust for money or personal information. They're among the most financially damaging scams the FTC tracks, precisely because the victim isn't being tricked by a suspicious link - they're being manipulated by what feels like a real relationship.`,
      cards: [
        {
          icon: '🎭',
          title: 'How Romance Scams Work',
          body: `Romance scams follow the same attack cycle as other social engineering - but the Hook phase is stretched out deliberately, sometimes for months:<br><br>
          <strong>The setup:</strong> The scammer creates an attractive, credible profile on a dating app, Instagram, or Facebook. Photos are usually stolen from real people (military officers, doctors, and models are common). They make contact and are immediately warm, attentive, and interested in you specifically.<br><br>
          <strong>The build:</strong> They message constantly, say the right things, and create a sense of emotional intimacy quickly. They'll often claim to be abroad - working on an oil rig, deployed in the military, doing charity work in a remote country - which explains why they can't meet or video call. Every excuse is pre-planned.<br><br>
          <strong>The ask:</strong> After trust is established, a crisis appears. A medical emergency. A business deal gone wrong. A plane ticket to finally visit you. They need money - urgently, via wire transfer, gift cards, or cryptocurrency (all chosen because they're hard to reverse or trace).<br><br>
          <strong>Red flags to know before the next scenario:</strong>
          <ul class="lesson-list" style="margin-top:8px">
            <li>Consistently avoids video calls - camera is always "broken"</li>
            <li>Professes strong feelings unusually quickly</li>
            <li>Always working overseas in a compelling profession</li>
            <li>Financial asks via wire transfer, gift cards, or crypto - never traditional methods</li>
            <li>Every crisis has a convenient deadline</li>
          </ul>`
        }
      ]
    },

    // SCENARIO 3: Romance Scam
    {
      type: 'scenario',
      badge: 'Scenario 3 of 4',
      title: 'The Perfect Match',
      persona: 'third',
      text: `Jordan matched with someone on a dating app three weeks ago. The person - who says they're a surgeon working abroad for six months - messages constantly, always says the right things, and has become someone Jordan genuinely looks forward to talking to.
      <br><br>They've never video called, despite Jordan asking twice. The surgeon says their camera is broken and they're embarrassed. This week, something came up: a problem with a patient's surgery bill that could end their career if not resolved before Monday. They ask Jordan to send $600 via wire transfer - just a loan until they're back.`,
      highlight: `"I've never connected with anyone like this. I hate asking, but I trust you more than anyone right now."`
    },
    {
      type: 'question',
      format: 'multiselect',
      question: `Which of these are red flags that this could be a romance scam? Select all that apply.`,
      options: [
        { text: 'They consistently avoid video calls with a convenient excuse.', correct: true },
        { text: 'They professed deep feelings very quickly.', correct: true },
        { text: 'They\'re asking for money via wire transfer rather than a traceable method.', correct: true },
        { text: 'They use an "overseas professional" cover story (surgeon, military, oil rig) - a known pattern that explains why they can\'t meet or video call.', correct: true },
        { text: 'They message frequently and consistently.', correct: false },
        { text: 'The financial crisis conveniently has a hard deadline.', correct: true }
      ],
      hint: `Think about what you just read in the romance scam lesson - quick emotional investment, avoiding verification, a professional cover story that explains absence, and the money ask. Which of these fit those patterns? Note: "messages frequently" is not a red flag on its own.`,
      explanation: `All five marked options are textbook romance scam signals: avoiding video calls, rushing emotional intimacy, using untraceable payment methods, an overseas-professional cover story (surgeon/military/charity worker abroad is the most common pattern), and a deadline-driven crisis. Frequent messaging alone isn't suspicious — the manipulation lies in the combination of the other factors.`
    },

    // SCENARIO 4: Deepfake Voice Scam
    {
      type: 'scenario',
      badge: 'Scenario 4 of 4',
      title: 'Mom\'s Voice',
      persona: 'first',
      text: `You're in class when you step out for a call. It's your mom's number - but the voice is panicked, different somehow. She says she's been in a minor car accident and her phone is nearly dead. A man takes over the call and says there's a legal fee to avoid her being detained overnight: $800 via Zelle or gift cards, right now.
      <br><br>The voice sounded like your mom. The number was hers. You're scared.`,
      highlight: `"Please just pay it - I don't have time to explain everything right now. Just trust me."`
    },
    {
      type: 'question',
      format: 'branching',
      question: `What do you do right now?`,
      options: [
        { text: 'Pay the $800 via Zelle immediately - it sounds like her and you don\'t want to risk it.', correct: false },
        { text: 'Hang up, then immediately call your mom back on her number from your contacts to verify she\'s safe.', correct: true },
        { text: 'Ask the man for more details about which police station she\'s at.', correct: false },
        { text: 'Call your dad to ask what to do first.', correct: false }
      ],
      hint: `The fastest way to verify this is to hang up and call the person back yourself - using a number you already have, not one the caller gives you. What's your mom's number in your contacts?`,
      explanation: `This is a <strong>deepfake voice + vishing scam</strong>. AI can clone a voice from just a few seconds of audio. Hanging up and calling back from your contacts is the only way to verify — no real emergency gets worse from a 30-second check. Gift cards and Zelle are irreversible; authorities never request them.`
    },
    {
      type: 'lesson',
      icon: '🤖',
      title: 'Deepfakes & Voice Cloning',
      body: `AI can now clone a voice convincingly from just a few seconds of audio - a voicemail, a TikTok, a YouTube video. Scammers use this to impersonate family members in fake emergencies.`,
      cards: [
        {
          icon: '🧠',
          title: 'Your Defense Against Deepfakes',
          body: `
          <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px">
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Hang up, call back yourself</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">Use the number in your contacts - never a number the caller provides. This one step defeats the entire attack.</div>
            </div>
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Set a family code word</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">A word only your family knows to use in real emergencies. If the "emergency" caller doesn't know it, that tells you everything.</div>
            </div>
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Real emergencies don't require gift cards or Zelle</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">Any payment request in an "emergency" - especially via untraceable methods - is a scam signal, full stop.</div>
            </div>
            <div>
              <div style="font-weight:600;color:var(--navy);font-size:14.5px;margin-bottom:3px">Urgency is a weapon</div>
              <div style="font-size:13.5px;color:var(--slate);line-height:1.6">Scammers rush you so you don't think. Slowing down costs you 60 seconds. Falling for it can cost thousands.</div>
            </div>
          </div>`
        },
        {
          icon: '🎬',
          title: 'See It For Yourself (Optional)',
          body: `This clip is from <strong>2018</strong> — over 8 years ago. At the time, it was considered a landmark demonstration of how convincing AI-generated video had become. The tools that produced it took a team of researchers months to build. Today, comparable deepfakes can be generated in minutes on consumer hardware. Watch the first 30 seconds and ask yourself: if you didn't know this was fabricated, would you know it's a scam?`,
          video: {
            watchUrl: 'https://www.youtube.com/watch?v=cQ54GDm1eL0',
            thumbnail: 'https://img.youtube.com/vi/cQ54GDm1eL0/hqdefault.jpg',
            title: 'Jordan Peele Obama deepfake PSA',
            caption: 'BuzzFeed & Jordan Peele, 2018 — made specifically as a public warning about deepfakes. This is what 8-year-old technology looked like.'
          }
        }
      ]
    },

    // MINI TEST - Module 1
    {
      type: 'minitest',
      title: `Let's see what stuck`,
      subtitle: `Module 1 · 8 questions · Need 80% to pass`,
      questions: [
        {
          format: 'multiple',
          question: `What is "out-of-band verification"?`,
          options: [
            { text: 'Replying directly to a suspicious email to ask if it\'s real.', correct: false },
            { text: 'Looking up a word in a dictionary to verify a claim.', correct: false },
            { text: 'Confirming a request using a different channel from the one the request came in.', correct: true },
            { text: 'Checking a website\'s SSL certificate padlock icon.', correct: false }
          ],
          explanation: `Out-of-band verification means using a completely separate channel — one the attacker can't control. Got a suspicious email? Verify by calling the sender's known number or visiting their official website directly, not by replying.`
        },
        {
          format: 'truefalse',
          question: `A phone caller who sounds exactly like your mom is definitely your mom.`,
          options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
          ],
          explanation: `AI voice cloning can replicate anyone's voice from just a few seconds of audio — a voicemail, a video, a social media clip. Always hang up and call back on a number you already have stored.`
        },
        {
          format: 'multiple',
          question: `You get an email saying your bank account has been locked. The display name says "Chase Bank" but the sender address is support@chase-secure-alerts.net. What's the right move?`,
          options: [
            { text: 'Click the link in the email to log in and fix it quickly before your account is suspended.', correct: false },
            { text: 'Ignore it entirely - banks never send emails.', correct: false },
            { text: 'Open a new browser tab, go to chase.com directly, and log in from there to check if there\'s actually a problem.', correct: true },
            { text: 'Reply to the email asking if it\'s legitimate.', correct: false }
          ],
          explanation: `The sender address is the tell — chase.com and chase-secure-alerts.net are completely different domains. Anyone can register a lookalike. The safe move is always to navigate to the real site yourself rather than using any link, number, or address in the email.`
        },
        {
          format: 'multiselect',
          question: `Which of the following are psychological levers that scammers commonly use? Select all that apply.`,
          options: [
            { text: 'Authority - pretending to be a boss, bank, IT department, or government agency', correct: true },
            { text: 'Urgency - demanding immediate action before you have time to think', correct: true },
            { text: 'Unexpected "generosity" - offering money or prizes with no obvious catch', correct: false },
            { text: 'Scarcity - "only a few spots left," creating fear of missing out', correct: true },
            { text: 'Fear - threatening consequences like arrest, account closure, or embarrassment', correct: true },
            { text: 'Liking (affinity) - building rapport and trust so you lower your guard', correct: true }
          ],
          hint: `Five of the six are the core levers covered in the lesson. The "generosity" option is a nuanced one - read it carefully.`,
          explanation: `The five core levers are Authority, Urgency, Scarcity, Fear, and Liking - these are the established social engineering triggers. "Unexpected generosity" (like an accidental Venmo payment or a prize you didn't enter) can absolutely be part of a scam setup, but it's a delivery mechanism rather than a psychological trigger on its own - the actual lever being pulled is usually Scarcity ("act now before the offer expires") or Liking ("I trust you"). That's why it isn't listed as one of the five.`
        },
        {
          format: 'truefalse',
          question: `If a suspicious email uses your real name and your university's logo, it must be from a legitimate source.`,
          options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
          ],
          explanation: `Scammers harvest personal details from social media, data breaches, and public records to make messages feel personal. Anyone can download a university logo. Personalization is a tactic, not proof of legitimacy.`
        },
        {
          format: 'multiple',
          question: `Someone sends you $300 on Venmo by "mistake" and asks you to send it back. What's the safest move?`,
          options: [
            { text: 'Send it back immediately - it\'s the honest thing to do.', correct: false },
            { text: 'Send back only $150 to be safe.', correct: false },
            { text: 'Contact Venmo support to handle the reversal - do not send money directly to the stranger.', correct: true },
            { text: 'Wait a week and see if your balance changes before doing anything.', correct: false }
          ],
          explanation: `The "accidental" payment is almost always sent from a stolen card or hacked account. The platform will eventually reverse it - but any money you send back to the stranger goes directly to the scammer and is gone. Always route these through the app's support team, never send real money back.`
        },
        {
          format: 'multiple',
          question: `You get a text from an unknown number: "Hi! This is Dr. Patel from the Financial Aid office. We need to verify your SSN to release your spring disbursement - can you reply with it here?" What do you do?`,
          options: [
            { text: 'Reply with your SSN - it\'s from a university official and your aid is at stake.', correct: false },
            { text: 'Ask them to email you instead before responding.', correct: false },
            { text: 'Don\'t reply. Look up the Financial Aid office number on your university\'s website and call them directly to ask if this is real.', correct: true },
            { text: 'Reply asking for proof that they work there before sharing anything.', correct: false }
          ],
          explanation: `Don't reply to the message at all — even pushing back keeps you in the scammer's loop. Your Social Security Number is one of the most sensitive pieces of information you own; it can be used to open credit cards, take out loans, or steal your identity. Legitimate offices won't ask for it over text, and any real request would come through official, verified channels. Find the Financial Aid office number on your university's website yourself and call to confirm whether this is real.`
        },
        {
          format: 'multiple',
          question: `What is the correct order of the Social Engineering Attack Cycle?`,
          options: [
            { text: 'Hook → Research → Play → Exit', correct: false },
            { text: 'Play → Research → Hook → Exit', correct: false },
            { text: 'Research → Play → Hook → Exit', correct: false },
            { text: 'Research → Hook → Play → Exit', correct: true }
          ],
          explanation: `Research (gathering intel on the target) comes first. Then Hook (making contact and building trust). Then Play (executing the actual scam). Then Exit (disappearing before the victim realizes). The attacker does their homework before ever reaching out.`
        }
      ]
    }
  ]
};
