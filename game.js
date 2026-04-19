// Player State: These are the starting values for the user. 
let player = {
    money: 2000, 
    debt: 6000, 
    career: 1, 
    stress: 10,
    year: 1
};

// Sequence of Life Events
// Each option and event has its own ID, description and array of choices. 
// Each choice has some of math associated with it, it could be adding money, reducing stress, increasing debt...
const lifeEvents = [
    {
        id: "graduation", 
        title: "👨‍🎓Graduation Day!👩‍🎓", 
        description: "You Did It! Now you have a degrees, a pile of student loans, and a job offer from Lockton. How will you be celebrating tonight?", 
        choices: [
            {
                text: "Fancy dinner with friends (-$150, -10% Stress)", 
                effect: {money: -150, stress: -10},
                nextEvent: "first_apartment"
            }, 
            {
                text: "Lock In and Budget (+0, +5% Stress)", 
                effect: {money: 0, stress: 5}, 
                nextEvent: "first_apartment"
            }
        ]
    },
    {
        id: "first_apartment", 
        title: "🏘️ House Hunting",
        description: "You now need to to find a house near the office. What's your next move?",
        choices: [
            {
                text: "Luxury Downtown Loft (-$1500, -10% Stress)", 
                effect: {money: -1500, stress: -10},
                nextEvent: "surprise_trip"
            }, 
            {
                text: "Modest Suburd Studio (-$800, +5% Stress)", 
                effect: {money: -800, stress: -10},
                nextEvent: "surprise_trip"
            }
        ]
    },
    {
        id: "surprise_trip", 
        title: "🚨Emergency Client Pitch!✈️", 
        description: "Your boss rushes to your desk. 'We need you in Chicago tomorrow to pitch a huge client. Book a flight and hotel ASAP!' You've never traveled for corporate before!",
        choices: [
            {
                text: "Panic and book on a random travel site (+20% Stress)", 
                effect: {stress: 20},
                nextEvent: "travel_disaster"
            }, 
            {
                text: "Open the Lockton Travel Companion App (-10% Stress)", 
                effect: {stress: -10}, 
                nextEvent: "companion_booking"
            }
        ]
    },
    {
        id: "companion_booking", 
        title: "Smooth Sailing!⛵",
        description: "The Lockton Travel Companion instantly knows your destination. It highlights 3 flights that are 'In Policy' and pre-approves a hotel near the client. No setbacks, no guessing!", 
        choices: [
            {
                text: "Book the recommended itinerary (+1 Career Lvl)", 
                effect: {career: 1, stress: -5},
                nextEvent: "the_pitch"
            }
        ]
    },
    {
        id: "travel_disaster", 
        title: "❌Flight Canceled❌!", 
        description: "Oh no! A storm canceled your unapproved flight. Since you didn't use the company platform, HR can't track you, and you have to pay a $300 rebooking fee out of your own pocket to make the meeting!",
        choices: [
            {
                text: "Pay the fee and rush to Chicago (-$300, +30% Stress)", 
                effect: {money: -300, stress: 30},
                nextEvent: "the_pitch"
            }
        ]
    },
    {
        id: "the_pitch", 
        title: "🤝The Big Meeting", 
        description: "You made it to Chicago! Time to focus on the client and show them what you've got.",
        choices: [
            {
                text: "Panic and buy a $200 designer shirt nearby (-$200, +15% Stress)",
                effect: { money: -200, stress: 15},
                nextEvent: "client_dinner"
            },
            {
                text: "Ask Travel Companion for an emergency fix (-5% Stress)",
                effect: { stress: -5},
                nextEvent: "companion_clothes"
            }    
        ]
    }, 
    {
        id: "companion_clothes",
        title: "💼Quick Fix & Policy Check",
        description: "The Companion app maps the nearest affordable cloathing store, reminds you of Lockton's $50 emergency incident budgest, and auto-generates a draft expense report. No sweat!",
        choices: [
            {
                text: "Buy a $40 shirt and expense it (+0, +1 Career Lvl)", 
                effect: {money: 0, career: 1, stress: -10},
                nextEvent: "client_dinner"
            }
        ]
    },
    {
        id: "client_dinner",
        title: "🍽️Post-Pitch Meal😋",
        description: "You nailed the pitch! Now you're starving. You have a $60 meal budget for dinner. ",
        choices: [
            {
                text: "Use Companion to find top-rated food under $60 (-10% Stress)",
                effect: {stress: -10, money: 0},
                nextEvent: "heading_home"
            },
            {
                text: "Celebrate at a 5-star steakhouse and pay the difference (-$150, -20% Stress)",
                effect: { money: -150, stress: -20},
                nextEvent: "heading_home"
            }
        ]
    },
    {
        id: "heading_home",
        title: "⌛Airport Delay!⌛",
        description: "You arrive at the airport to head home, but your flight is delayed by 2.5 hours due to weather. You're exhausted!",
        choices: [
            {
                text: "Wait miserably at the crowded gate (+25% Stress)",
                effect: { stress: 25},
                nextEvent: "back_to_office"
            },
            {
                text: "Check Companion for solutions (-15% Stress)",
                effect: { stress: -15},
                nextEvent: "companion_rebook"
            }
        ]
    },
    {
        id: "companion_rebook",
        title: "✈️Auto-Rebook Activated✅",
        description: "Since the delay is over an hour, the Companion auto-prompts a 1-tap rebooking on an earlier partner flight! It even points you to a nearby lounge to relax!",
        choices: [
            {
                text: "Tap 'Rebook' and relax in the lounge (+1 Career Lvl)",
                effect: {career: 1, stress: -15},
                nextEvent: "back_to_office"
            }
        ]
    },
    {
        id: "back_to_office",
        title: "🏢Back to Reality🥹",
        description: "You are back home and at the office. The travel is over, but reality still continues. A letter arrives in the mail...",
        choices: [
            {
                text: "Review my budget options (+0)",
                effect: {money: 0},
                nextEvent: "first_payday"
            }
        ]
    },
    {
        id: "first_payday",
        title: "💵Payday Decisions",
        description: "After rent and groceries, you have $1000 left over this month. How do you want to allocate it?",
        choices: [
            {
                text: "Agressive Debt Payoff: Put $800 towards loans, keep $200 (-$800, Debt: -$1000, +5%Stress)",
                effect: {money: -800, debt: -1000, stress: 5},
                nextEvent: "six_months_later"
            },
            {
                text: "Treat Yourself: Spend $800 on fun, pay minimum $200 on debt (-$1000, Debt -$200, -15% Stress)",
                effect: { money: -1000, debt: -200, stress: -15},
                nextEvent: "six_months_later"
            },
            {
                text: "🤔I'm stuck! Help me decide!💭",
                effect: { money: 0},
                nextEvent: "financial_help"
            }
        ]
    },
    {
        id: "financial_help",
        title: "💡Lockton Financial Wellness Coach💡",
        description: "You open your company's financial wellness portal. A quick video explains the '50/30/20 Rule': 50% for Needs, 30% for Wants, and 20% for Savings/Debt. For your remaining $1000, a balanced approach might be best!",
        choices: [
            {
                text: "Take the Balanced Approach: $500 Debt, $500 Savings/Fun (-$500, Debt -$600, -5% Stress)",
                effect: { money: -500, debt: -600, stress: -5 },
                nextEvent: "six_months_later"
            },
            {
                text: "Actually, I want to go back and choose myself.",
                effect: { money: 0 },
                nextEvent: "first_payday"
            }
        ]
    },
    {
        id: "six_months_later",
        title: "⏩Fast-Forward: 6 Months Later...",
        description: "Half a year passes by. Let's see how your choices have compounded...",
        choices: [
            {
                text: "See what happens next...",
                effect: { money: 0},
                nextEvent: "RANDOM_EVENT"
            }
        ]
    },
    {
        id: "curveball_car",
        title: "😔Flat Tire!",
        description: "You hit a massive pothole on the way to work. You need a new tire, and an Uber to get to the office on time. ",
        choices: [
            {
                text: "Dip into your savings (-$250, +15% Stress)",
                effect: { money: -250, stress: 15 },
                nextEvent: "career_milestone_1"
            }
        ]
    },
    {
        id: "curveball_bonus",
        title: "🥳Spot Bonus!🥂",
        description: "Your boss noticed how well you handled that Chicago trip using the Travel COmpanion app. You got a $500 spot bonus!",
        choices: [
            {
                text: "Awesome! Put it in the bank (+$500, -10% Stress)", 
                effect: { money: 500, stress: -10},
                nextEvent: "career_milestone_1"
            }
        ]
    },
    {
        id: "curveball_health",
        title: "😷Urgent Care Visit🤒",
        description: "You woke up with a terrible flu and had to visit urgent care. Thankfully, Lockton's insurance covers most of it, but there's still a copay. ",
        choices: [
            {
                text: "Pay the copay (-$50, +10% Stress)",
                effect: {money: -50, stress: 10 },
                nextEvent: "career_milestone_1"
            }
        ]
    },
    // Milestone
    {
        id: "career_milestone_1",
        title: "📜Annual Performance Review",
        description: "It's been a whole year! You're sitting down with your manager. Based on your stress levels and performance, this could go a few ways. ",
        choices: [
            {
                text: "Ask for a promotion to Level 2 (+20% Stress)",
                effect: { stress: 20 },
                nextEvent: "review_results"
            },
            {
                text: "Ask to maintain your current role to focus on work-life balance (-15% Stress)",
                effect: { stress: -15 },
                nextEvent: "review_results"
            }
        ]
    },
    {
        id: "review_results",
        title: "⛵The Verdict",
        description: "Your manager reviews your file. Thanks to your smart use of company tools like the Travel Companion, your efficiency is up!",
        choices: [
            {
                text: "Awesome! Let's see how my finances look...",
                effect: { money: 1000 },
                nextEvent: "YEAR_END_CHECK"
            }
        ]
    },
    // The Ending
    {
        id: "victory_ending",
        title: "🌞Financial Freedom!",
        description: "Congratulations! You paid off your student loans, built a solid savings net, and leveled your career! You've mastered corporate travel and personal finance. The world is yours!",
        choices: [
            {
                text: "Play Again",
                effect: { money: 0},
                nextEvent: "graduation"
            }
        ]
    },
    {
        id: "time_up_ending",
        title: "💪Keep Grinding!", 
        description: "Six years have passed! You've learned a lot, but you are still working on paying off that debt and building your savings. The best way to predict your future is to create it! ",
        choices: [
            {
                text: "Try Again",
                effect: { money: 0 },
                nextEvent: "graduation"
            }
        ]
    }
];

