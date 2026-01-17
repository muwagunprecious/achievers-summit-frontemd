const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // 1. Seed Admin
    const email = 'admin@achieverssummit.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.upsert({
        where: { email },
        update: {
            password: hashedPassword,
        },
        create: {
            id: 'admin_primary',
            email,
            name: 'Super Admin',
            password: hashedPassword,
            role: 'admin',
        },
    });

    console.log('✅ Admin seeded:', admin.email);

    // 2. Clear old categories to ensure fresh start
    await prisma.ticketCategory.deleteMany({});
    console.log('🗑️ Old categories cleared');

    // 3. Seed Ticket Categories
    const categories = [
        {
            id: 'cat_regular',
            name: 'REGULAR',
            price: 0,
            description: 'Access to the Summit with overflow seating.',
            capacity: 2000,
            features: [
                'Access to the Summit',
                'Reserved seating in the Overflow Auditorium',
                'Light refreshments',
                'Transportation to Venue (Designated Bus Stops)'
            ],
            status: 'ACTIVE'
        },
        {
            id: 'cat_economy',
            name: 'ECONOMY',
            price: 20000,
            description: 'Full access with main hall seating.',
            capacity: 1000,
            features: [
                'Full access to the Summit',
                'Reserved Economy Seating in Main Hall',
                'One-course meal',
                'transportation at Designated location',
                'Hard copy Certificate',
                'Economy Souvenir Pack',
                'Summit Raffle Draw eligibility'
            ],
            status: 'ACTIVE'
        },
        {
            id: 'cat_business',
            name: 'BUSINESS CLASS',
            price: 250000,
            description: 'VIP access and networking opportunities.',
            capacity: 300,
            features: [
                'VIP Access both days',
                'Reserved Business Class Seating',
                'Two-course buffet lunch',
                'Executive transportation & VIP fast-track',
                'Silver-framed Certificate',
                'Exclusive Business Souvenir Pack',
                'Access to VIP Deal Room',
                'Private Dinner & Award Night access',
                '1-2 Months Elite Network Membership',
                'Digital Resource Hub access',
                'Priority Future Event Invitation',
                'CPD-certified leadership certificate'
            ],
            status: 'ACTIVE'
        },
        {
            id: 'cat_firstclass',
            name: 'FIRST CLASS PASS',
            price: 500000,
            description: 'Luxury experience with VVIP status.',
            capacity: 100,
            features: [
                'VVIP Access for both days',
                'Reserved Front Row VVIP Seating in the Main Hall',
                'Three-course buffet lunch on both days',
                'Access to the VVIP Lounge',
                'Access to the VVIP Private Dinner & Award Night',
                'One-night Executive Hotel Accommodation',
                'Executive chauffeured transportation (Hotel ↔ Venue) with VVIP fast-track entry',
                'Gold-framed Certificate of Participation',
                'Exclusive First Class Souvenir Pack',
                'Access to the VVIP Deal Room and Meet-and-Greet sessions with Speakers and Special Dignitaries',
                'CPD-Accredited Leadership Certificate',
                'Access to Post-Summit Digital Resource Hub (Recorded keynote sessions, toolkits, mentorship materials)',
                'Exclusive Red Carpet Photo Session (Media wall + branded experience)',
                '3 – 6 Months Membership in the EA International Elite Network (Access to exclusive leadership circles, mentorship calls, and quarterly masterclasses)',
                'Priority Invitation to Future EAI Events, Missions, and Delegations',
                'Policy Brief / Economic Report on Youth Leadership Trends'
            ],
            status: 'ACTIVE'
        },
        {
            id: 'cat_bizjet',
            name: 'EXCLUSIVE BIZJET PASS',
            price: 1500000,
            description: 'Ultimate elite privileges (Limited to 5 Slots Only).',
            capacity: 5,
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
                'Exclusive Recognition as a Summit VVIP Partner on all event materials and communique—digital, print, and ceremonial mentions',
                '6 – 12 Months Membership in the EA International Elite Network (Access to exclusive leadership circles, mentorship calls, and quarterly masterclasses)',
                'Access to Post-Summit Digital Resource Hub (Recorded keynote sessions, toolkits, mentorship materials)',
                'Priority Invitation to Future EAI Events, Missions, and Delegations',
                'Priority Invitation to Closed-Door Policy Roundtables (National leaders, CEOs, diplomats)',
                'Physical Book authored by the Convener or selected speakers',
                'Policy Brief / Economic Report on Youth Leadership Trends'
            ],
            status: 'ACTIVE'
        }
    ];

    for (const cat of categories) {
        await prisma.ticketCategory.upsert({
            where: { id: cat.id },
            update: cat,
            create: cat,
        });
    }

    console.log('✅ Ticket Categories seeded');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
