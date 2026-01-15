const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    console.log("Seeding Ticket Categories from Landing Page...");
    try {
        const categories = [
            {
                id: 'cat_regular',
                name: 'REGULAR PASS',
                price: 0,
                capacity: 1000,
                description: 'Summit Pass',
                features: [
                    'Access to the Summit',
                    'Reserved seating in the Overflow Auditorium',
                    'Light refreshments',
                    'Free Transportation to the venue (designated routes only)'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            },
            {
                id: 'cat_economy',
                name: 'ECONOMY PASS',
                price: 20000,
                capacity: 500,
                description: 'Growth Pass',
                features: [
                    'Full access to the Summit',
                    'Reserved Economy Seating in the Main Hall',
                    'One-course meal',
                    'Free Transportation to the venue',
                    'Hard copy Certificate of Participation',
                    'Economy Souvenir Pack',
                    'Eligibility to participate in the Summit Raffle Draw'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            },
            {
                id: 'cat_business',
                name: 'BUSINESS CLASS PASS',
                price: 250000,
                capacity: 200,
                description: 'Premium Benefits',
                features: [
                    'VIP Access for both days of the Summit',
                    'Reserved Business Class Seating in the Main Hall',
                    'Two-course buffet lunch on both days',
                    'Executive Transportation from designated pickup points to the venue with VIP fast-track entry',
                    'Silver-framed Certificate of Participation',
                    'Exclusive Business Class Souvenir Pack',
                    'Access to the VIP Deal Room for business and networking opportunities with Speakers and Special Guests',
                    'VIP access to the Private Dinner & Award Night',
                    '1 – 2 Months Membership in the EA International Elite Network',
                    'Access to Post-Summit Digital Resource Hub',
                    'Priority Invitation to Future EAI Events, Missions, and Delegations'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            },
            {
                id: 'cat_firstclass',
                name: 'FIRST CLASS PASS',
                price: 500000,
                capacity: 50,
                description: 'Luxury Benefits',
                features: [
                    'VVIP Access for both days',
                    'Reserved Front Row VVIP Seating in the Main Hall',
                    'Three-course buffet lunch on both days',
                    'Access to the VVIP Lounge',
                    'Access to the VVIP Private Dinner & Award Night',
                    'One-night Executive Hotel Accommodation',
                    'Executive chauffeured Transportation (Hotel ↔ Venue) with VVIP fast-track entry',
                    'Gold-framed Certificate of Participation',
                    'Exclusive First Class Souvenir Pack',
                    'Access to the VVIP Deal Room and Meet-and-Greet sessions with Speakers and Special Dignitaries',
                    'CPD-Accredited Leadership Certificate',
                    'Access to Post-Summit Digital Resource Hub',
                    'Exclusive Red Carpet Photo Session (Media wall + branded experience)',
                    '3 – 6 Months Membership in the EA International Elite Network',
                    'Priority Invitation to Future EAI Events, Missions, and Delegations',
                    'Policy Brief / Economic Report on Youth Leadership Trends'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            },
            {
                id: 'cat_bizjet',
                name: 'EXCLUSIVE BIZJET PASS',
                price: 1500000,
                capacity: 5,
                description: 'Ultimate Elite Privileges (Limited to 5 Slots Only)',
                features: [
                    'Unrestricted VVIP Access for both days of the Summit',
                    'Three-course buffet lunch on both days',
                    'Access to the Speakers, Partners & Special Guests VVIP Lounge',
                    'VVIP access to the Private Dinner & Special Awards Night',
                    'Executive chauffeured SUV experience and Red Carpet Entry at the Gala Night',
                    'Reserved Priority VVIP Seating',
                    'VVIP fast-track entry with full Protocol Services',
                    'Exclusive access to Premium VVIP Lounge with refreshments and private meeting areas',
                    'Luxury VVIP Gift Box',
                    'Priority Airport Shuttle Service and Reserved Parking Space',
                    'Dedicated Personal Event Assistant',
                    'Complimentary VVIP Attaché Pass for a personal aide (Non-transferable)',
                    'High-level receptions with international guests, global leaders, and keynote speakers',
                    '25% discount on additional tickets for family and friends',
                    'Priority access to the Deal Room as an Investor or Corporate Delegate with scheduled introductions',
                    'Partner Gold Award Trophy',
                    'Media interviews spotlighting your personal and corporate brand after the event',
                    '10% discount on official Summit merchandise',
                    'Opportunity to host approved side-events',
                    'CPD-Accredited Leadership Certification',
                    'Premium Exhibition Arena allocation for company, brand, or product showcase',
                    'Exclusive Recognition as a Summit VVIP Partner on all event materials',
                    '6 – 12 Months Membership in the EA International Elite Network',
                    'Access to Post-Summit Digital Resource Hub',
                    'Priority Invitation to Future EAI Events, Missions, and Delegations',
                    'Priority Invitation to Closed-Door Policy Roundtables',
                    'Physical Book authored by the Convener or selected speakers',
                    'Policy Brief / Economic Report on Youth Leadership Trends'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            }
        ];

        for (const cat of categories) {
            await prisma.ticketCategory.upsert({
                where: { id: cat.id },
                update: cat,
                create: cat
            });
        }

        console.log("✅ Seeding Success.");
    } catch (error) {
        console.error("❌ Seeding Failed:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