// DOM Elements
// Allows JavaScript to update the screen without going through the entire HTML document every time a button is clicked. 
const stressFillEl = document.getElementById("stress-fill");
const moneyEL = document.getElementById("stat-money");
const debtEl = document.getElementById("stat-debt");
const careerEl = document.getElementById("stat-career");
const titleEl = document.getElementById("event-title");
const descEl = document.getElementById("event-description");
const choicesContainer = document.getElementById("choices-container");

// --- Game Functions ---

// Updates stats bar based on amount of stress
function updateStats() {
    moneyEL.innerText = player.money.toLocaleString();
    debtEl.innerText = player.debt.toLocaleString();
    careerEl.innerText = player.career;
    stressFillEl.style.width = player.stress + "%";

    if (player.stress < 40) {
        stressFillEl.style.backgroundColor = "#2ECC71";
    } else if (player.stress < 75) {
        stressFillEl.style.backgroundColor = "#F1C40F";
    } else {
        stressFillEl.style.backgroundColor = "#E74C3C";
    }
}

// Loads event to the screen: removes old buttons and generates new buttons based on the event's choices.
function loadEvent(eventId) {
    const currentEvent = lifeEvents.find(event => event.id === eventId);

    // Updates text on screen
    titleEl.innerText = currentEvent.title;
    descEl.innerText = currentEvent.description;

    // Clear old buttons
    choicesContainer.innerHTML = "";

    // Creates new buttons for current event
    currentEvent.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text;

        // Whenever button is clicked, it runs handleChoice fucntion
        button.onclick = () => handleChoice(choice);

        choicesContainer.appendChild(button);
    });
}

// Handles what happend when the player clicks a choice
function handleChoice(choice) {
    // Financial and lifestyle effects
    if (choice.effect.money) player.money += choice.effect.money;
    if (choice.effect.debt) player.debt += choice.effect.debt;
    if (choice.effect.stress) player.stress += choice.effect.stress;
    if (choice.effect.career) player.career += choice.effect.career;

    // Makes sure stress stays between 0 and 100
    player.stress = Math.max(0, Math.min(100, player.stress));
    // Makes sure debt doesn't go under 0!
    player.debt = Math.max(0, player.debt);

    // Updates stats immediately
    updateStats();

    // Curveball Engine
    if (choice.nextEvent === "RANDOM_EVENT") {
        const curveballs = ["curveball_car", "curveball_bonus", "curveball_health"];
        const randomPick = curveballs[Math.floor(Math.random() * curveballs.length)];
        loadEvent(randomPick);
    } else if (choice.nextEvent === "YEAR_END_CHECK") {
        player.year += 1;

        // Winning Condition: No debt and good savings in account!
        if (player.debt === 0 && player.money >= 1000) {
            loadEvent("victory_ending");
        }
        else if (player.year > 6) {
            loadEvent("time_up_ending");
        }
        else {
            loadEvent("first_payday");
        }
    } else {
        // Loads next event
        loadEvent(choice.nextEvent);
    }
}

// --- Start Game ---
// Runs as soon as page loads
updateStats();
loadEvent("graduation");